// src/components/molecules/InquiryForm.tsx
// Reusable B2B inquiry / wholesale form molecule
// Used on multiple pages; minimal bottom-border input style

import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../atoms/Button';
import { submitInquiry } from '../../lib/inquiryClient';
import type { InquiryPayload } from '../../lib/inquiry';

interface InquiryFormProps {
  darkBg?: boolean;
}

const initialForm = (): InquiryPayload => ({
  companyName: '',
  contactPerson: '',
  email: '',
  monthlyVolume: '',
  requirements: '',
  website: '',
  formStartedAt: new Date().toISOString(),
});

export default function InquiryForm({ darkBg = false }: InquiryFormProps) {
  const [form, setForm] = useState<InquiryPayload>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const inputClass = darkBg
    ? 'w-full bg-transparent border-0 border-b border-white/20 pb-3 pt-1 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-all duration-200'
    : 'input-minimal';

  const labelClass = darkBg
    ? 'block text-xs font-semibold tracking-widest uppercase mb-2 text-white/50'
    : 'block text-xs font-semibold tracking-widest uppercase mb-2 text-on-surface-variant';

  const helperTextClass = useMemo(
    () => (darkBg ? 'text-white/55' : 'text-on-surface-variant'),
    [darkBg],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await submitInquiry(form);
      setReferenceId(response.referenceId ?? '');
      setSubmitted(true);
      setForm(initialForm());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to submit your inquiry right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`p-8 ${darkBg ? 'bg-white/5' : 'bg-surface-container-low'}`}>
        <p className={`text-lg font-semibold mb-2 ${darkBg ? 'text-white' : 'text-on-surface'}`}>
          Inquiry Received
        </p>
        <p className={`text-sm leading-relaxed mb-3 ${darkBg ? 'text-white/60' : 'text-on-surface-variant'}`}>
          Thank you for your interest. Our B2B team will respond within 24 business hours.
        </p>
        {referenceId ? (
          <p className={`text-xs tracking-[0.2em] uppercase ${darkBg ? 'text-white/45' : 'text-on-surface-variant'}`}>
            Reference ID: {referenceId}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={form.website ?? ''}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Company Name</label>
          <input
            type="text"
            required
            placeholder="Acme Pharmaceuticals Ltd."
            className={inputClass}
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Contact Person</label>
          <input
            type="text"
            required
            placeholder="Dr. Jane Smith"
            className={inputClass}
            value={form.contactPerson}
            onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Corporate Email</label>
        <input
          type="email"
          required
          placeholder="procurement@company.com"
          className={inputClass}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div>
        <label className={labelClass}>Monthly Volume Estimate</label>
        <select
          required
          className={`${darkBg
            ? 'w-full bg-transparent border-0 border-b border-white/20 pb-3 pt-1 text-white focus:outline-none focus:border-white/60 appearance-none'
            : 'select-minimal'
          } transition-all duration-200`}
          value={form.monthlyVolume}
          onChange={(e) => setForm({ ...form, monthlyVolume: e.target.value })}
        >
          <option value="" disabled>Select estimated volume</option>
          <option value="<10kg">&lt; 10 KG / month</option>
          <option value="10-50kg">10 – 50 KG / month</option>
          <option value="50-200kg">50 – 200 KG / month</option>
          <option value="200-500kg">200 – 500 KG / month</option>
          <option value="500kg+">500+ KG / month</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Product Requirements & Notes</label>
        <textarea
          rows={4}
          required
          minLength={20}
          maxLength={4000}
          placeholder="Describe your specific product requirements, certifications needed, delivery terms, etc."
          className={`${darkBg
            ? 'w-full bg-transparent border-0 border-b border-white/20 pb-3 pt-1 text-white placeholder-white/40 focus:outline-none focus:border-white/60 resize-none'
            : 'textarea-minimal'
          } transition-all duration-200`}
          value={form.requirements}
          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
        />
      </div>

      <div className={`flex items-start gap-3 text-xs leading-relaxed ${helperTextClass}`}>
        <ShieldCheck size={14} className="mt-0.5 shrink-0" />
        <p>
          This form is protected with server-side validation, origin checks, honeypot filtering,
          and rate limiting to reduce spam and abuse.
        </p>
      </div>

      {errorMessage ? (
        <div className={`text-sm ${darkBg ? 'text-rose-200' : 'text-rose-700'}`}>
          {errorMessage}
        </div>
      ) : null}

      <Button type="submit" variant={darkBg ? 'glass' : 'primary'} size="lg" icon={ArrowRight} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Submit Technical Inquiry'}
      </Button>
    </form>
  );
}
