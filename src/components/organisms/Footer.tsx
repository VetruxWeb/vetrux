// src/components/organisms/Footer.tsx
// Site footer with brand, nav links, and copyright

import { Link } from 'react-router-dom';

const footerLinks = [
  {
    heading: 'Products',
    links: [
      { label: 'CBD Isolate Overview', href: '/products/cbd-isolate' },
      { label: 'Wholesale Inquiry', href: '/inquiry' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Equipment', href: '/equipment' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Industry Insights', href: '/insights' },
    ],
  },
  {
    heading: 'B2B',
    links: [
      { label: 'Contact & Inquiry', href: '/inquiry' },
      { label: 'Technical Specs', href: '/products/cbd-isolate' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand block */}
          <div className="md:col-span-1">
            <div className="overflow-hidden h-10 mb-4">
              <img
                src="/logo.svg"
                alt="Yunnan Vetrux"
                className="h-32 w-auto"
                style={{ marginTop: '-52px' }}
              />
            </div>
            <p className="text-xs text-inverse-on-surface/60 leading-relaxed">
              Botanical extract manufacturing website for B2B visitors exploring products,
              facility information, and documentation requests.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full tracking-wider uppercase">
                Product Info
              </span>
              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full tracking-wider uppercase">
                Facility View
              </span>
              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full tracking-wider uppercase">
                Inquiry Path
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-xs text-inverse-on-surface/70 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-inverse-on-surface/40">
            © {new Date().getFullYear()} Yunnan Vetrux Co., Ltd. All rights reserved.
          </p>
          <p className="text-xs text-inverse-on-surface/40">
            Yunnan Province, China · B2B Inquiry Website
          </p>
        </div>
      </div>
    </footer>
  );
}
