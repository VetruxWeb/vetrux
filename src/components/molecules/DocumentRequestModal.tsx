'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, CheckCircle2, FileText, ShieldCheck, X } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { submitDocumentRequest } from '@/lib/documentRequestClient';
import type {
  DocumentRequestDocumentType,
  DocumentRequestPayload,
} from '@/lib/documentRequest';
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

interface DocumentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDocumentType?: DocumentRequestDocumentType;
  sourcePage: string;
  productInterest?: string;
  locale?: Locale;
}

interface ModalStrings {
  eyebrow: string;
  getLabel: string;
  coaAndSds: string;
  introText: string;
  successTitle: string;
  successBody: string;
  refLabel: string;
  closeBtn: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  turnstileReady: string;
  turnstileLoading: string;
  turnstileNotConfigured: string;
  validationNameEmail: string;
  validationEmail: string;
  validationTurnstileNotConfigured: string;
  validationTurnstile: string;
  turnstileFailed: string;
  genericError: string;
  securityNote: string;
  sending: string;
  getDocuments: string;
}

const modalStrings: Record<Locale, ModalStrings> = {
  en: {
    eyebrow: 'Quality documents',
    getLabel: 'Get',
    coaAndSds: 'COA and SDS',
    introText: 'Leave your name and email. We will send the requested documents to your email address.',
    successTitle: 'Request received',
    successBody: 'Thank you! We will review your request and send the documents to your email shortly.',
    refLabel: 'Ref',
    closeBtn: 'Close',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Business email',
    emailPlaceholder: 'name@company.com',
    turnstileReady: 'Human verification is ready.',
    turnstileLoading: 'Loading human verification...',
    turnstileNotConfigured: 'Human verification is not configured.',
    validationNameEmail: 'Please add your name and email.',
    validationEmail: 'Please enter a valid email address.',
    validationTurnstileNotConfigured: 'Human verification is not configured.',
    validationTurnstile: 'Please complete the human verification.',
    turnstileFailed: 'Human verification failed. Please try again.',
    genericError: 'Unable to request documents right now.',
    securityNote: 'We will use this to send document context and follow up if needed.',
    sending: 'Sending',
    getDocuments: 'Get Documents',
  },
  de: {
    eyebrow: 'Qualitätsdokumente',
    getLabel: 'Anfordern',
    coaAndSds: 'COA und SDS',
    introText: 'Geben Sie Ihren Namen und Ihre E-Mail-Adresse an. Wir senden Ihnen die angeforderten Dokumente per E-Mail zu.',
    successTitle: 'Anfrage erhalten',
    successBody: 'Vielen Dank! Wir werden Ihre Anfrage prüfen und Ihnen die Dokumente in Kürze per E-Mail zusenden.',
    refLabel: 'Ref',
    closeBtn: 'Schließen',
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    emailLabel: 'Geschäftliche E-Mail',
    emailPlaceholder: 'name@unternehmen.com',
    turnstileReady: 'Menschliche Verifizierung ist bereit.',
    turnstileLoading: 'Menschliche Verifizierung wird geladen...',
    turnstileNotConfigured: 'Menschliche Verifizierung ist nicht konfiguriert.',
    validationNameEmail: 'Bitte geben Sie Ihren Namen und Ihre E-Mail-Adresse an.',
    validationEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    validationTurnstileNotConfigured: 'Menschliche Verifizierung ist nicht konfiguriert.',
    validationTurnstile: 'Bitte schließen Sie die menschliche Verifizierung ab.',
    turnstileFailed: 'Menschliche Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    genericError: 'Dokumente können derzeit nicht angefordert werden.',
    securityNote: 'Wir verwenden diese Angaben, um Dokumenteninformationen zu senden und bei Bedarf nachzufassen.',
    sending: 'Wird gesendet',
    getDocuments: 'Dokumente anfordern',
  },
  fr: {
    eyebrow: 'Documents qualité',
    getLabel: 'Obtenir',
    coaAndSds: 'COA et SDS',
    introText: "Indiquez votre nom et votre adresse e-mail. Nous vous enverrons les documents demandés par e-mail.",
    successTitle: 'Demande reçue',
    successBody: "Merci ! Nous examinerons votre demande et vous enverrons les documents par e-mail dans les plus brefs délais.",
    refLabel: 'Réf',
    closeBtn: 'Fermer',
    nameLabel: 'Nom',
    namePlaceholder: 'Votre nom',
    emailLabel: 'E-mail professionnel',
    emailPlaceholder: 'nom@entreprise.com',
    turnstileReady: 'La vérification humaine est prête.',
    turnstileLoading: 'Chargement de la vérification humaine...',
    turnstileNotConfigured: "La vérification humaine n'est pas configurée.",
    validationNameEmail: 'Veuillez indiquer votre nom et votre adresse e-mail.',
    validationEmail: 'Veuillez saisir une adresse e-mail valide.',
    validationTurnstileNotConfigured: "La vérification humaine n'est pas configurée.",
    validationTurnstile: 'Veuillez compléter la vérification humaine.',
    turnstileFailed: 'La vérification humaine a échoué. Veuillez réessayer.',
    genericError: 'Impossible de demander des documents pour le moment.',
    securityNote: 'Nous utiliserons ces informations pour envoyer le contexte du document et assurer un suivi si nécessaire.',
    sending: 'Envoi en cours',
    getDocuments: 'Obtenir les documents',
  },
  es: {
    eyebrow: 'Documentos de calidad',
    getLabel: 'Obtener',
    coaAndSds: 'COA y SDS',
    introText: 'Indique su nombre y correo electrónico. Le enviaremos los documentos solicitados a su correo electrónico.',
    successTitle: 'Solicitud recibida',
    successBody: '¡Gracias! Revisaremos su solicitud y le enviaremos los documentos a su correo electrónico en breve.',
    refLabel: 'Ref',
    closeBtn: 'Cerrar',
    nameLabel: 'Nombre',
    namePlaceholder: 'Su nombre',
    emailLabel: 'Correo empresarial',
    emailPlaceholder: 'nombre@empresa.com',
    turnstileReady: 'La verificación humana está lista.',
    turnstileLoading: 'Cargando verificación humana...',
    turnstileNotConfigured: 'La verificación humana no está configurada.',
    validationNameEmail: 'Por favor, indique su nombre y correo electrónico.',
    validationEmail: 'Por favor, introduzca una dirección de correo electrónico válida.',
    validationTurnstileNotConfigured: 'La verificación humana no está configurada.',
    validationTurnstile: 'Por favor, complete la verificación humana.',
    turnstileFailed: 'La verificación humana ha fallado. Por favor, inténtelo de nuevo.',
    genericError: 'No es posible solicitar documentos en este momento.',
    securityNote: 'Utilizaremos esta información para enviar el contexto del documento y hacer seguimiento si es necesario.',
    sending: 'Enviando',
    getDocuments: 'Obtener documentos',
  },
  it: {
    eyebrow: 'Documenti di qualità',
    getLabel: 'Richiedi',
    coaAndSds: 'COA e SDS',
    introText: "Inserisca il suo nome e indirizzo e-mail. Le invieremo i documenti richiesti via e-mail.",
    successTitle: 'Richiesta ricevuta',
    successBody: 'Grazie! Esamineremo la sua richiesta e le invieremo i documenti via e-mail a breve.',
    refLabel: 'Rif',
    closeBtn: 'Chiudi',
    nameLabel: 'Nome',
    namePlaceholder: 'Il suo nome',
    emailLabel: 'E-mail aziendale',
    emailPlaceholder: 'nome@azienda.com',
    turnstileReady: 'La verifica umana è pronta.',
    turnstileLoading: 'Caricamento verifica umana...',
    turnstileNotConfigured: 'La verifica umana non è configurata.',
    validationNameEmail: 'Si prega di inserire nome e indirizzo e-mail.',
    validationEmail: 'Si prega di inserire un indirizzo e-mail valido.',
    validationTurnstileNotConfigured: 'La verifica umana non è configurata.',
    validationTurnstile: 'Si prega di completare la verifica umana.',
    turnstileFailed: 'Verifica umana non riuscita. Si prega di riprovare.',
    genericError: 'Impossibile richiedere documenti al momento.',
    securityNote: 'Utilizzeremo queste informazioni per inviare il contesto del documento e per eventuali follow-up.',
    sending: 'Invio in corso',
    getDocuments: 'Richiedi documenti',
  },
  pt: {
    eyebrow: 'Documentos de qualidade',
    getLabel: 'Obter',
    coaAndSds: 'COA e SDS',
    introText: 'Indique o seu nome e endereço de e-mail. Enviaremos os documentos solicitados para o seu e-mail.',
    successTitle: 'Pedido recebido',
    successBody: 'Obrigado! Analisaremos o seu pedido e enviaremos os documentos para o seu e-mail em breve.',
    refLabel: 'Ref',
    closeBtn: 'Fechar',
    nameLabel: 'Nome',
    namePlaceholder: 'O seu nome',
    emailLabel: 'E-mail empresarial',
    emailPlaceholder: 'nome@empresa.com',
    turnstileReady: 'A verificação humana está pronta.',
    turnstileLoading: 'A carregar verificação humana...',
    turnstileNotConfigured: 'A verificação humana não está configurada.',
    validationNameEmail: 'Por favor, indique o seu nome e endereço de e-mail.',
    validationEmail: 'Por favor, introduza um endereço de e-mail válido.',
    validationTurnstileNotConfigured: 'A verificação humana não está configurada.',
    validationTurnstile: 'Por favor, conclua a verificação humana.',
    turnstileFailed: 'A verificação humana falhou. Por favor, tente novamente.',
    genericError: 'Não é possível solicitar documentos neste momento.',
    securityNote: 'Utilizaremos estas informações para enviar o contexto do documento e para acompanhamento, se necessário.',
    sending: 'A enviar',
    getDocuments: 'Obter documentos',
  },
  ja: {
    eyebrow: '品質書類',
    getLabel: '取得する',
    coaAndSds: 'COA および SDS',
    introText: 'お名前とメールアドレスをご入力ください。ご要望の書類をメールにてお送りいたします。',
    successTitle: 'リクエストを受け付けました',
    successBody: 'ありがとうございます。ご依頼を確認の上、書類をメールにてお送りいたします。',
    refLabel: '参照番号',
    closeBtn: '閉じる',
    nameLabel: 'お名前',
    namePlaceholder: 'お名前をご入力ください',
    emailLabel: 'ビジネスメール',
    emailPlaceholder: 'name@company.com',
    turnstileReady: '本人確認の準備が完了しました。',
    turnstileLoading: '本人確認を読み込んでいます...',
    turnstileNotConfigured: '本人確認が設定されていません。',
    validationNameEmail: 'お名前とメールアドレスをご入力ください。',
    validationEmail: '有効なメールアドレスをご入力ください。',
    validationTurnstileNotConfigured: '本人確認が設定されていません。',
    validationTurnstile: '本人確認を完了してください。',
    turnstileFailed: '本人確認に失敗しました。もう一度お試しください。',
    genericError: '現在、書類のリクエストができません。',
    securityNote: 'この情報は書類の送付および必要に応じたフォローアップに使用いたします。',
    sending: '送信中',
    getDocuments: '書類を取得する',
  },
  fi: {
    eyebrow: 'Laatuasiakirjat',
    getLabel: 'Pyydä',
    coaAndSds: 'COA ja SDS',
    introText: 'Syötä nimesi ja sähköpostiosoitteesi. Lähetämme pyydetyt asiakirjat sähköpostiisi.',
    successTitle: 'Pyyntö vastaanotettu',
    successBody: 'Kiitos! Tarkistamme pyyntönne ja lähetämme asiakirjat sähköpostiinne pian.',
    refLabel: 'Viite',
    closeBtn: 'Sulje',
    nameLabel: 'Nimi',
    namePlaceholder: 'Nimenne',
    emailLabel: 'Yrityssähköposti',
    emailPlaceholder: 'nimi@yritys.com',
    turnstileReady: 'Henkilöllisyyden varmennus on valmis.',
    turnstileLoading: 'Ladataan henkilöllisyyden varmennusta...',
    turnstileNotConfigured: 'Henkilöllisyyden varmennusta ei ole määritetty.',
    validationNameEmail: 'Lisätkää nimenne ja sähköpostiosoitteenne.',
    validationEmail: 'Syöttäkää kelvollinen sähköpostiosoite.',
    validationTurnstileNotConfigured: 'Henkilöllisyyden varmennusta ei ole määritetty.',
    validationTurnstile: 'Suorittakaa henkilöllisyyden varmennus loppuun.',
    turnstileFailed: 'Henkilöllisyyden varmennus epäonnistui. Yrittäkää uudelleen.',
    genericError: 'Asiakirjoja ei voi pyytää juuri nyt.',
    securityNote: 'Käytämme näitä tietoja asiakirjakontekstin lähettämiseen ja tarvittaessa jatkotoimenpiteisiin.',
    sending: 'Lähetetään',
    getDocuments: 'Pyydä asiakirjoja',
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = (
  defaultDocumentType: DocumentRequestDocumentType,
  sourcePage: string,
  productInterest: string,
): DocumentRequestPayload => ({
  name: '',
  email: '',
  documentType: defaultDocumentType,
  productInterest,
  sourcePage,
  website: '',
  formStartedAt: new Date().toISOString(),
  turnstileToken: '',
});

export default function DocumentRequestModal({
  isOpen,
  onClose,
  defaultDocumentType = 'both',
  sourcePage,
  productInterest = 'CBD Isolate',
  locale = 'en',
}: DocumentRequestModalProps) {
  const t = modalStrings[locale];
  const documentTypeLabels: Record<DocumentRequestDocumentType, string> = {
    COA: 'COA',
    SDS: 'SDS',
    both: t.coaAndSds,
  };
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? '';
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [form, setForm] = useState<DocumentRequestPayload>(() => (
    initialForm(defaultDocumentType, sourcePage, productInterest)
  ));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [isTurnstileReady, setIsTurnstileReady] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const hasAccess = referenceId !== '';
  const documentLabel = useMemo(
    () => documentTypeLabels[form.documentType] ?? documentTypeLabels.both,
    [form.documentType],
  );

  const resetTurnstile = () => {
    setForm((currentForm) => ({
      ...currentForm,
      turnstileToken: '',
      formStartedAt: new Date().toISOString(),
    }));
    if (window.turnstile && turnstileWidgetIdRef.current) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm(initialForm(defaultDocumentType, sourcePage, productInterest));
    setErrorMessage('');
    setFieldError('');
    setReferenceId('');
    setIsTurnstileReady(false);
    turnstileWidgetIdRef.current = null;
  }, [defaultDocumentType, isOpen, productInterest, sourcePage]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || hasAccess) return;
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
          setForm((currentForm) => ({ ...currentForm, turnstileToken: token }));
          setErrorMessage('');
        },
        'expired-callback': () => {
          setForm((currentForm) => ({ ...currentForm, turnstileToken: '' }));
        },
        'error-callback': () => {
          setForm((currentForm) => ({ ...currentForm, turnstileToken: '' }));
          setErrorMessage(t.turnstileFailed);
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
  }, [hasAccess, isOpen, turnstileSiteKey]);

  const validate = (): boolean => {
    setFieldError('');
    if (!form.name.trim() || !form.email.trim()) {
      setFieldError(t.validationNameEmail);
      return false;
    }

    if (!EMAIL_RE.test(form.email)) {
      setFieldError(t.validationEmail);
      return false;
    }

    if (!turnstileSiteKey) {
      setFieldError(t.validationTurnstileNotConfigured);
      return false;
    }

    if (!form.turnstileToken) {
      setFieldError(t.validationTurnstile);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitDocumentRequest(form);
      setReferenceId(response.referenceId ?? 'submitted');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t.genericError);
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-request-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-surface-ink/70 backdrop-blur-sm"
        aria-label="Close document request"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-md bg-surface-high shadow-2xl border border-outline-variant/40">
        <div className="p-6 md:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md text-on-surface-variant hover:bg-surface-container transition-colors"
            aria-label="Close document request"
          >
            <X size={18} />
          </button>

          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent mb-5">
            <FileText size={18} />
          </div>

          <p className="text-xs font-semibold tracking-[0.28em] uppercase text-accent mb-3">
            {t.eyebrow}
          </p>
          <h2
            id="document-request-title"
            className="font-serif text-3xl md:text-4xl font-medium text-on-background tracking-tight leading-[1.05] mb-3"
          >
            {t.getLabel} {documentLabel}
          </h2>
          <p className="text-sm leading-relaxed text-on-surface-variant mb-6">
            {t.introText}
          </p>

          {hasAccess ? (
            <div role="status" aria-live="polite">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <CheckCircle2 size={18} />
                </span>
                <p className="font-serif text-2xl font-medium text-on-background">
                  {t.successTitle}
                </p>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                {t.successBody}
              </p>

              {referenceId ? (
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-accent-soft">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-accent-hover">
                    {t.refLabel}
                  </span>
                  <span className="text-[12px] font-semibold tracking-wider text-accent-hover">
                    {referenceId}
                  </span>
                </div>
              ) : null}

              <div className="mt-6">
                <Button type="button" variant="outline" size="md" onClick={onClose}>
                  {t.closeBtn}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                value={form.website ?? ''}
                onChange={(event) => setForm({ ...form, website: event.target.value })}
              />

              <div>
                <label htmlFor="document-request-name" className="block text-xs font-semibold tracking-wider mb-2 text-on-surface">
                  {t.nameLabel} <span className="text-accent">*</span>
                </label>
                <input
                  id="document-request-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t.namePlaceholder}
                  className="input-minimal"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                />
              </div>

              <div>
                <label htmlFor="document-request-email" className="block text-xs font-semibold tracking-wider mb-2 text-on-surface">
                  {t.emailLabel} <span className="text-accent">*</span>
                </label>
                <input
                  id="document-request-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t.emailPlaceholder}
                  className="input-minimal"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
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

              {(fieldError || errorMessage) ? (
                <div className="text-sm rounded-sm px-3 py-2 bg-rose-50 text-rose-700 border border-rose-200" role="alert">
                  {errorMessage || fieldError}
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-start gap-2 text-[11px] leading-relaxed text-on-surface-variant max-w-xs">
                  <ShieldCheck size={13} className="mt-0.5 shrink-0" />
                  <span>{t.securityNote}</span>
                </div>
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  icon={ArrowRight}
                  loading={isSubmitting}
                  disabled={!turnstileSiteKey}
                >
                  {isSubmitting ? t.sending : t.getDocuments}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
