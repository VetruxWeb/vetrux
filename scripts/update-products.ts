/**
 * Update existing products with variants, specs, quantityTiers, description, category, moq.
 * Run: npx tsx --env-file=.env.local scripts/update-products.ts
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const updates = [
  {
    slug: 'cbd-isolate',
    category: 'Isolate',
    moq: '100 kg',
    images: [
      '/images/vetrux_images/cbd-isolate-crystals-white-powder.jpg',
      '/images/vetrux_images/bulk-cbd-isolate-crystal-powder-closeup.jpg',
    ],
    description: 'Crystalline CBD powder with purity ranging from 92% to 99.96%. Manufactured from Yunma-13 industrial hemp cultivated in Yunnan, China. Ideal for pharmaceutical formulation, cosmetic manufacturing, and research applications.',
    variants: [
      { label: '92%', order: 0 },
      { label: '95%', order: 1 },
      { label: '99.96%', order: 2 },
    ],
    quantityTiers: [
      { label: '≥ 100 Kg', order: 0 },
      { label: '≥ 500 Kg', order: 1 },
      { label: '≥ 1,000 Kg', order: 2 },
      { label: '≥ 3,000 Kg', order: 3 },
    ],
    specs: [
      { locale: 'en', label: 'Appearance', value: 'White crystalline powder', order: 0 },
      { locale: 'en', label: 'CAS Number', value: '13956-29-1', order: 1 },
      { locale: 'en', label: 'Molecular Formula', value: 'C₂₁H₃₀O₂', order: 2 },
      { locale: 'en', label: 'Molecular Weight', value: '314.46 g/mol', order: 3 },
      { locale: 'en', label: 'THC Content', value: '< 0.05%', order: 4 },
      { locale: 'en', label: 'Packaging', value: '5 kg/bag (PE inner + aluminum foil outer)', order: 5 },
      { locale: 'en', label: 'Storage', value: 'Cool, dry place, away from light', order: 6 },
      { locale: 'en', label: 'Shelf Life', value: '24 months', order: 7 },
      { locale: 'en', label: 'HS Code', value: '2907299020', order: 8 },
    ],
  },
  {
    slug: 'cbd-oil',
    category: 'Oil',
    moq: '100 kg',
    images: [
      '/images/vetrux_images/cbd-crude-oil-dark-liquid.jpg',
      '/images/vetrux_images/cbd-oil-drum-packaging.jpg',
    ],
    description: 'Full-spectrum CBD crude oil extracted from Yunma-13 industrial hemp. Available in multiple CBD concentration grades from 40% to 80%. Suitable for further refinement, product formulation, and wholesale distribution.',
    variants: [
      { label: '40%', order: 0 },
      { label: '50%', order: 1 },
      { label: '60%', order: 2 },
      { label: '70%', order: 3 },
      { label: '80%', order: 4 },
    ],
    quantityTiers: [
      { label: '≥ 100 Kg', order: 0 },
      { label: '≥ 500 Kg', order: 1 },
      { label: '≥ 1,000 Kg', order: 2 },
      { label: '≥ 3,000 Kg', order: 3 },
    ],
    specs: [
      { locale: 'en', label: 'Appearance', value: 'Dark brown to black viscous oil', order: 0 },
      { locale: 'en', label: 'CBD Content', value: '40%–80%', order: 1 },
      { locale: 'en', label: 'THC Content', value: '< 0.3%', order: 2 },
      { locale: 'en', label: 'Extraction Method', value: 'Ethanol extraction', order: 3 },
      { locale: 'en', label: 'Source Material', value: 'Yunma-13 industrial hemp', order: 4 },
      { locale: 'en', label: 'Packaging', value: 'Steel drum (25 kg / 50 kg)', order: 5 },
      { locale: 'en', label: 'Storage', value: 'Cool, dry place, away from light', order: 6 },
      { locale: 'en', label: 'Shelf Life', value: '18 months', order: 7 },
    ],
  },
]

async function run() {
  for (const u of updates) {
    const { data: product } = await supabase
      .from('Product')
      .select('id')
      .eq('slug', u.slug)
      .single()

    if (!product) {
      console.log(`Product "${u.slug}" not found, skipping`)
      continue
    }

    const id = product.id

    // Update product fields
    await supabase.from('Product').update({
      category: u.category,
      moq: u.moq,
      images: u.images,
      updatedAt: new Date().toISOString(),
    }).eq('id', id)

    // Update translation description
    await supabase.from('ProductTranslation').update({
      description: u.description,
    }).eq('productId', id).eq('locale', 'en')

    // Delete-and-recreate variants
    await supabase.from('ProductVariant').delete().eq('productId', id)
    await supabase.from('ProductVariant').insert(
      u.variants.map((v) => ({ ...v, productId: id }))
    )

    // Delete-and-recreate quantity tiers
    await supabase.from('ProductQuantityTier').delete().eq('productId', id)
    await supabase.from('ProductQuantityTier').insert(
      u.quantityTiers.map((t) => ({ ...t, productId: id }))
    )

    // Delete-and-recreate specs
    await supabase.from('ProductSpec').delete().eq('productId', id).eq('locale', 'en')
    await supabase.from('ProductSpec').insert(
      u.specs.map((s) => ({ ...s, productId: id }))
    )

    console.log(`Updated "${u.slug}" — ${u.variants.length} variants, ${u.specs.length} specs`)
  }
  console.log('Done!')
}

run().catch(console.error)
