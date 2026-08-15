export interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FlowStep {
  label: string
  desc: string
}

export interface FlowDiagram {
  title: string
  steps: FlowStep[]
}

export interface ParsedArticle {
  content: string
  headings: TocHeading[]
  faqItems: FaqItem[]
  flowDiagrams: FlowDiagram[]
}

export function slugifyArticleHeading(text: string): string {
  return text
    .normalize('NFKD')
    .toLowerCase()
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractFaq(markdown: string): { cleaned: string; items: FaqItem[] } {
  const faqRegex = /<!-- faq-start -->\s*\n([\s\S]*?)<!-- faq-end -->/g
  const items: FaqItem[] = []
  const cleaned = markdown.replace(faqRegex, (_, block: string) => {
    const lines = block.trim().split('\n')
    let currentQuestion = ''
    let currentAnswer: string[] = []

    for (const line of lines) {
      if (line.startsWith('### ')) {
        if (currentQuestion && currentAnswer.length > 0) {
          items.push({ question: currentQuestion, answer: currentAnswer.join('\n').trim() })
        }
        currentQuestion = line.replace(/^### /, '').replace(/\?$/, '?')
        currentAnswer = []
      } else if (currentQuestion) {
        currentAnswer.push(line)
      }
    }
    if (currentQuestion && currentAnswer.length > 0) {
      items.push({ question: currentQuestion, answer: currentAnswer.join('\n').trim() })
    }
    return '<!-- faq-placeholder -->'
  })
  return { cleaned, items }
}

function extractFlowDiagrams(markdown: string): { cleaned: string; diagrams: FlowDiagram[] } {
  const flowRegex = /<!-- flow-start:\s*title="([^"]*)" -->\s*\n([\s\S]*?)<!-- flow-end -->/g
  const diagrams: FlowDiagram[] = []
  const cleaned = markdown.replace(flowRegex, (_, title: string, block: string) => {
    const stepRegex = /<!-- step:\s*label="([^"]*)"\s*desc="([^"]*)" -->/g
    const steps: FlowStep[] = []
    let match
    while ((match = stepRegex.exec(block)) !== null) {
      steps.push({ label: match[1], desc: match[2] })
    }
    diagrams.push({ title, steps })
    return `<!-- flow-placeholder-${diagrams.length - 1} -->`
  })
  return { cleaned, diagrams }
}

function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = []
  const lines = markdown.split('\n')
  for (const line of lines) {
    const h2Match = line.match(/^## (.+)/)
    const h3Match = line.match(/^### (.+)/)
    if (h2Match) {
      headings.push({ id: slugifyArticleHeading(h2Match[1]), text: h2Match[1], level: 2 })
    } else if (h3Match) {
      headings.push({ id: slugifyArticleHeading(h3Match[1]), text: h3Match[1], level: 3 })
    }
  }
  return headings
}

export function parseArticle(markdown: string): ParsedArticle {
  // Remove TOC marker
  let content = markdown.replace(/<!-- toc -->\s*\n?/g, '')

  const { cleaned: afterFaq, items: faqItems } = extractFaq(content)
  content = afterFaq

  const { cleaned: afterFlow, diagrams: flowDiagrams } = extractFlowDiagrams(content)
  content = afterFlow

  const headings = extractHeadings(content)

  return { content, headings, faqItems, flowDiagrams }
}
