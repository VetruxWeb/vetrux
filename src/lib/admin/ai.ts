import { supabaseAdmin } from '@/lib/supabase'

export interface AiConfig {
  provider: string
  apiKey: string
  model: string
  baseUrl: string
}

export async function getAiConfig(): Promise<AiConfig | null> {
  const { data: settings } = await supabaseAdmin
    .from('SiteSetting')
    .select('*')
    .in('key', ['ai_provider', 'ai_api_key', 'ai_model', 'ai_base_url'])

  if (!settings || settings.length === 0) return null

  const map: Record<string, string> = {}
  for (const s of settings) map[s.key] = s.value

  const apiKey = map['ai_api_key']
  if (!apiKey) return null

  return {
    provider: map['ai_provider'] || 'deepseek',
    apiKey,
    model: map['ai_model'] || 'deepseek-v4-pro',
    baseUrl: map['ai_base_url'] || 'https://api.deepseek.com',
  }
}

export async function callAi(config: AiConfig, systemPrompt: string, userPrompt: string): Promise<string> {
  const res = await fetch(`${config.baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`AI API error (${res.status}): ${err}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || ''
}

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
  pt: 'Portuguese',
  ja: 'Japanese',
  fi: 'Finnish',
}

export function buildTranslatePrompt(targetLocale: string, texts: Record<string, string>, context?: string): { system: string; user: string } {
  const localeName = LOCALE_NAMES[targetLocale] || targetLocale

  const system = `You are a professional B2B translator for the industrial hemp/CBD industry.
Translate the following fields from English to ${localeName}.

Rules:
- Maintain B2B professional tone
- Do NOT translate: VETRUX, CBD, HPLC, OEM/ODM, COA, SDS, THC, CAS numbers, HS codes, Yunma-13, Chuxiong, Yunnan
- Do NOT add any certifications or claims not in the original
- For Japanese: use です/ます体 (polite form)
- For Finnish: use formal written language
- For French/Italian: if a string value contains apostrophes, escape them properly for JSON
- Keep the same JSON key structure, only translate values
- If a value is empty string, keep it as empty string

Return ONLY valid JSON with translated values. No explanation, no markdown code blocks.`

  const user = context
    ? `Context: ${context}\n\nFields to translate:\n${JSON.stringify(texts, null, 2)}`
    : `Fields to translate:\n${JSON.stringify(texts, null, 2)}`

  return { system, user }
}

export function buildGenerateArticlePrompt(topic: string, keywords?: string): { system: string; user: string } {
  const system = `You are a senior content strategist for Vetrux, a B2B CBD isolate manufacturer based in Yunnan, China.

Write a comprehensive, SEO-optimized blog article for qualified B2B buyers (formulators, distributors, importers).

Requirements:
- Length: 1500-2500 words in Markdown format
- Tone: Professional, authoritative, factual — avoid marketing hype
- Structure: Use H2 and H3 headings, bullet points, and clear sections
- Include: Introduction, 3-5 main sections, conclusion with CTA
- SEO: Naturally incorporate keywords, write compelling meta description
- Do NOT make specific claims about Vetrux certifications (ISO, GMP, cGMP, etc.)
- Do NOT promise specific response times or guarantees (like "24h response")
- Do NOT claim THC ND or 99.9% purity — use conservative language like "99%+" and "<0.05%"
- Reference industry standards and best practices
- Target audience: procurement managers, R&D formulators, regulatory specialists

Return ONLY valid JSON (no markdown code blocks):
{
  "title": "article title",
  "excerpt": "2-3 sentence summary for listing page",
  "content": "full markdown content",
  "seoTitle": "SEO title (max 60 chars)",
  "seoDescription": "meta description (max 155 chars)",
  "readTime": "X min"
}`

  const user = keywords
    ? `Topic: ${topic}\nKeywords to include: ${keywords}`
    : `Topic: ${topic}`

  return { system, user }
}
