'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';

interface QuoteInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: string[];
  productName: string;
}

export default function QuoteInquiryModal({ isOpen, onClose, selectedProducts, productName }: QuoteInquiryModalProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/quote-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          message: message.trim() || undefined,
          products: selectedProducts,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setReferenceId(data.referenceId ?? '');
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Submission failed.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold text-on-background">
            Request Quote — {productName}
          </h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 transition-colors">
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="px-6 py-10 text-center">
            <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-on-background mb-2">Inquiry Sent</h3>
            <p className="text-sm text-on-surface-variant mb-2">
              Our team will respond within 24 business hours.
            </p>
            {referenceId && (
              <p className="text-xs text-on-surface-muted">Reference: {referenceId}</p>
            )}
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-deep transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {selectedProducts.length > 0 && (
              <div className="bg-surface-container-low rounded-md p-3">
                <p className="text-xs font-medium text-on-surface-variant mb-1.5">Selected specifications:</p>
                <ul className="text-xs text-on-surface space-y-0.5">
                  {selectedProducts.map((p) => (
                    <li key={p} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@company.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">
                Message <span className="text-on-surface-muted">(optional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Additional requirements, delivery terms, etc."
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium py-2.5 px-4 rounded-md text-sm transition-colors disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : (
                <><Send size={16} /> Request Quote</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
