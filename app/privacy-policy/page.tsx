import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/privacy-policy');
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-0 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter leading-tight mb-8">
          Privacy Policy
        </h1>
        <p className="text-xs text-on-surface-variant mb-12">Last updated: April 2026</p>

        <div className="space-y-10 text-sm text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">1. Introduction</h2>
            <p>
              Yunnan Vetrux Co., Ltd. (&quot;Vetrux&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy and is committed to
              protecting the personal data of visitors to our website at www.vetrux.tech. This Privacy Policy
              explains how we collect, use, and safeguard your information when you visit our website or submit
              an inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">2. Data Controller</h2>
            <p>
              The data controller responsible for your personal data is Yunnan Vetrux Co., Ltd., located in
              Yunnan Province, China. For privacy-related inquiries, contact us at{' '}
              <a href="mailto:postmaster@vetrux.tech" className="text-primary underline underline-offset-2">
                postmaster@vetrux.tech
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">3. Information We Collect</h2>
            <p className="mb-3">We may collect the following categories of information:</p>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <li><strong className="text-on-background">Inquiry form data:</strong> Name, company name, email address, phone number, and message content submitted through our inquiry form.</li>
              <li><strong className="text-on-background">Usage data:</strong> Pages visited, time spent on pages, referral source, browser type, and device information collected via Google Analytics 4.</li>
              <li><strong className="text-on-background">Technical data:</strong> IP address, browser type, operating system, and access timestamps collected automatically by our web servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">4. How We Use Your Information</h2>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <li>To respond to B2B wholesale inquiries and provide requested product documentation.</li>
              <li>To analyze website usage patterns and improve our content and user experience.</li>
              <li>To comply with legal obligations and protect our legitimate business interests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">5. Legal Basis for Processing (GDPR)</h2>
            <p>For visitors in the European Economic Area, we process personal data based on:</p>
            <ul className="list-disc list-outside ml-5 space-y-2 mt-3">
              <li><strong className="text-on-background">Legitimate interest:</strong> Processing inquiry data to respond to business requests.</li>
              <li><strong className="text-on-background">Consent:</strong> Where required for analytics cookies and tracking technologies.</li>
              <li><strong className="text-on-background">Legal obligation:</strong> Where processing is required by applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">6. Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share data with trusted service providers who assist
              in operating our website (e.g., hosting, analytics), subject to appropriate data processing
              agreements. We use Google Analytics 4 for website analytics, which may transfer data to Google
              servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">7. Data Retention</h2>
            <p>
              Inquiry form submissions are retained for the duration of the business relationship plus 24 months.
              Analytics data is retained according to Google Analytics default retention settings. You may request
              deletion of your personal data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">8. Your Rights</h2>
            <p className="mb-3">Under applicable data protection laws (including GDPR), you have the right to:</p>
            <ul className="list-disc list-outside ml-5 space-y-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your personal data.</li>
              <li>Object to or restrict processing of your data.</li>
              <li>Data portability where technically feasible.</li>
              <li>Lodge a complaint with a supervisory authority.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">9. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data,
              including HTTPS encryption, Content Security Policy headers, and access controls. However, no
              method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-on-background tracking-tight mb-3">10. Contact</h2>
            <p>
              For any questions about this Privacy Policy or to exercise your data rights, contact us at:{' '}
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
