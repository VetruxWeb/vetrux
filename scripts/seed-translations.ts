/**
 * Seed product translations for all non-English locales.
 * Run: npx tsx --env-file=.env.local scripts/seed-translations.ts
 */
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

function genId(): string {
  return randomUUID().replace(/-/g, '').slice(0, 25);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const locales = ['de', 'fr', 'es', 'it', 'pt', 'ja', 'fi'] as const;

interface TranslationData {
  name: string;
  badge: string | null;
  description: string;
}

interface SpecData {
  label: string;
  value: string;
  order: number;
}

const cbdIsolateTranslations: Record<string, TranslationData> = {
  de: {
    name: 'CBD-Isolat',
    badge: null,
    description: 'Kristallines CBD-Pulver mit einer Reinheit von 92% bis 99,96%. Hergestellt aus Yunma-13 Industriehanf, angebaut in Yunnan, China. Ideal für pharmazeutische Formulierungen, kosmetische Herstellung und Forschungsanwendungen.',
  },
  fr: {
    name: 'Isolat de CBD',
    badge: null,
    description: "Poudre cristalline de CBD d'une pureté de 92% à 99,96%. Fabriquée à partir de chanvre industriel Yunma-13 cultivé au Yunnan, Chine. Idéale pour la formulation pharmaceutique, la fabrication cosmétique et les applications de recherche.",
  },
  es: {
    name: 'Aislado de CBD',
    badge: null,
    description: 'Polvo cristalino de CBD con una pureza del 92% al 99,96%. Fabricado a partir de cáñamo industrial Yunma-13 cultivado en Yunnan, China. Ideal para formulación farmacéutica, fabricación cosmética y aplicaciones de investigación.',
  },
  it: {
    name: 'Isolato di CBD',
    badge: null,
    description: "Polvere cristallina di CBD con purezza dal 92% al 99,96%. Prodotta da canapa industriale Yunma-13 coltivata nello Yunnan, Cina. Ideale per formulazioni farmaceutiche, produzione cosmetica e applicazioni di ricerca.",
  },
  pt: {
    name: 'Isolado de CBD',
    badge: null,
    description: 'Pó cristalino de CBD com pureza de 92% a 99,96%. Fabricado a partir de cânhamo industrial Yunma-13 cultivado em Yunnan, China. Ideal para formulação farmacêutica, fabricação cosmética e aplicações de pesquisa.',
  },
  ja: {
    name: 'CBDアイソレート',
    badge: null,
    description: '純度92%〜99.96%の結晶性CBDパウダー。中国雲南省で栽培されたYunma-13産業用大麻から製造。医薬品製剤、化粧品製造、研究用途に最適です。',
  },
  fi: {
    name: 'CBD-isolaatti',
    badge: null,
    description: 'Kiteinen CBD-jauhe, jonka puhtaus on 92–99,96%. Valmistettu Yunnanissa, Kiinassa viljellystä Yunma-13-teollisuushampusta. Ihanteellinen farmaseuttisiin formulaatioihin, kosmetiikan valmistukseen ja tutkimussovelluksiin.',
  },
};

const cbdOilTranslations: Record<string, TranslationData> = {
  de: {
    name: 'CBD-Rohöl',
    badge: null,
    description: 'Vollspektrum-CBD-Rohöl, extrahiert aus Yunma-13 Industriehanf. Verfügbar in mehreren CBD-Konzentrationsgraden von 40% bis 80%. Geeignet für Weiterverarbeitung, Produktformulierung und Großhandelsvertrieb.',
  },
  fr: {
    name: 'Huile brute de CBD',
    badge: null,
    description: "Huile brute de CBD à spectre complet extraite de chanvre industriel Yunma-13. Disponible en plusieurs grades de concentration de 40% à 80%. Adaptée au raffinage, à la formulation de produits et à la distribution en gros.",
  },
  es: {
    name: 'Aceite crudo de CBD',
    badge: null,
    description: 'Aceite crudo de CBD de espectro completo extraído de cáñamo industrial Yunma-13. Disponible en múltiples grados de concentración del 40% al 80%. Adecuado para refinación, formulación de productos y distribución mayorista.',
  },
  it: {
    name: 'Olio grezzo di CBD',
    badge: null,
    description: "Olio grezzo di CBD a spettro completo estratto da canapa industriale Yunma-13. Disponibile in diversi gradi di concentrazione dal 40% all'80%. Adatto per ulteriore raffinazione, formulazione di prodotti e distribuzione all'ingrosso.",
  },
  pt: {
    name: 'Óleo bruto de CBD',
    badge: null,
    description: 'Óleo bruto de CBD de espectro completo extraído de cânhamo industrial Yunma-13. Disponível em múltiplos graus de concentração de 40% a 80%. Adequado para refinamento, formulação de produtos e distribuição por atacado.',
  },
  ja: {
    name: 'CBD原油',
    badge: null,
    description: 'Yunma-13産業用大麻から抽出したフルスペクトラムCBD原油。CBD濃度40%〜80%の複数グレードをご用意。さらなる精製、製品配合、卸売流通に適しています。',
  },
  fi: {
    name: 'CBD-raakaöljy',
    badge: null,
    description: 'Täyden kirjon CBD-raakaöljy, uutettu Yunma-13-teollisuushampusta. Saatavilla useina pitoisuusasteina 40–80%. Sopii jatkojalostukseen, tuoteformulointiin ja tukkumyyntiin.',
  },
};

// Specs translations for CBD Isolate
const cbdIsolateSpecs: Record<string, SpecData[]> = {
  de: [
    { label: 'Aussehen', value: 'Weißes kristallines Pulver', order: 0 },
    { label: 'CAS Number', value: '13956-29-1', order: 1 },
    { label: 'Summenformel', value: 'C₂₁H₃₀O₂', order: 2 },
    { label: 'Molmasse', value: '314,46 g/mol', order: 3 },
    { label: 'THC-Gehalt', value: '< 0,05%', order: 4 },
    { label: 'Verpackung', value: '5 kg/Beutel (PE-Innen + Aluminiumfolie außen)', order: 5 },
    { label: 'Lagerung', value: 'Kühl, trocken, lichtgeschützt', order: 6 },
    { label: 'Haltbarkeit', value: '24 Monate', order: 7 },
    { label: 'HS Code', value: '2907299020', order: 8 },
  ],
  fr: [
    { label: 'Apparence', value: 'Poudre cristalline blanche', order: 0 },
    { label: 'CAS Number', value: '13956-29-1', order: 1 },
    { label: 'Formule moléculaire', value: 'C₂₁H₃₀O₂', order: 2 },
    { label: 'Masse moléculaire', value: '314,46 g/mol', order: 3 },
    { label: 'Teneur en THC', value: '< 0,05%', order: 4 },
    { label: 'Emballage', value: '5 kg/sac (PE intérieur + aluminium extérieur)', order: 5 },
    { label: 'Stockage', value: "Endroit frais, sec, à l'abri de la lumière", order: 6 },
    { label: 'Durée de conservation', value: '24 mois', order: 7 },
    { label: 'HS Code', value: '2907299020', order: 8 },
  ],
  es: [
    { label: 'Apariencia', value: 'Polvo cristalino blanco', order: 0 },
    { label: 'CAS Number', value: '13956-29-1', order: 1 },
    { label: 'Fórmula molecular', value: 'C₂₁H₃₀O₂', order: 2 },
    { label: 'Peso molecular', value: '314,46 g/mol', order: 3 },
    { label: 'Contenido de THC', value: '< 0,05%', order: 4 },
    { label: 'Embalaje', value: '5 kg/bolsa (PE interior + aluminio exterior)', order: 5 },
    { label: 'Almacenamiento', value: 'Lugar fresco, seco, protegido de la luz', order: 6 },
    { label: 'Vida útil', value: '24 meses', order: 7 },
    { label: 'HS Code', value: '2907299020', order: 8 },
  ],
  it: [
    { label: 'Aspetto', value: 'Polvere cristallina bianca', order: 0 },
    { label: 'CAS Number', value: '13956-29-1', order: 1 },
    { label: 'Formula molecolare', value: 'C₂₁H₃₀O₂', order: 2 },
    { label: 'Peso molecolare', value: '314,46 g/mol', order: 3 },
    { label: 'Contenuto di THC', value: '< 0,05%', order: 4 },
    { label: 'Confezionamento', value: '5 kg/sacchetto (PE interno + foglio di alluminio esterno)', order: 5 },
    { label: 'Conservazione', value: 'Luogo fresco, asciutto, al riparo dalla luce', order: 6 },
    { label: 'Durata di conservazione', value: '24 mesi', order: 7 },
    { label: 'HS Code', value: '2907299020', order: 8 },
  ],
  pt: [
    { label: 'Aparência', value: 'Pó cristalino branco', order: 0 },
    { label: 'CAS Number', value: '13956-29-1', order: 1 },
    { label: 'Fórmula molecular', value: 'C₂₁H₃₀O₂', order: 2 },
    { label: 'Peso molecular', value: '314,46 g/mol', order: 3 },
    { label: 'Teor de THC', value: '< 0,05%', order: 4 },
    { label: 'Embalagem', value: '5 kg/saco (PE interno + folha de alumínio externo)', order: 5 },
    { label: 'Armazenamento', value: 'Local fresco, seco, protegido da luz', order: 6 },
    { label: 'Validade', value: '24 meses', order: 7 },
    { label: 'HS Code', value: '2907299020', order: 8 },
  ],
  ja: [
    { label: '外観', value: '白色結晶性粉末', order: 0 },
    { label: 'CAS Number', value: '13956-29-1', order: 1 },
    { label: '分子式', value: 'C₂₁H₃₀O₂', order: 2 },
    { label: '分子量', value: '314.46 g/mol', order: 3 },
    { label: 'THC含有量', value: '< 0.05%', order: 4 },
    { label: '包装', value: '5 kg/袋（PE内袋＋アルミ箔外装）', order: 5 },
    { label: '保管方法', value: '冷暗所にて保管', order: 6 },
    { label: '賞味期限', value: '24ヶ月', order: 7 },
    { label: 'HS Code', value: '2907299020', order: 8 },
  ],
  fi: [
    { label: 'Ulkonäkö', value: 'Valkoinen kiteinen jauhe', order: 0 },
    { label: 'CAS Number', value: '13956-29-1', order: 1 },
    { label: 'Molekyylikaava', value: 'C₂₁H₃₀O₂', order: 2 },
    { label: 'Moolimassa', value: '314,46 g/mol', order: 3 },
    { label: 'THC-pitoisuus', value: '< 0,05%', order: 4 },
    { label: 'Pakkaus', value: '5 kg/pussi (PE-sisäpussi + alumiinifolio ulkopakkaus)', order: 5 },
    { label: 'Säilytys', value: 'Viileä, kuiva paikka, suojassa valolta', order: 6 },
    { label: 'Säilyvyys', value: '24 kuukautta', order: 7 },
    { label: 'HS Code', value: '2907299020', order: 8 },
  ],
};

// Specs translations for CBD Oil
const cbdOilSpecs: Record<string, SpecData[]> = {
  de: [
    { label: 'Aussehen', value: 'Dunkelbraunes bis schwarzes viskoses Öl', order: 0 },
    { label: 'CBD-Gehalt', value: '40%–80%', order: 1 },
    { label: 'THC-Gehalt', value: '< 0,3%', order: 2 },
    { label: 'Extraktionsmethode', value: 'Ethanolextraktion', order: 3 },
    { label: 'Ausgangsmaterial', value: 'Yunma-13 Industriehanf', order: 4 },
    { label: 'Verpackung', value: 'Stahlfass (25 kg / 50 kg)', order: 5 },
    { label: 'Lagerung', value: 'Kühl, trocken, lichtgeschützt', order: 6 },
    { label: 'Haltbarkeit', value: '18 Monate', order: 7 },
  ],
  fr: [
    { label: 'Apparence', value: 'Huile visqueuse brun foncé à noire', order: 0 },
    { label: 'Teneur en CBD', value: '40%–80%', order: 1 },
    { label: 'Teneur en THC', value: '< 0,3%', order: 2 },
    { label: "Méthode d'extraction", value: "Extraction à l'éthanol", order: 3 },
    { label: 'Matière première', value: 'Chanvre industriel Yunma-13', order: 4 },
    { label: 'Emballage', value: 'Fût en acier (25 kg / 50 kg)', order: 5 },
    { label: 'Stockage', value: "Endroit frais, sec, à l'abri de la lumière", order: 6 },
    { label: 'Durée de conservation', value: '18 mois', order: 7 },
  ],
  es: [
    { label: 'Apariencia', value: 'Aceite viscoso de color marrón oscuro a negro', order: 0 },
    { label: 'Contenido de CBD', value: '40%–80%', order: 1 },
    { label: 'Contenido de THC', value: '< 0,3%', order: 2 },
    { label: 'Método de extracción', value: 'Extracción con etanol', order: 3 },
    { label: 'Material de origen', value: 'Cáñamo industrial Yunma-13', order: 4 },
    { label: 'Embalaje', value: 'Tambor de acero (25 kg / 50 kg)', order: 5 },
    { label: 'Almacenamiento', value: 'Lugar fresco, seco, protegido de la luz', order: 6 },
    { label: 'Vida útil', value: '18 meses', order: 7 },
  ],
  it: [
    { label: 'Aspetto', value: 'Olio viscoso da marrone scuro a nero', order: 0 },
    { label: 'Contenuto di CBD', value: '40%–80%', order: 1 },
    { label: 'Contenuto di THC', value: '< 0,3%', order: 2 },
    { label: 'Metodo di estrazione', value: 'Estrazione con etanolo', order: 3 },
    { label: 'Materia prima', value: 'Canapa industriale Yunma-13', order: 4 },
    { label: 'Confezionamento', value: 'Fusto in acciaio (25 kg / 50 kg)', order: 5 },
    { label: 'Conservazione', value: 'Luogo fresco, asciutto, al riparo dalla luce', order: 6 },
    { label: 'Durata di conservazione', value: '18 mesi', order: 7 },
  ],
  pt: [
    { label: 'Aparência', value: 'Óleo viscoso de marrom escuro a preto', order: 0 },
    { label: 'Teor de CBD', value: '40%–80%', order: 1 },
    { label: 'Teor de THC', value: '< 0,3%', order: 2 },
    { label: 'Método de extração', value: 'Extração com etanol', order: 3 },
    { label: 'Material de origem', value: 'Cânhamo industrial Yunma-13', order: 4 },
    { label: 'Embalagem', value: 'Tambor de aço (25 kg / 50 kg)', order: 5 },
    { label: 'Armazenamento', value: 'Local fresco, seco, protegido da luz', order: 6 },
    { label: 'Validade', value: '18 meses', order: 7 },
  ],
  ja: [
    { label: '外観', value: '暗褐色から黒色の粘性油', order: 0 },
    { label: 'CBD含有量', value: '40%–80%', order: 1 },
    { label: 'THC含有量', value: '< 0.3%', order: 2 },
    { label: '抽出方法', value: 'エタノール抽出', order: 3 },
    { label: '原料', value: 'Yunma-13 産業用大麻', order: 4 },
    { label: '包装', value: 'スチールドラム（25 kg / 50 kg）', order: 5 },
    { label: '保管方法', value: '冷暗所にて保管', order: 6 },
    { label: '賞味期限', value: '18ヶ月', order: 7 },
  ],
  fi: [
    { label: 'Ulkonäkö', value: 'Tummanruskeasta mustaan viskoosi öljy', order: 0 },
    { label: 'CBD-pitoisuus', value: '40%–80%', order: 1 },
    { label: 'THC-pitoisuus', value: '< 0,3%', order: 2 },
    { label: 'Uuttomenetelmä', value: 'Etanoliuutto', order: 3 },
    { label: 'Raaka-aine', value: 'Yunma-13-teollisuushamppu', order: 4 },
    { label: 'Pakkaus', value: 'Teräsastia (25 kg / 50 kg)', order: 5 },
    { label: 'Säilytys', value: 'Viileä, kuiva paikka, suojassa valolta', order: 6 },
    { label: 'Säilyvyys', value: '18 kuukautta', order: 7 },
  ],
};

async function run() {
  const products = [
    { slug: 'cbd-isolate', translations: cbdIsolateTranslations, specs: cbdIsolateSpecs },
    { slug: 'cbd-oil', translations: cbdOilTranslations, specs: cbdOilSpecs },
  ];

  for (const product of products) {
    console.log(`\nProcessing product: ${product.slug}`);

    // Fetch product ID by slug
    const { data: productData, error: productError } = await supabase
      .from('Product')
      .select('id')
      .eq('slug', product.slug)
      .single();

    if (productError || !productData) {
      console.error(`  ERROR: Could not find product "${product.slug}":`, productError?.message);
      continue;
    }

    const productId = productData.id;
    console.log(`  Found product ID: ${productId}`);

    for (const locale of locales) {
      const translationData = product.translations[locale];
      if (!translationData) {
        console.log(`  Skipping locale ${locale} — no translation data`);
        continue;
      }

      // Upsert ProductTranslation
      const { error: upsertError } = await supabase
        .from('ProductTranslation')
        .upsert(
          { id: genId(), productId, locale, ...translationData },
          { onConflict: 'productId,locale' }
        );

      if (upsertError) {
        console.error(`  ERROR upserting translation [${locale}]:`, upsertError.message);
      } else {
        console.log(`  Upserted translation [${locale}]`);
      }

      // Delete + Insert specs
      const specData = product.specs[locale];
      if (!specData) {
        console.log(`  Skipping specs for [${locale}] — no spec data`);
        continue;
      }

      const { error: deleteError } = await supabase
        .from('ProductSpec')
        .delete()
        .eq('productId', productId)
        .eq('locale', locale);

      if (deleteError) {
        console.error(`  ERROR deleting specs [${locale}]:`, deleteError.message);
        continue;
      }

      const specsToInsert = specData.map((spec) => ({
        id: genId(),
        productId,
        locale,
        ...spec,
      }));

      const { error: insertError } = await supabase
        .from('ProductSpec')
        .insert(specsToInsert);

      if (insertError) {
        console.error(`  ERROR inserting specs [${locale}]:`, insertError.message);
      } else {
        console.log(`  Inserted ${specsToInsert.length} specs [${locale}]`);
      }
    }
  }

  console.log('\nDone!');
}

run().catch(console.error);