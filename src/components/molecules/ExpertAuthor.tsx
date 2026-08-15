'use client'

import { Award } from 'lucide-react'
import Link from 'next/link'
import type { Locale } from '@/i18n/locales'

interface ExpertAuthorProps {
  locale?: Locale
}

const authorUi: Record<Locale, { label: string; team: string; role: string; body: string; link: string }> = {
  en: {
    label: 'About the publisher',
    team: 'VETRUX Technical Content Team',
    role: 'CBD raw-material and sourcing context',
    body: 'VETRUX publishes practical material-handling, documentation, and supplier-qualification guidance from the perspective of a CBD raw-material supplier in Chuxiong, Yunnan.',
    link: 'Learn more about VETRUX',
  },
  de: {
    label: 'Über den Herausgeber',
    team: 'VETRUX Fachredaktion',
    role: 'CBD-Rohstoffe und Beschaffung',
    body: 'VETRUX veröffentlicht praxisnahe Hinweise zu Materialhandhabung, Dokumentation und Lieferantenqualifizierung aus Sicht eines CBD-Rohstoffanbieters in Chuxiong, Yunnan.',
    link: 'Mehr über VETRUX',
  },
  fr: {
    label: 'À propos de l’éditeur',
    team: 'Équipe de contenu technique VETRUX',
    role: 'Matières premières CBD et approvisionnement',
    body: 'VETRUX publie des conseils pratiques sur la gestion des matières, la documentation et la qualification des fournisseurs du point de vue d’un fournisseur de matières premières CBD à Chuxiong, au Yunnan.',
    link: 'En savoir plus sur VETRUX',
  },
  es: {
    label: 'Sobre el editor',
    team: 'Equipo de contenido técnico de VETRUX',
    role: 'Materias primas de CBD y abastecimiento',
    body: 'VETRUX publica orientación práctica sobre manejo de materiales, documentación y cualificación de proveedores desde la perspectiva de un proveedor de materias primas de CBD en Chuxiong, Yunnan.',
    link: 'Más información sobre VETRUX',
  },
  it: {
    label: 'Informazioni sull’editore',
    team: 'Team contenuti tecnici VETRUX',
    role: 'Materie prime CBD e approvvigionamento',
    body: 'VETRUX pubblica indicazioni pratiche su gestione dei materiali, documentazione e qualifica dei fornitori dal punto di vista di un fornitore di materie prime CBD di Chuxiong, nello Yunnan.',
    link: 'Scopri di più su VETRUX',
  },
  pt: {
    label: 'Sobre o editor',
    team: 'Equipa de conteúdos técnicos VETRUX',
    role: 'Matérias-primas de CBD e aprovisionamento',
    body: 'A VETRUX publica orientações práticas sobre manuseamento de materiais, documentação e qualificação de fornecedores na perspetiva de um fornecedor de matérias-primas de CBD em Chuxiong, Yunnan.',
    link: 'Saiba mais sobre a VETRUX',
  },
  ja: {
    label: '発行者について',
    team: 'VETRUX テクニカルコンテンツチーム',
    role: 'CBD原料と調達の実務情報',
    body: 'VETRUXは、雲南省楚雄のCBD原料サプライヤーという立場から、原料の取り扱い、文書管理、サプライヤー評価に関する実務情報を発信しています。',
    link: 'VETRUXについて詳しく見る',
  },
  fi: {
    label: 'Tietoa julkaisijasta',
    team: 'VETRUXin tekninen sisältötiimi',
    role: 'CBD-raaka-aineet ja hankinta',
    body: 'VETRUX julkaisee käytännön ohjeita materiaalinkäsittelystä, dokumentaatiosta ja toimittajien arvioinnista Chuxiongissa, Yunnanissa toimivan CBD-raaka-ainetoimittajan näkökulmasta.',
    link: 'Lue lisää VETRUXista',
  },
}

export default function ExpertAuthor({ locale = 'en' }: ExpertAuthorProps) {
  const aboutPath = locale === 'en' ? '/about' : `/${locale}/about`
  const t = authorUi[locale]

  return (
    <section className="mt-12 mb-8 rounded-lg border border-gray-200 bg-surface-container-lowest p-6">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
          <Award className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-muted mb-1">
            {t.label}
          </p>
          <p className="font-display text-lg font-bold text-on-background">
            {t.team}
          </p>
          <p className="text-sm text-accent font-medium">
            {t.role}
          </p>
          <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
            {t.body}
          </p>
          <Link
            href={aboutPath}
            className="mt-3 inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            {t.link} →
          </Link>
        </div>
      </div>
    </section>
  )
}
