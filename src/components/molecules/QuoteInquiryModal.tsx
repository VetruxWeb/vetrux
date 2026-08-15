'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import type { Locale } from '@/i18n/locales';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

interface QuoteInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProducts: string[];
  productName: string;
  locale?: Locale;
}

interface ModalStrings {
  title: string;
  selectedSpecs: string;
  nameLabel: string;
  namePlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messageOptional: string;
  messagePlaceholder: string;
  turnstileReady: string;
  turnstileLoading: string;
  turnstileNotConfigured: string;
  validationRequired: string;
  validationEmail: string;
  validationTurnstileNotConfigured: string;
  validationTurnstile: string;
  turnstileFailed: string;
  genericError: string;
  networkError: string;
  sending: string;
  requestQuote: string;
  successTitle: string;
  successBody: string;
  refLabel: string;
  closeBtn: string;
}

const modalStrings: Record<Locale, ModalStrings> = {
  en: {
    title: 'Request Quote',
    selectedSpecs: 'Selected specifications:',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    companyLabel: 'Company',
    companyPlaceholder: 'Company name',
    emailLabel: 'Email',
    emailPlaceholder: 'your@company.com',
    messageLabel: 'Message',
    messageOptional: '(optional)',
    messagePlaceholder: 'Additional requirements, delivery terms, etc.',
    turnstileReady: 'Human verification is ready.',
    turnstileLoading: 'Loading human verification...',
    turnstileNotConfigured: 'Human verification is not configured.',
    validationRequired: 'Please complete all required fields.',
    validationEmail: 'Please enter a valid email address.',
    validationTurnstileNotConfigured: 'Human verification is not configured.',
    validationTurnstile: 'Please complete the human verification.',
    turnstileFailed: 'Human verification failed. Please try again.',
    genericError: 'Submission failed.',
    networkError: 'Network error. Please try again.',
    sending: 'Sending...',
    requestQuote: 'Request Quote',
    successTitle: 'Inquiry Sent',
    successBody: 'Our team will respond within 24 business hours.',
    refLabel: 'Reference',
    closeBtn: 'Close',
  },
  de: {
    title: 'Angebot anfordern',
    selectedSpecs: 'Ausgewählte Spezifikationen:',
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    companyLabel: 'Unternehmen',
    companyPlaceholder: 'Firmenname',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'ihre@unternehmen.com',
    messageLabel: 'Nachricht',
    messageOptional: '(optional)',
    messagePlaceholder: 'Zusätzliche Anforderungen, Lieferbedingungen usw.',
    turnstileReady: 'Menschliche Verifizierung ist bereit.',
    turnstileLoading: 'Menschliche Verifizierung wird geladen...',
    turnstileNotConfigured: 'Menschliche Verifizierung ist nicht konfiguriert.',
    validationRequired: 'Bitte füllen Sie alle Pflichtfelder aus.',
    validationEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    validationTurnstileNotConfigured: 'Menschliche Verifizierung ist nicht konfiguriert.',
    validationTurnstile: 'Bitte schließen Sie die menschliche Verifizierung ab.',
    turnstileFailed: 'Menschliche Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    genericError: 'Übermittlung fehlgeschlagen.',
    networkError: 'Netzwerkfehler. Bitte versuchen Sie es erneut.',
    sending: 'Wird gesendet...',
    requestQuote: 'Angebot anfordern',
    successTitle: 'Anfrage gesendet',
    successBody: 'Unser Team wird innerhalb von 24 Geschäftsstunden antworten.',
    refLabel: 'Referenz',
    closeBtn: 'Schließen',
  },
  fr: {
    title: 'Demander un devis',
    selectedSpecs: 'Spécifications sélectionnées :',
    nameLabel: 'Nom',
    namePlaceholder: 'Votre nom',
    companyLabel: 'Entreprise',
    companyPlaceholder: "Nom de l'entreprise",
    emailLabel: 'E-mail',
    emailPlaceholder: 'vous@entreprise.com',
    messageLabel: 'Message',
    messageOptional: '(facultatif)',
    messagePlaceholder: 'Exigences supplémentaires, conditions de livraison, etc.',
    turnstileReady: 'La vérification humaine est prête.',
    turnstileLoading: 'Chargement de la vérification humaine...',
    turnstileNotConfigured: "La vérification humaine n'est pas configurée.",
    validationRequired: 'Veuillez remplir tous les champs obligatoires.',
    validationEmail: 'Veuillez saisir une adresse e-mail valide.',
    validationTurnstileNotConfigured: "La vérification humaine n'est pas configurée.",
    validationTurnstile: 'Veuillez compléter la vérification humaine.',
    turnstileFailed: 'La vérification humaine a échoué. Veuillez réessayer.',
    genericError: "Échec de l'envoi.",
    networkError: 'Erreur réseau. Veuillez réessayer.',
    sending: 'Envoi en cours...',
    requestQuote: 'Demander un devis',
    successTitle: 'Demande envoyée',
    successBody: 'Notre équipe répondra dans les 24 heures ouvrées.',
    refLabel: 'Référence',
    closeBtn: 'Fermer',
  },
  es: {
    title: 'Solicitar cotización',
    selectedSpecs: 'Especificaciones seleccionadas:',
    nameLabel: 'Nombre',
    namePlaceholder: 'Su nombre',
    companyLabel: 'Empresa',
    companyPlaceholder: 'Nombre de la empresa',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'usted@empresa.com',
    messageLabel: 'Mensaje',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Requisitos adicionales, condiciones de entrega, etc.',
    turnstileReady: 'La verificación humana está lista.',
    turnstileLoading: 'Cargando verificación humana...',
    turnstileNotConfigured: 'La verificación humana no está configurada.',
    validationRequired: 'Por favor, complete todos los campos obligatorios.',
    validationEmail: 'Por favor, introduzca una dirección de correo electrónico válida.',
    validationTurnstileNotConfigured: 'La verificación humana no está configurada.',
    validationTurnstile: 'Por favor, complete la verificación humana.',
    turnstileFailed: 'La verificación humana ha fallado. Por favor, inténtelo de nuevo.',
    genericError: 'Error al enviar.',
    networkError: 'Error de red. Por favor, inténtelo de nuevo.',
    sending: 'Enviando...',
    requestQuote: 'Solicitar cotización',
    successTitle: 'Solicitud enviada',
    successBody: 'Nuestro equipo responderá en un plazo de 24 horas laborables.',
    refLabel: 'Referencia',
    closeBtn: 'Cerrar',
  },
  it: {
    title: 'Richiedi preventivo',
    selectedSpecs: 'Specifiche selezionate:',
    nameLabel: 'Nome',
    namePlaceholder: 'Il suo nome',
    companyLabel: 'Azienda',
    companyPlaceholder: "Nome dell'azienda",
    emailLabel: 'E-mail',
    emailPlaceholder: 'lei@azienda.com',
    messageLabel: 'Messaggio',
    messageOptional: '(facoltativo)',
    messagePlaceholder: 'Requisiti aggiuntivi, termini di consegna, ecc.',
    turnstileReady: 'La verifica umana è pronta.',
    turnstileLoading: 'Caricamento verifica umana...',
    turnstileNotConfigured: 'La verifica umana non è configurata.',
    validationRequired: 'Si prega di compilare tutti i campi obbligatori.',
    validationEmail: 'Si prega di inserire un indirizzo e-mail valido.',
    validationTurnstileNotConfigured: 'La verifica umana non è configurata.',
    validationTurnstile: 'Si prega di completare la verifica umana.',
    turnstileFailed: 'Verifica umana non riuscita. Si prega di riprovare.',
    genericError: "Invio non riuscito.",
    networkError: 'Errore di rete. Si prega di riprovare.',
    sending: 'Invio in corso...',
    requestQuote: 'Richiedi preventivo',
    successTitle: 'Richiesta inviata',
    successBody: 'Il nostro team risponderà entro 24 ore lavorative.',
    refLabel: 'Riferimento',
    closeBtn: 'Chiudi',
  },
  pt: {
    title: 'Solicitar orçamento',
    selectedSpecs: 'Especificações selecionadas:',
    nameLabel: 'Nome',
    namePlaceholder: 'O seu nome',
    companyLabel: 'Empresa',
    companyPlaceholder: 'Nome da empresa',
    emailLabel: 'E-mail',
    emailPlaceholder: 'voce@empresa.com',
    messageLabel: 'Mensagem',
    messageOptional: '(opcional)',
    messagePlaceholder: 'Requisitos adicionais, condições de entrega, etc.',
    turnstileReady: 'A verificação humana está pronta.',
    turnstileLoading: 'A carregar verificação humana...',
    turnstileNotConfigured: 'A verificação humana não está configurada.',
    validationRequired: 'Por favor, preencha todos os campos obrigatórios.',
    validationEmail: 'Por favor, introduza um endereço de e-mail válido.',
    validationTurnstileNotConfigured: 'A verificação humana não está configurada.',
    validationTurnstile: 'Por favor, conclua a verificação humana.',
    turnstileFailed: 'A verificação humana falhou. Por favor, tente novamente.',
    genericError: 'Falha no envio.',
    networkError: 'Erro de rede. Por favor, tente novamente.',
    sending: 'A enviar...',
    requestQuote: 'Solicitar orçamento',
    successTitle: 'Pedido enviado',
    successBody: 'A nossa equipa responderá no prazo de 24 horas úteis.',
    refLabel: 'Referência',
    closeBtn: 'Fechar',
  },
  ja: {
    title: '見積もりを依頼する',
    selectedSpecs: '選択した仕様：',
    nameLabel: 'お名前',
    namePlaceholder: 'お名前をご入力ください',
    companyLabel: '会社名',
    companyPlaceholder: '会社名をご入力ください',
    emailLabel: 'メールアドレス',
    emailPlaceholder: 'your@company.com',
    messageLabel: 'メッセージ',
    messageOptional: '（任意）',
    messagePlaceholder: 'その他のご要望、納期条件など',
    turnstileReady: '本人確認の準備が完了しました。',
    turnstileLoading: '本人確認を読み込んでいます...',
    turnstileNotConfigured: '本人確認が設定されていません。',
    validationRequired: '必須項目をすべてご入力ください。',
    validationEmail: '有効なメールアドレスをご入力ください。',
    validationTurnstileNotConfigured: '本人確認が設定されていません。',
    validationTurnstile: '本人確認を完了してください。',
    turnstileFailed: '本人確認に失敗しました。もう一度お試しください。',
    genericError: '送信に失敗しました。',
    networkError: 'ネットワークエラーです。もう一度お試しください。',
    sending: '送信中...',
    requestQuote: '見積もりを依頼する',
    successTitle: 'お問い合わせを受け付けました',
    successBody: '担当チームより24営業時間以内にご連絡いたします。',
    refLabel: '参照番号',
    closeBtn: '閉じる',
  },
  fi: {
    title: 'Pyydä tarjous',
    selectedSpecs: 'Valitut tekniset tiedot:',
    nameLabel: 'Nimi',
    namePlaceholder: 'Nimenne',
    companyLabel: 'Yritys',
    companyPlaceholder: 'Yrityksen nimi',
    emailLabel: 'Sähköposti',
    emailPlaceholder: 'teidan@yritys.com',
    messageLabel: 'Viesti',
    messageOptional: '(valinnainen)',
    messagePlaceholder: 'Lisävaatimukset, toimitusehdot jne.',
    turnstileReady: 'Henkilöllisyyden varmennus on valmis.',
    turnstileLoading: 'Ladataan henkilöllisyyden varmennusta...',
    turnstileNotConfigured: 'Henkilöllisyyden varmennusta ei ole määritetty.',
    validationRequired: 'Täyttäkää kaikki pakolliset kentät.',
    validationEmail: 'Syöttäkää kelvollinen sähköpostiosoite.',
    validationTurnstileNotConfigured: 'Henkilöllisyyden varmennusta ei ole määritetty.',
    validationTurnstile: 'Suorittakaa henkilöllisyyden varmennus loppuun.',
    turnstileFailed: 'Henkilöllisyyden varmennus epäonnistui. Yrittäkää uudelleen.',
    genericError: 'Lähetys epäonnistui.',
    networkError: 'Verkkovirhe. Yrittäkää uudelleen.',
    sending: 'Lähetetään...',
    requestQuote: 'Pyydä tarjous',
    successTitle: 'Pyyntö lähetetty',
    successBody: 'Tiimimme vastaa 24 arkituntitunnin kuluessa.',
    refLabel: 'Viite',
    closeBtn: 'Sulje',
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function QuoteInquiryModal({ isOpen, onClose, selectedProducts, productName, locale = 'en' }: QuoteInquiryModalProps) {
  const t = modalStrings[locale];
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [formStartedAt, setFormStartedAt] = useState(() => new Date().toISOString());
  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [isTurnstileReady, setIsTurnstileReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? '';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || status === 'success') return;
    if (!turnstileSiteKey || !turnstileContainerRef.current) return;
    if (turnstileWidgetIdRef.current) return;

    let isCancelled = false;

    const renderWidget = () => {
      if (
        isCancelled
        || !window.turnstile
        || !turnstileContainerRef.current
        || turnstileWidgetIdRef.current
      ) return;

      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        theme: 'light',
        callback: (token) => {
          setTurnstileToken(token);
          setErrorMsg('');
        },
        'expired-callback': () => {
          setTurnstileToken('');
        },
        'error-callback': () => {
          setTurnstileToken('');
          setErrorMsg(t.turnstileFailed);
        },
      });
      setIsTurnstileReady(true);
    };

    const existingScript = document.getElementById('cf-turnstile-script') as HTMLScriptElement | null;
    if (existingScript) {
      if (window.turnstile) {
        renderWidget();
      } else {
        existingScript.addEventListener('load', renderWidget, { once: true });
      }
      return () => { isCancelled = true; };
    }

    const script = document.createElement('script');
    script.id = 'cf-turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', renderWidget, { once: true });
    document.head.appendChild(script);

    return () => { isCancelled = true; };
  }, [isOpen, status, t.turnstileFailed, turnstileSiteKey]);

  const resetTurnstile = () => {
    setTurnstileToken('');
    setFormStartedAt(new Date().toISOString());
    if (window.turnstile && turnstileWidgetIdRef.current) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const validate = (): boolean => {
    if (!name.trim() || !company.trim() || !email.trim()) {
      setErrorMsg(t.validationRequired);
      return false;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      setErrorMsg(t.validationEmail);
      return false;
    }

    if (!turnstileSiteKey) {
      setErrorMsg(t.validationTurnstileNotConfigured);
      return false;
    }

    if (!turnstileToken) {
      setErrorMsg(t.validationTurnstile);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validate()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

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
          website,
          formStartedAt,
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setReferenceId(data.referenceId ?? '');
      } else {
        setStatus('error');
        setErrorMsg(data.message || t.genericError);
        resetTurnstile();
      }
    } catch {
      setStatus('error');
      setErrorMsg(t.networkError);
      resetTurnstile();
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
            {t.title} — {productName}
          </h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 transition-colors">
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="px-6 py-10 text-center">
            <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-on-background mb-2">{t.successTitle}</h3>
            <p className="text-sm text-on-surface-variant mb-2">
              {t.successBody}
            </p>
            {referenceId && (
              <p className="text-xs text-on-surface-muted">{t.refLabel}: {referenceId}</p>
            )}
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-deep transition-colors"
            >
              {t.closeBtn}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4" noValidate>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

            {selectedProducts.length > 0 && (
              <div className="bg-surface-container-low rounded-md p-3">
                <p className="text-xs font-medium text-on-surface-variant mb-1.5">{t.selectedSpecs}</p>
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
                {t.nameLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">
                {t.companyLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={t.companyPlaceholder}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">
                {t.emailLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">
                {t.messageLabel} <span className="text-on-surface-muted">{t.messageOptional}</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <div ref={turnstileContainerRef} className="min-h-[65px]" />
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {turnstileSiteKey
                  ? isTurnstileReady
                    ? t.turnstileReady
                    : t.turnstileLoading
                  : t.turnstileNotConfigured}
              </p>
            </div>

            {status === 'error' && errorMsg && (
              <p className="text-sm text-red-600">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting' || !turnstileSiteKey}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium py-2.5 px-4 rounded-md text-sm transition-colors disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <><Loader2 size={16} className="animate-spin" /> {t.sending}</>
              ) : (
                <><Send size={16} /> {t.requestQuote}</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
