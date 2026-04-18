import type { Metadata } from 'next';
import { buildMetadata, getSeoMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/about');
}

export default function AboutPage() {
  const seo = getSeoMetadata('/about');
  const jsonLd = seo.jsonLd;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]),
          }}
        />
      )}
      <div className="bg-surface min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter leading-tight mb-6">
            About Yunnan Vetrux
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed max-w-2xl mb-16">
            Yunnan Vetrux is a vertically integrated CBD isolate manufacturer headquartered in Yunnan Province,
            China — one of the world&apos;s premier regions for industrial hemp cultivation. We supply
            pharmaceutical-grade CBD isolate to B2B buyers across Europe and globally.
          </p>

          {/* Company Overview */}
          <section className="mb-16">
            <h2 className="text-2xl font-extrabold text-on-background tracking-tighter mb-4">Our Mission</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              We exist to provide the global pharmaceutical, nutraceutical, and cosmetic industries with a
              reliable, transparent, and quality-assured source of CBD isolate. Our vertically integrated
              model — from seed to finished isolate — gives us full control over purity, traceability, and
              cost efficiency.
            </p>
          </section>

          {/* Vertical Integration */}
          <section className="mb-16">
            <h2 className="text-2xl font-extrabold text-on-background tracking-tighter mb-4">Vertical Integration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-low p-6">
                <h3 className="text-sm font-bold text-on-background mb-2">Hemp Cultivation</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  In-house cultivation base in Yunnan Province with controlled-environment agriculture,
                  zero synthetic pesticides, and full seed-to-harvest traceability. Our proprietary cultivars
                  achieve ≥97% germination rate.
                </p>
              </div>
              <div className="bg-surface-container-low p-6">
                <h3 className="text-sm font-bold text-on-background mb-2">Extraction &amp; Purification</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  cGMP-certified facility equipped with 6m³ supercritical CO₂ extraction vessels, high-purity
                  chromatography columns, and multi-stage crystallization systems. Achieving ≥99.5% CBD purity
                  with zero residual solvents.
                </p>
              </div>
              <div className="bg-surface-container-low p-6">
                <h3 className="text-sm font-bold text-on-background mb-2">Quality Control</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Every batch undergoes comprehensive analytical testing — HPLC for potency, GC-MS for THC
                  verification, ICP-MS for heavy metals, and 400+ pesticide panel screening. Third-party COA
                  from ISO/IEC 17025-accredited laboratories.
                </p>
              </div>
              <div className="bg-surface-container-low p-6">
                <h3 className="text-sm font-bold text-on-background mb-2">Global Logistics</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Flexible delivery terms including FOB Kunming, CIF Rotterdam, and DDP to European
                  destinations. Standard lead time of 10–14 business days with full export documentation.
                </p>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-16">
            <h2 className="text-2xl font-extrabold text-on-background tracking-tighter mb-4">Certifications &amp; Standards</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'ISO 9001:2015 Quality Management System',
                'GMP (Good Manufacturing Practice)',
                'HACCP Food Safety Management',
                'FDA 21 CFR Part 211 Compliant Processes',
                'EU GMP Annex 1 Standards',
                'ISO/IEC 17025 Accredited Testing Partners',
              ].map((cert) => (
                <li key={cert} className="flex items-start gap-2 text-sm text-on-surface-variant">
                  <span className="text-primary mt-0.5">✓</span>
                  {cert}
                </li>
              ))}
            </ul>
          </section>

          {/* Company Facts */}
          <section className="mb-16">
            <h2 className="text-2xl font-extrabold text-on-background tracking-tighter mb-4">Company Profile</h2>
            <div className="bg-surface-container-low p-6">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 mb-1">Company Name</dt>
                  <dd className="text-on-background">Yunnan Vetrux Co., Ltd.</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 mb-1">Location</dt>
                  <dd className="text-on-background">Yunnan Province, China</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 mb-1">Industry</dt>
                  <dd className="text-on-background">Botanical Extract Manufacturing (CBD Isolate)</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 mb-1">Primary Markets</dt>
                  <dd className="text-on-background">Europe, Global B2B</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 mb-1">Core Product</dt>
                  <dd className="text-on-background">CBD Isolate ≥99.5% Purity, THC-Free</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 mb-1">Production Capacity</dt>
                  <dd className="text-on-background">Ton-scale annual output</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 mb-1">Email</dt>
                  <dd>
                    <a href="mailto:postmaster@vetrux.tech" className="text-primary underline underline-offset-2">
                      postmaster@vetrux.tech
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant/60 mb-1">Phone</dt>
                  <dd className="text-on-background">+86-871-8800-0000</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
