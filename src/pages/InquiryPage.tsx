// src/pages/InquiryPage.tsx
// Page 3: B2B Strategic Partnership Inquiry
// Sections: Hero header, Two-column (form left, info sidebar right)

import { useRef } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Badge from '../components/atoms/Badge';
import SectionLabel from '../components/atoms/SectionLabel';
import InquiryForm from '../components/molecules/InquiryForm';

gsap.registerPlugin(ScrollTrigger);

export default function InquiryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current) return;
    const items = heroRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: heroRef.current, start: 'top 80%' },
    });
  }, { scope: heroRef });

  useGSAP(() => {
    if (!contentRef.current) return;
    const items = contentRef.current.querySelectorAll('.reveal-card');
    gsap.from(items, {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
    });
  }, { scope: contentRef });

  return (
    <div className="bg-surface">
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-low">
        <div ref={heroRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card">
            <Badge variant="default" className="mb-6">Direct B2B Channels</Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold text-on-background tracking-tighter leading-[0.95] max-w-3xl mb-6">
              Strategic Partnership
              <br />
              <span className="text-primary">Inquiry</span>
            </h1>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xl">
              Connect with our global distribution network. Whether you require bulk isolate,
              custom formulations, or private-label solutions — our B2B team is ready.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div ref={contentRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* LEFT: Inquiry Form (8/12) */}
            <div className="reveal-card lg:col-span-8">
              <SectionLabel>Wholesale Request</SectionLabel>
              <h2 className="text-3xl font-extrabold text-on-background tracking-tighter mb-10">
                Submit Your Inquiry
              </h2>
              <InquiryForm />
            </div>

            {/* RIGHT: Information Sidebar (4/12) */}
            <div className="lg:col-span-4 space-y-8">

              {/* B2B Support */}
              <div className="reveal-card bg-surface-container-low p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-6">
                  B2B Support
                </p>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-fixed flex items-center justify-center mt-0.5">
                      <Phone size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-sm font-semibold text-on-surface">+86 871 8800 0000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-fixed flex items-center justify-center mt-0.5">
                      <Mail size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Email</p>
                      <p className="text-sm font-semibold text-on-surface">postmaster@vetrux.tech</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-fixed flex items-center justify-center mt-0.5">
                      <MapPin size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Headquarters</p>
                      <p className="text-sm font-semibold text-on-surface leading-relaxed">
                        Yunnan Province,<br />Southwest China
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="reveal-card overflow-hidden">
                <iframe
                  title="Yunnan Province location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=100.5%2C24.0%2C104.5%2C27.0&layer=mapnik&marker=25.0%2C102.7"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                />
              </div>

              {/* Trust badges */}
              <div className="reveal-card bg-primary p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-6">
                  Certified Standards
                </p>
                <div className="space-y-4">
                  {[
                    { cert: 'Documentation Requests', desc: 'Handled through direct B2B follow-up' },
                    { cert: 'Product Discussions', desc: 'Aligned to current website information' },
                    { cert: 'Facility Overview', desc: 'Shared as part of qualification conversations' },
                    { cert: 'Inquiry Workflow', desc: 'Built for direct buyer communication' },
                  ].map((item) => (
                    <div key={item.cert} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                      <span className="text-xs font-bold text-white">{item.cert}</span>
                      <span className="text-xs text-white/50">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
