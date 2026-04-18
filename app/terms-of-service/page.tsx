import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/terms-of-service');
}

export default function TermsOfServicePage() {
  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-0 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter leading-tight mb-8">
          Terms of Service
        </h1>
        <p className="text-xs text-on-surface-variant mb-12">Last updated: April 2026</p>

        <div className="space-y-10 text-sm text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website at www.vetrux.tech (the &quot;Website&quot;), operated by Yunnan Vetrux
              Co., Ltd. (&quot;Vetrux&quot;, &quot;we&quot;, &quot;us&quot;), you agree to be bound by these Terms of Service. If you do
              not agree to these terms, please do not use the Website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">2. Website Purpose</h2>
            <p>
              This Website serves as a B2B informational platform for wholesale CBD isolate buyers. Content
              on this Website is intended for business professionals in the pharmaceutical, nutraceutical, and
              cosmetic industries. This Website does not facilitate direct consumer sales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">3. Product Information</h2>
            <p>
              Product specifications, certifications, and technical data presented on this Website are provided
              for informational purposes. While we strive for accuracy, actual product specifications are
              governed by the Certificate of Analysis (COA) accompanying each batch shipment. Specifications
              are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">4. Inquiries and Orders</h2>
            <p>
              Submitting an inquiry through our Website does not constitute a binding order or contract.
              All wholesale transactions are subject to separate commercial agreements, including pricing,
              delivery terms, and payment conditions negotiated between parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">5. Intellectual Property</h2>
            <p>
              All content on this Website — including text, images, logos, graphics, and software — is the
              property of Yunnan Vetrux Co., Ltd. or its licensors and is protected by applicable intellectual
              property laws. You may not reproduce, distribute, or create derivative works from this content
              without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">6. Regulatory Compliance</h2>
            <p>
              Vetrux products are manufactured in compliance with applicable Chinese regulations for industrial
              hemp processing. Buyers are solely responsible for ensuring compliance with the laws and
              regulations of their respective jurisdictions, including but not limited to EU Novel Food
              Regulation (EU) 2015/2283, local import requirements, and THC content limits.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Vetrux shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of this Website or reliance on information
              presented herein. This Website is provided &quot;as is&quot; without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">8. External Links</h2>
            <p>
              This Website may contain links to third-party websites. We are not responsible for the content,
              privacy practices, or availability of external sites. Inclusion of any link does not imply
              endorsement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">9. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the
              People&apos;s Republic of China. Any disputes arising from these terms shall be subject to the
              jurisdiction of the courts in Yunnan Province, China.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">10. Contact</h2>
            <p>
              For questions about these Terms of Service, contact us at:{' '}
              <a href="mailto:postmaster@vetrux.tech" className="text-primary underline underline-offset-2">
                postmaster@vetrux.tech
              </a>
            </p>
            <p className="mt-2">
              Yunnan Vetrux Co., Ltd.<br />
              Yunnan Province, China<br />
              Phone: +86-871-8800-0000
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
