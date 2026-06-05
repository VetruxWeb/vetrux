export interface ProductSpec {
  slug: string;
  name: string;
  category: 'isolate' | 'oil';
  purity: string;
  image: string;
  badge: string;
  description: string;
  specs: { label: string; value: string }[];
  moq: string;
}

export const productCategories = [
  {
    id: 'isolate' as const,
    name: 'CBD Isolate',
    description: 'Crystalline CBD powder with purity ranging from 92% to 99.96%. Ideal for formulation, research, and white-label manufacturing.',
    image: '/images/vetrux_images/isolate-crystals.png',
  },
  {
    id: 'oil' as const,
    name: 'CBD Crude Oil',
    description: 'Full-spectrum CBD crude oil in various concentrations from 40% to 80%. Suitable for further distillation or direct formulation.',
    image: '/images/vetrux_images/cbd-oil-60.png',
  },
];

const isolateBase = [
  { label: 'Appearance', value: 'White crystalline powder' },
  { label: 'CAS Number', value: '13956-29-1' },
  { label: 'Molecular Formula', value: 'C₂₁H₃₀O₂' },
  { label: 'Molecular Weight', value: '314.46 g/mol' },
  { label: 'THC Content', value: '< 0.05%' },
  { label: 'Packaging', value: '5 kg/bag (PE inner + aluminum foil outer)' },
  { label: 'Storage', value: 'Cool, dry place, away from light' },
  { label: 'Shelf Life', value: '24 months' },
  { label: 'HS Code', value: '2907299020' },
];

const oilBase = [
  { label: 'Appearance', value: 'Dark amber to brown viscous oil' },
  { label: 'CAS Number', value: '13956-29-1' },
  { label: 'Extraction Method', value: 'Ethanol extraction' },
  { label: 'THC Content', value: '< 0.3%' },
  { label: 'Packaging', value: '1 kg/bottle or 5 kg/drum' },
  { label: 'Storage', value: 'Cool, dry place, away from light' },
  { label: 'Shelf Life', value: '18 months' },
  { label: 'HS Code', value: '2907299020' },
];

export const products: ProductSpec[] = [
  {
    slug: 'cbd-isolate-92',
    name: 'CBD Isolate 92%',
    category: 'isolate',
    purity: '92%',
    image: '/images/vetrux_images/isolate-crystals.png',
    badge: 'CBD Isolate',
    description: 'Crystalline CBD isolate with 92% purity. Cost-effective option for bulk formulation and industrial applications.',
    moq: '100 kg',
    specs: [{ label: 'CBD Content', value: '≥ 92%' }, ...isolateBase],
  },
  {
    slug: 'cbd-isolate-95',
    name: 'CBD Isolate 95%',
    category: 'isolate',
    purity: '95%',
    image: '/images/vetrux_images/isolate-crystals.png',
    badge: 'CBD Isolate',
    description: 'High-purity CBD isolate at 95%. Balanced performance and value for pharmaceutical and cosmetic formulations.',
    moq: '100 kg',
    specs: [{ label: 'CBD Content', value: '≥ 95%' }, ...isolateBase],
  },
  {
    slug: 'cbd-isolate-9996',
    name: 'CBD Isolate 99.96%',
    category: 'isolate',
    purity: '99.96%',
    image: '/images/vetrux_images/isolate-crystals.png',
    badge: 'CBD Isolate',
    description: 'Ultra-high purity CBD isolate at 99.96%. Premium grade for pharmaceutical research, analytical standards, and precision formulations.',
    moq: '100 kg',
    specs: [{ label: 'CBD Content', value: '≥ 99.96%' }, ...isolateBase],
  },
  {
    slug: 'cbd-oil-80',
    name: 'CBD Crude Oil 80%',
    category: 'oil',
    purity: '80%',
    image: '/images/vetrux_images/cbd-oil-60.png',
    badge: 'CBD Oil',
    description: 'High-concentration CBD crude oil at 80%. Premium grade for distillation refinement or high-potency product formulation.',
    moq: '100 kg',
    specs: [{ label: 'CBD Content', value: '≥ 80%' }, ...oilBase],
  },
  {
    slug: 'cbd-oil-70',
    name: 'CBD Crude Oil 70%',
    category: 'oil',
    purity: '70%',
    image: '/images/vetrux_images/cbd-oil-60.png',
    badge: 'CBD Oil',
    description: 'CBD crude oil with 70% cannabidiol content. Versatile intermediate for distillation or direct use in formulations.',
    moq: '100 kg',
    specs: [{ label: 'CBD Content', value: '≥ 70%' }, ...oilBase],
  },
  {
    slug: 'cbd-oil-60',
    name: 'CBD Crude Oil 60%',
    category: 'oil',
    purity: '60%',
    image: '/images/vetrux_images/cbd-oil-60.png',
    badge: 'CBD Oil',
    description: 'CBD crude oil at 60% concentration. Standard grade for bulk processing and further refinement.',
    moq: '100 kg',
    specs: [{ label: 'CBD Content', value: '≥ 60%' }, ...oilBase],
  },
  {
    slug: 'cbd-oil-50',
    name: 'CBD Crude Oil 50%',
    category: 'oil',
    purity: '50%',
    image: '/images/vetrux_images/cbd-oil-60.png',
    badge: 'CBD Oil',
    description: 'CBD crude oil with 50% CBD content. Economical option for large-volume processing and distillation feedstock.',
    moq: '100 kg',
    specs: [{ label: 'CBD Content', value: '≥ 50%' }, ...oilBase],
  },
  {
    slug: 'cbd-oil-40',
    name: 'CBD Crude Oil 40%',
    category: 'oil',
    purity: '40%',
    image: '/images/vetrux_images/cbd-oil-60.png',
    badge: 'CBD Oil',
    description: 'Entry-level CBD crude oil at 40% concentration. Most cost-effective option for industrial-scale distillation and extraction.',
    moq: '100 kg',
    specs: [{ label: 'CBD Content', value: '≥ 40%' }, ...oilBase],
  },
];

export function getProductBySlugStatic(slug: string): ProductSpec | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: 'isolate' | 'oil'): ProductSpec[] {
  return products.filter((p) => p.category === category);
}
