'use client'

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Shield, Download } from 'lucide-react';
import Link from 'next/link';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import DocumentRequestModal from '@/components/molecules/DocumentRequestModal';
import SectionLabel from '@/components/atoms/SectionLabel';
import { useReveal } from '@/hooks/useReveal';
import type { DocumentRequestDocumentType } from '@/lib/documentRequest';
import type { Locale } from '@/i18n/locales';

interface QualityAssuranceClientProps {
  locale?: Locale;
}

const content = {
  en: {
    badge: 'Quality Management',
    heroTitle1: 'CBD Isolate',
    heroTitleAccent: 'Quality Assurance',
    heroP1: 'VETRUX supports CBD isolate quality review with in-house HPLC analytical capability, COA/SDS support, test reports, batch documents, and shipment documentation arranged according to order terms.',
    heroP2: 'Supporting documentation including COA, SDS, test reports, and other shipment documents may be provided according to order requirements. Specific documentation availability depends on actual batch, order terms, and verification results.',
    tags: ['HPLC Capability', 'Documentation Support', 'Standardized Process'],
    btnRequestDocs: 'Request Batch Documents',
    btnViewProducts: 'View Products',
    altText: 'Vetrux facility equipment',
    docSectionLabel: 'Documentation',
    docTitle: 'CBD isolate COA, SDS and batch documents',
    docDesc: "Vetrux can provide supporting documentation according to order requirements. Destination country import compliance is the buyer/importer's responsibility.",
    docContact: 'For documentation inquiries, contact',
    answersSectionLabel: 'Buyer Answers',
    answersTitle: 'CBD isolate quality assurance answers',
    approachSectionLabel: 'Approach',
    approachTitle: 'HPLC-supported quality management approach',
    btnContactUs: 'Contact Us',
    approachFooter: "Product labels, usage declarations, and customs descriptions should match actual batch, order purpose, and destination country requirements. Destination country regulatory compliance is the buyer/importer's responsibility.",
    dlSectionLabel: 'Downloads',
    dlTitle: 'Downloadable Documents',
    dlDesc: 'Product documentation for reference. Batch-specific documentation depends on actual batch, order terms, and verification results.',
    dlContact: 'For additional documentation requests, contact',
    documentationItems: [
      { title: 'HPLC Analytical Capability', detail: 'In-house HPLC system for analytical testing support.' },
      { title: 'Certificate of Analysis (COA)', detail: 'May be provided according to order requirements and actual batch availability.' },
      { title: 'Safety Data Sheet (SDS)', detail: 'May be provided according to order requirements.' },
      { title: 'Test Reports', detail: 'May be provided according to order requirements and actual batch availability.' },
      { title: 'Commercial Invoice & Packing List', detail: 'Provided per shipment.' },
      { title: 'Other Supporting Documents', detail: 'Additional documentation may be arranged according to actual order terms and destination requirements.' },
    ],
    qaApproach: [
      { step: '01', title: 'Cultivation Management', desc: 'Quality-oriented seed selection and standardized cultivation processes at the Chuxiong, Yunnan base.' },
      { step: '02', title: 'Extraction & Processing', desc: 'Professional extraction facility equipped with 20 extraction tanks, 26 chromatography columns, and 10 concentrators with automation control.' },
      { step: '03', title: 'Analytical Testing Capability', desc: 'In-house HPLC analytical system supporting quality management activities.' },
      { step: '04', title: 'Documentation Support', desc: 'Supporting documents including COA, SDS, test reports, and other shipment documents may be provided according to order requirements.' },
      { step: '05', title: 'Packaging & Shipment', desc: 'Standardized packaging (5 kg PE bags, 5 kg aluminum foil bags, export cartons) with documentation arranged per order terms.' },
    ],
    downloadableDocuments: [
      { title: 'GHS Safety Data Sheet (SDS)', desc: 'GHS SDS Report for CBD Isolate — hazard classification, handling, storage, and transport information.', format: 'PDF' },
      { title: 'CBD Isolate Test Report (COA)', desc: 'Laboratory analysis report for CBD isolate quality review. Batch-specific interpretation depends on actual batch, order terms, and verification results.', format: 'PDF' },
    ],
    qualityAnswers: [
      { question: 'What documents can Vetrux provide?', answer: 'Vetrux can provide COA, SDS, test reports, product information, commercial invoice, packing list, and shipment documents according to order requirements and actual batch availability.' },
      { question: 'How does Vetrux test CBD isolate quality?', answer: 'Vetrux uses in-house HPLC analytical capability to support CBD isolate quality-control review. Additional batch-specific documents depend on actual batch, order terms, and verification results.' },
      { question: 'What is tested in-house vs batch-specific?', answer: 'In-house HPLC supports analytical review during quality-control workflows. Batch-specific COA, SDS, test reports, and shipment documents depend on the actual batch, order terms, and verification results.' },
      { question: 'Who is responsible for import compliance?', answer: "Destination-country import compliance, including permits, licenses, approvals, labels, customs declarations, and regulatory review, is the buyer/importer's responsibility." },
    ],
  },
  de: {
    badge: 'Qualitätsmanagement',
    heroTitle1: 'CBD Isolat',
    heroTitleAccent: 'Qualitätssicherung',
    heroP1: 'VETRUX unterstützt die Qualitätsprüfung von CBD Isolat mit interner HPLC-Analysekapazität, COA/SDS-Unterstützung, Testberichten, Chargendokumenten und Versanddokumentation, die gemäß Auftragsbedingungen bereitgestellt wird.',
    heroP2: 'Unterstützende Dokumentation einschließlich COA, SDS, Testberichte und sonstige Versanddokumente kann gemäß Auftragsanforderungen bereitgestellt werden. Die tatsächliche Verfügbarkeit der Dokumentation hängt von der jeweiligen Charge, den Auftragsbedingungen und den Prüfergebnissen ab.',
    tags: ['HPLC-Kapazität', 'Dokumentationssupport', 'Standardisierter Prozess'],
    btnRequestDocs: 'Chargendokumente anfordern',
    btnViewProducts: 'Produkte ansehen',
    altText: 'Vetrux Anlagenausrüstung',
    docSectionLabel: 'Dokumentation',
    docTitle: 'CBD Isolat COA, SDS und Chargendokumente',
    docDesc: 'Vetrux kann unterstützende Dokumentation gemäß Auftragsanforderungen bereitstellen. Die Einhaltung der Einfuhrbestimmungen des Ziellandes liegt in der Verantwortung des Käufers/Importeurs.',
    docContact: 'Für Dokumentationsanfragen kontaktieren Sie',
    answersSectionLabel: 'Käufer-Antworten',
    answersTitle: 'Antworten zur CBD Isolat Qualitätssicherung',
    approachSectionLabel: 'Ansatz',
    approachTitle: 'HPLC-gestützter Qualitätsmanagement-Ansatz',
    btnContactUs: 'Kontaktieren Sie uns',
    approachFooter: 'Produktkennzeichnungen, Verwendungshinweise und Zollbeschreibungen sollten der tatsächlichen Charge, dem Verwendungszweck und den Anforderungen des Ziellandes entsprechen. Die Einhaltung der gesetzlichen Vorschriften des Ziellandes liegt in der Verantwortung des Käufers/Importeurs.',
    dlSectionLabel: 'Downloads',
    dlTitle: 'Herunterladbare Dokumente',
    dlDesc: 'Produktdokumentation zur Referenz. Chargenspezifische Dokumentation hängt von der tatsächlichen Charge, den Auftragsbedingungen und den Prüfergebnissen ab.',
    dlContact: 'Für zusätzliche Dokumentationsanfragen kontaktieren Sie',
    documentationItems: [
      { title: 'HPLC-Analysekapazität', detail: 'Internes HPLC-System zur Unterstützung analytischer Prüfungen.' },
      { title: 'Analysezertifikat (COA)', detail: 'Kann gemäß Auftragsanforderungen und tatsächlicher Chargenverfügbarkeit bereitgestellt werden.' },
      { title: 'Sicherheitsdatenblatt (SDS)', detail: 'Kann gemäß Auftragsanforderungen bereitgestellt werden.' },
      { title: 'Testberichte', detail: 'Können gemäß Auftragsanforderungen und tatsächlicher Chargenverfügbarkeit bereitgestellt werden.' },
      { title: 'Handelsrechnung & Packliste', detail: 'Wird pro Lieferung bereitgestellt.' },
      { title: 'Weitere unterstützende Dokumente', detail: 'Zusätzliche Dokumentation kann gemäß den tatsächlichen Auftragsbedingungen und Zielland-Anforderungen bereitgestellt werden.' },
    ],
    qaApproach: [
      { step: '01', title: 'Anbaumanagement', desc: 'Qualitätsorientierte Saatgutauswahl und standardisierte Anbauprozesse am Standort Chuxiong, Yunnan.' },
      { step: '02', title: 'Extraktion & Verarbeitung', desc: 'Professionelle Extraktionsanlage mit 20 Extraktionstanks, 26 Chromatographiesäulen und 10 Konzentratoren mit Automatisierungssteuerung.' },
      { step: '03', title: 'Analytische Prüfkapazität', desc: 'Internes HPLC-Analysesystem zur Unterstützung von Qualitätsmanagement-Aktivitäten.' },
      { step: '04', title: 'Dokumentationssupport', desc: 'Unterstützende Dokumente einschließlich COA, SDS, Testberichte und sonstige Versanddokumente können gemäß Auftragsanforderungen bereitgestellt werden.' },
      { step: '05', title: 'Verpackung & Versand', desc: 'Standardisierte Verpackung (5 kg PE-Beutel, 5 kg Aluminiumfolienbeutel, Exportkartons) mit Dokumentation gemäß Auftragsbedingungen.' },
    ],
    downloadableDocuments: [
      { title: 'GHS-Sicherheitsdatenblatt (SDS)', desc: 'GHS-SDS-Bericht für CBD Isolat — Gefahrenklassifizierung, Handhabung, Lagerung und Transportinformationen.', format: 'PDF' },
      { title: 'CBD Isolat Testbericht (COA)', desc: 'Laboranalysebericht zur CBD Isolat Qualitätsprüfung. Chargenspezifische Auslegung hängt von der tatsächlichen Charge, den Auftragsbedingungen und den Prüfergebnissen ab.', format: 'PDF' },
    ],
    qualityAnswers: [
      { question: 'Welche Dokumente kann Vetrux bereitstellen?', answer: 'Vetrux kann COA, SDS, Testberichte, Produktinformationen, Handelsrechnung, Packliste und Versanddokumente gemäß Auftragsanforderungen und tatsächlicher Chargenverfügbarkeit bereitstellen.' },
      { question: 'Wie testet Vetrux die CBD Isolat Qualität?', answer: 'Vetrux nutzt interne HPLC-Analysekapazität zur Unterstützung der CBD Isolat Qualitätskontrolle. Weitere chargenspezifische Dokumente hängen von der tatsächlichen Charge, den Auftragsbedingungen und den Prüfergebnissen ab.' },
      { question: 'Was wird intern vs. chargenspezifisch getestet?', answer: 'Die interne HPLC unterstützt die analytische Prüfung während der Qualitätskontroll-Workflows. Chargenspezifische COA, SDS, Testberichte und Versanddokumente hängen von der tatsächlichen Charge, den Auftragsbedingungen und den Prüfergebnissen ab.' },
      { question: 'Wer ist für die Einhaltung der Einfuhrbestimmungen verantwortlich?', answer: 'Die Einhaltung der Einfuhrbestimmungen des Ziellandes, einschließlich Genehmigungen, Lizenzen, Zulassungen, Kennzeichnungen, Zollanmeldungen und behördlicher Prüfung, liegt in der Verantwortung des Käufers/Importeurs.' },
    ],
  },
  fr: {
    badge: 'Gestion de la Qualité',
    heroTitle1: 'Isolat de CBD',
    heroTitleAccent: 'Assurance Qualité',
    heroP1: "VETRUX soutient l'examen de la qualité de l'isolat de CBD avec une capacité analytique HPLC interne, un support COA/SDS, des rapports de test, des documents de lot et une documentation d'expédition fournie selon les conditions de commande.",
    heroP2: "La documentation justificative, y compris les COA, SDS, rapports de test et autres documents d'expédition, peut être fournie selon les exigences de la commande. La disponibilité réelle des documents dépend du lot concerné, des conditions de commande et des résultats de vérification.",
    tags: ['Capacité HPLC', 'Support Documentaire', 'Processus Standardisé'],
    btnRequestDocs: 'Demander les documents de lot',
    btnViewProducts: 'Voir les produits',
    altText: "Équipement de l'installation Vetrux",
    docSectionLabel: 'Documentation',
    docTitle: 'COA, SDS et documents de lot pour isolat de CBD',
    docDesc: "Vetrux peut fournir une documentation justificative selon les exigences de la commande. La conformité à l'importation dans le pays de destination relève de la responsabilité de l'acheteur/importateur.",
    docContact: 'Pour les demandes de documentation, contactez',
    answersSectionLabel: 'Réponses aux Acheteurs',
    answersTitle: "Réponses sur l'assurance qualité de l'isolat de CBD",
    approachSectionLabel: 'Approche',
    approachTitle: 'Approche de gestion de la qualité basée sur HPLC',
    btnContactUs: 'Contactez-nous',
    approachFooter: "Les étiquettes des produits, les déclarations d'utilisation et les descriptions douanières doivent correspondre au lot réel, à l'objectif de la commande et aux exigences du pays de destination. La conformité réglementaire du pays de destination relève de la responsabilité de l'acheteur/importateur.",
    dlSectionLabel: 'Téléchargements',
    dlTitle: 'Documents téléchargeables',
    dlDesc: 'Documentation produit à titre de référence. La documentation spécifique au lot dépend du lot réel, des conditions de commande et des résultats de vérification.',
    dlContact: 'Pour des demandes de documentation supplémentaires, contactez',
    documentationItems: [
      { title: 'Capacité analytique HPLC', detail: 'Système HPLC interne pour le support des tests analytiques.' },
      { title: "Certificat d'Analyse (COA)", detail: 'Peut être fourni selon les exigences de la commande et la disponibilité réelle du lot.' },
      { title: 'Fiche de Données de Sécurité (SDS)', detail: 'Peut être fournie selon les exigences de la commande.' },
      { title: 'Rapports de test', detail: 'Peuvent être fournis selon les exigences de la commande et la disponibilité réelle du lot.' },
      { title: 'Facture commerciale & Liste de colisage', detail: 'Fournies par expédition.' },
      { title: 'Autres documents justificatifs', detail: 'Une documentation supplémentaire peut être fournie selon les conditions réelles de la commande et les exigences de destination.' },
    ],
    qaApproach: [
      { step: '01', title: 'Gestion de la culture', desc: 'Sélection de semences axée sur la qualité et processus de culture standardisés sur la base de Chuxiong, Yunnan.' },
      { step: '02', title: 'Extraction et traitement', desc: "Installation d'extraction professionnelle équipée de 20 réservoirs d'extraction, 26 colonnes de chromatographie et 10 concentrateurs avec contrôle d'automatisation." },
      { step: '03', title: 'Capacité de test analytique', desc: 'Système analytique HPLC interne soutenant les activités de gestion de la qualité.' },
      { step: '04', title: 'Support documentaire', desc: "Les documents justificatifs, y compris COA, SDS, rapports de test et autres documents d'expédition, peuvent être fournis selon les exigences de la commande." },
      { step: '05', title: 'Emballage et expédition', desc: "Emballage standardisé (sacs PE de 5 kg, sacs en aluminium de 5 kg, cartons d'exportation) avec documentation fournie selon les conditions de commande." },
    ],
    downloadableDocuments: [
      { title: 'Fiche de Données de Sécurité GHS (SDS)', desc: "Rapport SDS GHS pour l'isolat de CBD — classification des dangers, manipulation, stockage et informations de transport.", format: 'PDF' },
      { title: "Rapport de test d'isolat de CBD (COA)", desc: "Rapport d'analyse de laboratoire pour l'examen de la qualité de l'isolat de CBD. L'interprétation spécifique au lot dépend du lot réel, des conditions de commande et des résultats de vérification.", format: 'PDF' },
    ],
    qualityAnswers: [
      { question: 'Quels documents Vetrux peut-il fournir?', answer: "Vetrux peut fournir COA, SDS, rapports de test, informations produit, facture commerciale, liste de colisage et documents d'expédition selon les exigences de la commande et la disponibilité réelle du lot." },
      { question: "Comment Vetrux teste-t-il la qualité de l'isolat de CBD?", answer: "Vetrux utilise une capacité analytique HPLC interne pour soutenir l'examen du contrôle qualité de l'isolat de CBD. Les documents supplémentaires spécifiques au lot dépendent du lot réel, des conditions de commande et des résultats de vérification." },
      { question: "Qu'est-ce qui est testé en interne vs spécifique au lot?", answer: "La HPLC interne soutient l'examen analytique pendant les workflows de contrôle qualité. Les COA, SDS, rapports de test et documents d'expédition spécifiques au lot dépendent du lot réel, des conditions de commande et des résultats de vérification." },
      { question: "Qui est responsable de la conformité à l'importation?", answer: "La conformité à l'importation dans le pays de destination, y compris les permis, licences, approbations, étiquettes, déclarations en douane et examen réglementaire, relève de la responsabilité de l'acheteur/importateur." },
    ],
  },
  es: {
    badge: 'Gestión de Calidad',
    heroTitle1: 'Aislado de CBD',
    heroTitleAccent: 'Garantía de Calidad',
    heroP1: 'VETRUX respalda la revisión de calidad del aislado de CBD con capacidad analítica HPLC interna, soporte COA/SDS, informes de prueba, documentos de lote y documentación de envío proporcionada según los términos del pedido.',
    heroP2: 'La documentación de respaldo, incluidos COA, SDS, informes de prueba y otros documentos de envío, puede proporcionarse según los requisitos del pedido. La disponibilidad real de la documentación depende del lote específico, los términos del pedido y los resultados de verificación.',
    tags: ['Capacidad HPLC', 'Soporte Documental', 'Proceso Estandarizado'],
    btnRequestDocs: 'Solicitar Documentos de Lote',
    btnViewProducts: 'Ver Productos',
    altText: 'Equipo de instalaciones Vetrux',
    docSectionLabel: 'Documentación',
    docTitle: 'COA, SDS y documentos de lote de aislado de CBD',
    docDesc: 'Vetrux puede proporcionar documentación de respaldo según los requisitos del pedido. El cumplimiento de importación del país de destino es responsabilidad del comprador/importador.',
    docContact: 'Para consultas sobre documentación, contacte',
    answersSectionLabel: 'Respuestas para Compradores',
    answersTitle: 'Respuestas sobre garantía de calidad del aislado de CBD',
    approachSectionLabel: 'Enfoque',
    approachTitle: 'Enfoque de gestión de calidad respaldado por HPLC',
    btnContactUs: 'Contáctenos',
    approachFooter: 'Las etiquetas del producto, declaraciones de uso y descripciones aduaneras deben coincidir con el lote real, el propósito del pedido y los requisitos del país de destino. El cumplimiento normativo del país de destino es responsabilidad del comprador/importador.',
    dlSectionLabel: 'Descargas',
    dlTitle: 'Documentos Descargables',
    dlDesc: 'Documentación del producto como referencia. La documentación específica del lote depende del lote real, los términos del pedido y los resultados de verificación.',
    dlContact: 'Para solicitudes de documentación adicional, contacte',
    documentationItems: [
      { title: 'Capacidad Analítica HPLC', detail: 'Sistema HPLC interno para soporte de pruebas analíticas.' },
      { title: 'Certificado de Análisis (COA)', detail: 'Puede proporcionarse según los requisitos del pedido y la disponibilidad real del lote.' },
      { title: 'Hoja de Datos de Seguridad (SDS)', detail: 'Puede proporcionarse según los requisitos del pedido.' },
      { title: 'Informes de Prueba', detail: 'Pueden proporcionarse según los requisitos del pedido y la disponibilidad real del lote.' },
      { title: 'Factura Comercial y Lista de Empaque', detail: 'Se proporcionan por envío.' },
      { title: 'Otros Documentos de Respaldo', detail: 'Documentación adicional puede gestionarse según los términos reales del pedido y los requisitos del destino.' },
    ],
    qaApproach: [
      { step: '01', title: 'Gestión del Cultivo', desc: 'Selección de semillas orientada a la calidad y procesos de cultivo estandarizados en la base de Chuxiong, Yunnan.' },
      { step: '02', title: 'Extracción y Procesamiento', desc: 'Instalación de extracción profesional equipada con 20 tanques de extracción, 26 columnas de cromatografía y 10 concentradores con control de automatización.' },
      { step: '03', title: 'Capacidad de Pruebas Analíticas', desc: 'Sistema analítico HPLC interno que respalda las actividades de gestión de calidad.' },
      { step: '04', title: 'Soporte Documental', desc: 'Documentos de respaldo, incluidos COA, SDS, informes de prueba y otros documentos de envío, pueden proporcionarse según los requisitos del pedido.' },
      { step: '05', title: 'Embalaje y Envío', desc: 'Embalaje estandarizado (bolsas PE de 5 kg, bolsas de aluminio de 5 kg, cajas de exportación) con documentación gestionada según los términos del pedido.' },
    ],
    downloadableDocuments: [
      { title: 'Hoja de Datos de Seguridad GHS (SDS)', desc: 'Informe SDS GHS para aislado de CBD: clasificación de peligros, manipulación, almacenamiento e información de transporte.', format: 'PDF' },
      { title: 'Informe de Prueba de Aislado de CBD (COA)', desc: 'Informe de análisis de laboratorio para la revisión de calidad del aislado de CBD. La interpretación específica del lote depende del lote real, los términos del pedido y los resultados de verificación.', format: 'PDF' },
    ],
    qualityAnswers: [
      { question: '¿Qué documentos puede proporcionar Vetrux?', answer: 'Vetrux puede proporcionar COA, SDS, informes de prueba, información del producto, factura comercial, lista de empaque y documentos de envío según los requisitos del pedido y la disponibilidad real del lote.' },
      { question: '¿Cómo prueba Vetrux la calidad del aislado de CBD?', answer: 'Vetrux utiliza capacidad analítica HPLC interna para respaldar la revisión del control de calidad del aislado de CBD. Los documentos adicionales específicos del lote dependen del lote real, los términos del pedido y los resultados de verificación.' },
      { question: '¿Qué se prueba internamente vs. específico del lote?', answer: 'La HPLC interna respalda la revisión analítica durante los flujos de trabajo de control de calidad. Los COA, SDS, informes de prueba y documentos de envío específicos del lote dependen del lote real, los términos del pedido y los resultados de verificación.' },
      { question: '¿Quién es responsable del cumplimiento de importación?', answer: 'El cumplimiento de importación del país de destino, incluidos permisos, licencias, aprobaciones, etiquetas, declaraciones aduaneras y revisión regulatoria, es responsabilidad del comprador/importador.' },
    ],
  },
  it: {
    badge: 'Gestione della Qualità',
    heroTitle1: 'Isolato di CBD',
    heroTitleAccent: 'Garanzia di Qualità',
    heroP1: "VETRUX supporta la revisione della qualità dell'isolato di CBD con capacità analitica HPLC interna, supporto COA/SDS, rapporti di prova, documenti di lotto e documentazione di spedizione fornita secondo i termini d'ordine.",
    heroP2: "La documentazione di supporto, inclusi COA, SDS, rapporti di prova e altri documenti di spedizione, può essere fornita in base ai requisiti d'ordine. L'effettiva disponibilità della documentazione dipende dal lotto specifico, dai termini d'ordine e dai risultati delle verifiche.",
    tags: ['Capacità HPLC', 'Supporto Documentale', 'Processo Standardizzato'],
    btnRequestDocs: 'Richiedi Documenti di Lotto',
    btnViewProducts: 'Visualizza Prodotti',
    altText: 'Attrezzatura dello stabilimento Vetrux',
    docSectionLabel: 'Documentazione',
    docTitle: "COA, SDS e documenti di lotto per l'isolato di CBD",
    docDesc: "Vetrux può fornire documentazione di supporto in base ai requisiti d'ordine. La conformità all'importazione nel paese di destinazione è responsabilità dell'acquirente/importatore.",
    docContact: 'Per richieste sulla documentazione, contattare',
    answersSectionLabel: 'Risposte per Acquirenti',
    answersTitle: "Risposte sulla garanzia di qualità dell'isolato di CBD",
    approachSectionLabel: 'Approccio',
    approachTitle: 'Approccio di gestione della qualità basato su HPLC',
    btnContactUs: 'Contattaci',
    approachFooter: "Le etichette dei prodotti, le dichiarazioni d'uso e le descrizioni doganali devono corrispondere al lotto effettivo, allo scopo dell'ordine e ai requisiti del paese di destinazione. La conformità normativa del paese di destinazione è responsabilità dell'acquirente/importatore.",
    dlSectionLabel: 'Download',
    dlTitle: 'Documenti Scaricabili',
    dlDesc: "Documentazione del prodotto a scopo di riferimento. La documentazione specifica del lotto dipende dal lotto effettivo, dai termini d'ordine e dai risultati delle verifiche.",
    dlContact: 'Per ulteriori richieste di documentazione, contattare',
    documentationItems: [
      { title: 'Capacità Analitica HPLC', detail: 'Sistema HPLC interno per il supporto ai test analitici.' },
      { title: 'Certificato di Analisi (COA)', detail: "Può essere fornito in base ai requisiti d'ordine e all'effettiva disponibilità del lotto." },
      { title: 'Scheda di Dati di Sicurezza (SDS)', detail: "Può essere fornita in base ai requisiti d'ordine." },
      { title: 'Rapporti di Prova', detail: "Possono essere forniti in base ai requisiti d'ordine e all'effettiva disponibilità del lotto." },
      { title: 'Fattura Commerciale e Lista di Imballaggio', detail: 'Fornite per ogni spedizione.' },
      { title: 'Altri Documenti di Supporto', detail: "Documentazione aggiuntiva può essere fornita in base ai termini effettivi dell'ordine e ai requisiti di destinazione." },
    ],
    qaApproach: [
      { step: '01', title: 'Gestione della Coltivazione', desc: 'Selezione di sementi orientata alla qualità e processi di coltivazione standardizzati presso la base di Chuxiong, Yunnan.' },
      { step: '02', title: 'Estrazione e Lavorazione', desc: 'Impianto di estrazione professionale dotato di 20 serbatoi di estrazione, 26 colonne cromatografiche e 10 concentratori con controllo automatizzato.' },
      { step: '03', title: 'Capacità di Test Analitici', desc: 'Sistema analitico HPLC interno a supporto delle attività di gestione della qualità.' },
      { step: '04', title: 'Supporto Documentale', desc: "Documenti di supporto, inclusi COA, SDS, rapporti di prova e altri documenti di spedizione, possono essere forniti in base ai requisiti d'ordine." },
      { step: '05', title: 'Imballaggio e Spedizione', desc: "Imballaggio standardizzato (sacchi PE da 5 kg, sacchi in alluminio da 5 kg, cartoni per esportazione) con documentazione fornita secondo i termini d'ordine." },
    ],
    downloadableDocuments: [
      { title: 'Scheda di Dati di Sicurezza GHS (SDS)', desc: "Rapporto SDS GHS per l'isolato di CBD — classificazione dei pericoli, manipolazione, stoccaggio e informazioni sul trasporto.", format: 'PDF' },
      { title: "Rapporto di Prova Isolato di CBD (COA)", desc: "Rapporto di analisi di laboratorio per la revisione della qualità dell'isolato di CBD. L'interpretazione specifica del lotto dipende dal lotto effettivo, dai termini d'ordine e dai risultati delle verifiche.", format: 'PDF' },
    ],
    qualityAnswers: [
      { question: 'Quali documenti può fornire Vetrux?', answer: "Vetrux può fornire COA, SDS, rapporti di prova, informazioni sul prodotto, fattura commerciale, lista di imballaggio e documenti di spedizione in base ai requisiti d'ordine e all'effettiva disponibilità del lotto." },
      { question: "Come testa Vetrux la qualità dell'isolato di CBD?", answer: "Vetrux utilizza la capacità analitica HPLC interna per supportare la revisione del controllo qualità dell'isolato di CBD. Ulteriori documenti specifici del lotto dipendono dal lotto effettivo, dai termini d'ordine e dai risultati delle verifiche." },
      { question: 'Cosa viene testato internamente rispetto a specifico del lotto?', answer: "L'HPLC interna supporta la revisione analitica durante i flussi di lavoro del controllo qualità. COA, SDS, rapporti di prova e documenti di spedizione specifici del lotto dipendono dal lotto effettivo, dai termini d'ordine e dai risultati delle verifiche." },
      { question: "Chi è responsabile della conformità all'importazione?", answer: "La conformità all'importazione nel paese di destinazione, inclusi permessi, licenze, approvazioni, etichette, dichiarazioni doganali e revisione normativa, è responsabilità dell'acquirente/importatore." },
    ],
  },
  pt: {
    badge: 'Gestão da Qualidade',
    heroTitle1: 'Isolado de CBD',
    heroTitleAccent: 'Garantia de Qualidade',
    heroP1: 'A VETRUX apoia a revisão da qualidade do isolado de CBD com capacidade analítica HPLC interna, suporte COA/SDS, relatórios de teste, documentos de lote e documentação de envio fornecida conforme os termos do pedido.',
    heroP2: 'A documentação de suporte, incluindo COA, SDS, relatórios de teste e outros documentos de envio, pode ser fornecida de acordo com os requisitos do pedido. A disponibilidade real da documentação depende do lote específico, dos termos do pedido e dos resultados da verificação.',
    tags: ['Capacidade HPLC', 'Suporte Documental', 'Processo Padronizado'],
    btnRequestDocs: 'Solicitar Documentos de Lote',
    btnViewProducts: 'Ver Produtos',
    altText: 'Equipamento da instalação Vetrux',
    docSectionLabel: 'Documentação',
    docTitle: 'COA, SDS e documentos de lote de isolado de CBD',
    docDesc: 'A Vetrux pode fornecer documentação de suporte de acordo com os requisitos do pedido. A conformidade de importação do país de destino é de responsabilidade do comprador/importador.',
    docContact: 'Para consultas sobre documentação, entre em contato',
    answersSectionLabel: 'Respostas para Compradores',
    answersTitle: 'Respostas sobre garantia de qualidade do isolado de CBD',
    approachSectionLabel: 'Abordagem',
    approachTitle: 'Abordagem de gestão da qualidade baseada em HPLC',
    btnContactUs: 'Entre em Contato',
    approachFooter: 'Os rótulos dos produtos, declarações de uso e descrições aduaneiras devem corresponder ao lote real, à finalidade do pedido e aos requisitos do país de destino. A conformidade regulatória do país de destino é de responsabilidade do comprador/importador.',
    dlSectionLabel: 'Downloads',
    dlTitle: 'Documentos para Download',
    dlDesc: 'Documentação do produto para referência. A documentação específica do lote depende do lote real, dos termos do pedido e dos resultados da verificação.',
    dlContact: 'Para solicitações adicionais de documentação, entre em contato',
    documentationItems: [
      { title: 'Capacidade Analítica HPLC', detail: 'Sistema HPLC interno para suporte a testes analíticos.' },
      { title: 'Certificado de Análise (COA)', detail: 'Pode ser fornecido de acordo com os requisitos do pedido e a disponibilidade real do lote.' },
      { title: 'Ficha de Dados de Segurança (SDS)', detail: 'Pode ser fornecida de acordo com os requisitos do pedido.' },
      { title: 'Relatórios de Teste', detail: 'Podem ser fornecidos de acordo com os requisitos do pedido e a disponibilidade real do lote.' },
      { title: 'Fatura Comercial e Lista de Embalagem', detail: 'Fornecidas por envio.' },
      { title: 'Outros Documentos de Suporte', detail: 'Documentação adicional pode ser providenciada de acordo com os termos reais do pedido e os requisitos de destino.' },
    ],
    qaApproach: [
      { step: '01', title: 'Gestão do Cultivo', desc: 'Seleção de sementes orientada para a qualidade e processos de cultivo padronizados na base de Chuxiong, Yunnan.' },
      { step: '02', title: 'Extração e Processamento', desc: 'Instalação de extração profissional equipada com 20 tanques de extração, 26 colunas de cromatografia e 10 concentradores com controle de automação.' },
      { step: '03', title: 'Capacidade de Teste Analítico', desc: 'Sistema analítico HPLC interno que apoia as atividades de gestão da qualidade.' },
      { step: '04', title: 'Suporte Documental', desc: 'Documentos de suporte, incluindo COA, SDS, relatórios de teste e outros documentos de envio, podem ser fornecidos de acordo com os requisitos do pedido.' },
      { step: '05', title: 'Embalagem e Envio', desc: 'Embalagem padronizada (sacos PE de 5 kg, sacos de alumínio de 5 kg, caixas de exportação) com documentação providenciada conforme os termos do pedido.' },
    ],
    downloadableDocuments: [
      { title: 'Ficha de Dados de Segurança GHS (SDS)', desc: 'Relatório SDS GHS para Isolado de CBD — classificação de perigo, manuseio, armazenamento e informações de transporte.', format: 'PDF' },
      { title: 'Relatório de Teste de Isolado de CBD (COA)', desc: 'Relatório de análise laboratorial para revisão da qualidade do isolado de CBD. A interpretação específica do lote depende do lote real, dos termos do pedido e dos resultados da verificação.', format: 'PDF' },
    ],
    qualityAnswers: [
      { question: 'Quais documentos a Vetrux pode fornecer?', answer: 'A Vetrux pode fornecer COA, SDS, relatórios de teste, informações do produto, fatura comercial, lista de embalagem e documentos de envio de acordo com os requisitos do pedido e a disponibilidade real do lote.' },
      { question: 'Como a Vetrux testa a qualidade do isolado de CBD?', answer: 'A Vetrux utiliza capacidade analítica HPLC interna para apoiar a revisão do controle de qualidade do isolado de CBD. Documentos adicionais específicos do lote dependem do lote real, dos termos do pedido e dos resultados da verificação.' },
      { question: 'O que é testado internamente vs. específico do lote?', answer: 'A HPLC interna apoia a revisão analítica durante os fluxos de trabalho de controle de qualidade. COA, SDS, relatórios de teste e documentos de envio específicos do lote dependem do lote real, dos termos do pedido e dos resultados da verificação.' },
      { question: 'Quem é responsável pela conformidade de importação?', answer: 'A conformidade de importação do país de destino, incluindo autorizações, licenças, aprovações, rótulos, declarações aduaneiras e revisão regulatória, é de responsabilidade do comprador/importador.' },
    ],
  },
  ja: {
    badge: '品質管理',
    heroTitle1: 'CBDアイソレート',
    heroTitleAccent: '品質保証',
    heroP1: 'VETRUXは、自社HPLC分析能力、COA/SDSサポート、試験報告書、バッチ文書、および注文条件に応じた出荷書類により、CBDアイソレートの品質レビューをサポートいたします。',
    heroP2: 'COA、SDS、試験報告書、その他出荷書類を含むサポート文書は、注文要件に応じて提供される場合があります。実際の文書の入手可否は、実際のバッチ、注文条件、および検証結果によります。',
    tags: ['HPLC分析能力', '文書サポート', '標準化プロセス'],
    btnRequestDocs: 'バッチ文書をリクエスト',
    btnViewProducts: '製品を見る',
    altText: 'Vetrux施設設備',
    docSectionLabel: '文書',
    docTitle: 'CBDアイソレート COA、SDSおよびバッチ文書',
    docDesc: 'Vetruxは注文要件に応じてサポート文書を提供できます。仕向国での輸入コンプライアンスは、購入者/輸入者の責任です。',
    docContact: '文書に関するお問い合わせはこちらまで：',
    answersSectionLabel: '購入者向け回答',
    answersTitle: 'CBDアイソレート品質保証に関する回答',
    approachSectionLabel: 'アプローチ',
    approachTitle: 'HPLCに支えられた品質管理アプローチ',
    btnContactUs: 'お問い合わせ',
    approachFooter: '製品ラベル、使用に関する記載、および税関記載事項は、実際のバッチ、注文目的、および仕向国要件に一致する必要があります。仕向国での規制遵守は、購入者/輸入者の責任です。',
    dlSectionLabel: 'ダウンロード',
    dlTitle: 'ダウンロード可能な文書',
    dlDesc: '参考用の製品文書です。バッチ固有の文書は、実際のバッチ、注文条件、および検証結果によります。',
    dlContact: '追加の文書リクエストについては、こちらまでご連絡ください：',
    documentationItems: [
      { title: 'HPLC分析能力', detail: '分析試験サポートのための自社HPLCシステム。' },
      { title: '分析証明書（COA）', detail: '注文要件および実際のバッチの入手可否に応じて提供される場合があります。' },
      { title: '安全データシート（SDS）', detail: '注文要件に応じて提供される場合があります。' },
      { title: '試験報告書', detail: '注文要件および実際のバッチの入手可否に応じて提供される場合があります。' },
      { title: '商業送り状およびパッキングリスト', detail: '出荷ごとに提供されます。' },
      { title: 'その他のサポート文書', detail: '実際の注文条件および仕向地要件に応じて追加文書が提供される場合があります。' },
    ],
    qaApproach: [
      { step: '01', title: '栽培管理', desc: 'Yunnan省Chuxiong拠点における品質重視の種子選定と標準化された栽培プロセス。' },
      { step: '02', title: '抽出・加工', desc: '20基の抽出タンク、26本のクロマトグラフィーカラム、10基の濃縮装置を備えた自動化制御の専門抽出施設。' },
      { step: '03', title: '分析試験能力', desc: '品質管理活動をサポートする自社HPLC分析システム。' },
      { step: '04', title: '文書サポート', desc: 'COA、SDS、試験報告書、その他出荷書類を含むサポート文書は、注文要件に応じて提供される場合があります。' },
      { step: '05', title: '包装・出荷', desc: '標準化包装（5 kg PE袋、5 kgアルミ箔袋、輸出用カートン）と注文条件に応じた文書手配。' },
    ],
    downloadableDocuments: [
      { title: 'GHS安全データシート（SDS）', desc: 'CBDアイソレートのGHS SDSレポート — 危険有害性分類、取扱い、保管および輸送情報。', format: 'PDF' },
      { title: 'CBDアイソレート試験報告書（COA）', desc: 'CBDアイソレート品質レビューのためのラボ分析レポート。バッチ固有の解釈は、実際のバッチ、注文条件、および検証結果によります。', format: 'PDF' },
    ],
    qualityAnswers: [
      { question: 'Vetruxはどのような文書を提供できますか？', answer: 'Vetruxは、COA、SDS、試験報告書、製品情報、商業送り状、パッキングリスト、および出荷書類を、注文要件と実際のバッチの入手可否に応じて提供できます。' },
      { question: 'VetruxはCBDアイソレートの品質をどのように試験していますか？', answer: 'Vetruxは自社HPLC分析能力を使用してCBDアイソレートの品質管理レビューをサポートしています。追加のバッチ固有文書は、実際のバッチ、注文条件、および検証結果によります。' },
      { question: '社内試験とバッチ固有試験の違いは何ですか？', answer: '自社HPLCは品質管理ワークフロー中の分析レビューをサポートします。バッチ固有のCOA、SDS、試験報告書、および出荷書類は、実際のバッチ、注文条件、および検証結果によります。' },
      { question: '輸入コンプライアンスの責任者は誰ですか？', answer: '許可、ライセンス、承認、ラベル、税関申告、および規制レビューを含む仕向国での輸入コンプライアンスは、購入者/輸入者の責任です。' },
    ],
  },
  fi: {
    badge: 'Laadunhallinta',
    heroTitle1: 'CBD-isolaatti',
    heroTitleAccent: 'Laadunvarmistus',
    heroP1: 'VETRUX tukee CBD-isolaatin laadunarviointia sisäisellä HPLC-analyysikyvykkyydellä, COA/SDS-tuella, testiraporteilla, erädokumenteilla ja lähetysdokumentaatiolla, joka toimitetaan tilausten ehtojen mukaisesti.',
    heroP2: 'Tukidokumentaatio, mukaan lukien COA, SDS, testiraportit ja muut lähetysasiakirjat, voidaan toimittaa tilausvaatimusten mukaisesti. Dokumentaation todellinen saatavuus riippuu kyseisestä erästä, tilausehdoista ja varmennustuloksista.',
    tags: ['HPLC-kyvykkyys', 'Dokumentaatiotuki', 'Standardoitu prosessi'],
    btnRequestDocs: 'Pyydä erädokumentteja',
    btnViewProducts: 'Katso tuotteet',
    altText: 'Vetruxin laitoslaitteisto',
    docSectionLabel: 'Dokumentaatio',
    docTitle: 'CBD-isolaatin COA, SDS ja eräasiakirjat',
    docDesc: 'Vetrux voi toimittaa tukidokumentaatiota tilausvaatimusten mukaisesti. Kohdemaan tuontivaatimusten noudattaminen on ostajan/tuojan vastuulla.',
    docContact: 'Dokumentaatiota koskevat tiedustelut:',
    answersSectionLabel: 'Ostajan vastauksia',
    answersTitle: 'CBD-isolaatin laadunvarmistuksen vastauksia',
    approachSectionLabel: 'Lähestymistapa',
    approachTitle: 'HPLC-pohjainen laadunhallinnan lähestymistapa',
    btnContactUs: 'Ota yhteyttä',
    approachFooter: 'Tuotemerkintöjen, käyttöilmoitusten ja tullikuvausten on vastattava todellista erää, tilauksen käyttötarkoitusta ja kohdemaan vaatimuksia. Kohdemaan sääntelyvaatimusten noudattaminen on ostajan/tuojan vastuulla.',
    dlSectionLabel: 'Lataukset',
    dlTitle: 'Ladattavat asiakirjat',
    dlDesc: 'Tuotedokumentaatio viitteeksi. Eräkohtainen dokumentaatio riippuu todellisesta erästä, tilausehdoista ja varmennustuloksista.',
    dlContact: 'Lisädokumentaatiopyynnöt:',
    documentationItems: [
      { title: 'HPLC-analyysikyvykkyys', detail: 'Sisäinen HPLC-järjestelmä analyyttisen testauksen tueksi.' },
      { title: 'Analyysitodistus (COA)', detail: 'Voidaan toimittaa tilausvaatimusten ja todellisen erän saatavuuden mukaan.' },
      { title: 'Käyttöturvallisuustiedote (SDS)', detail: 'Voidaan toimittaa tilausvaatimusten mukaan.' },
      { title: 'Testiraportit', detail: 'Voidaan toimittaa tilausvaatimusten ja todellisen erän saatavuuden mukaan.' },
      { title: 'Kauppalasku ja pakkausluettelo', detail: 'Toimitetaan lähetyskohtaisesti.' },
      { title: 'Muut tukiasiakirjat', detail: 'Lisädokumentaatio voidaan järjestää tilauksen todellisten ehtojen ja kohdevaatimusten mukaan.' },
    ],
    qaApproach: [
      { step: '01', title: 'Viljelyn hallinta', desc: 'Laatupainotteinen siementen valinta ja standardoidut viljelyprosessit Chuxiongin, Yunnanin toimipisteessä.' },
      { step: '02', title: 'Uutto ja käsittely', desc: 'Ammattimainen uuttolaitos, jossa on 20 uuttosäiliötä, 26 kromatografiakolonnia ja 10 konsentrointilaitetta automaatio-ohjauksella.' },
      { step: '03', title: 'Analyyttinen testauskyvykkyys', desc: 'Sisäinen HPLC-analyysijärjestelmä, joka tukee laadunhallintatoimia.' },
      { step: '04', title: 'Dokumentaatiotuki', desc: 'Tukiasiakirjat, mukaan lukien COA, SDS, testiraportit ja muut lähetysasiakirjat, voidaan toimittaa tilausvaatimusten mukaisesti.' },
      { step: '05', title: 'Pakkaaminen ja lähetys', desc: 'Standardoitu pakkaus (5 kg PE-pussit, 5 kg alumiinifoliopussit, vientipahvilaatikot) ja dokumentaatio tilausehtojen mukaan.' },
    ],
    downloadableDocuments: [
      { title: 'GHS-käyttöturvallisuustiedote (SDS)', desc: 'GHS SDS -raportti CBD-isolaatille — vaaraluokitus, käsittely, varastointi ja kuljetustiedot.', format: 'PDF' },
      { title: 'CBD-isolaatin testiraportti (COA)', desc: 'Laboratorioanalyysiraportti CBD-isolaatin laadunarviointiin. Eräkohtainen tulkinta riippuu todellisesta erästä, tilausehdoista ja varmennustuloksista.', format: 'PDF' },
    ],
    qualityAnswers: [
      { question: 'Mitä asiakirjoja Vetrux voi toimittaa?', answer: 'Vetrux voi toimittaa COA:n, SDS:n, testiraportteja, tuotetietoja, kauppalaskun, pakkausluettelon ja lähetysasiakirjoja tilausvaatimusten ja todellisen erän saatavuuden mukaan.' },
      { question: 'Miten Vetrux testaa CBD-isolaatin laatua?', answer: 'Vetrux käyttää sisäistä HPLC-analyysikyvykkyyttä CBD-isolaatin laadunvalvonnan tarkastelun tukemiseen. Eräkohtaiset lisäasiakirjat riippuvat todellisesta erästä, tilausehdoista ja varmennustuloksista.' },
      { question: 'Mitä testataan sisäisesti vs. eräkohtaisesti?', answer: 'Sisäinen HPLC tukee analyyttistä tarkastelua laadunvalvontaprosessien aikana. Eräkohtaiset COA, SDS, testiraportit ja lähetysasiakirjat riippuvat todellisesta erästä, tilausehdoista ja varmennustuloksista.' },
      { question: 'Kuka on vastuussa tuontivaatimusten noudattamisesta?', answer: 'Kohdemaan tuontivaatimusten noudattaminen, mukaan lukien luvat, lisenssit, hyväksynnät, merkinnät, tulli-ilmoitukset ja sääntelytarkastus, on ostajan/tuojan vastuulla.' },
    ],
  },
} as const;

type ContentLocale = typeof content.en;

function t(locale?: Locale): ContentLocale {
  const loc = locale ?? 'en';
  return (content as unknown as Record<string, ContentLocale>)[loc] ?? content.en;
}

export default function QualityAssuranceClient({ locale }: QualityAssuranceClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const [documentModalType, setDocumentModalType] = useState<DocumentRequestDocumentType>('both');
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  useReveal(heroRef, { y: 40, stagger: 0.1, start: 'top 80%' });
  useReveal(docsRef, { y: 40, stagger: 0.08, start: 'top 80%' });
  useReveal(processRef, { y: 40, stagger: 0.1, start: 'top 80%' });
  useReveal(certsRef, { y: 40, stagger: 0.08, start: 'top 80%' });

  const openDocumentModal = (documentType: DocumentRequestDocumentType) => {
    setDocumentModalType(documentType);
    setIsDocumentModalOpen(true);
  };

  const strings = t(locale);
  const langPrefix = locale && locale !== 'en' ? `/${locale}` : '';

  return (
    <div className="bg-surface">
      <section className="py-24 bg-surface-container-low">
        <div ref={heroRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-card">
              <Badge variant="default" className="mb-6">{strings.badge}</Badge>
              <h1 className="text-5xl md:text-6xl font-serif font-medium text-on-background tracking-tight leading-[1.0] mb-6">
                {strings.heroTitle1}
                <br />
                <span className="italic text-primary">{strings.heroTitleAccent}</span>
              </h1>
              <p className="text-[15px] text-on-surface-variant leading-relaxed mb-6 max-w-md">{strings.heroP1}</p>
              <p className="text-xs text-on-surface-variant/80 leading-relaxed mb-8 max-w-md">{strings.heroP2}</p>
              <div className="flex flex-wrap gap-3 mb-10">
                {strings.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1.5 bg-surface-container text-on-surface-variant text-xs font-semibold tracking-wider uppercase">{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="accent" size="lg" icon={ArrowRight} onClick={() => openDocumentModal('both')}>{strings.btnRequestDocs}</Button>
                <Link href={`${langPrefix}/products/cbd-isolate`}><Button variant="outline" size="lg">{strings.btnViewProducts}</Button></Link>
              </div>
            </div>
            <div className="reveal-card">
              <div className="relative w-full h-[500px]">
                <Image src="/images/equipment/chromatography-column-700L.webp" alt={strings.altText} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div ref={docsRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-12">
            <SectionLabel>{strings.docSectionLabel}</SectionLabel>
            <h2 className="text-3xl font-serif font-medium text-on-background tracking-tight leading-[1.05] mb-4">{strings.docTitle}</h2>
            <p className="text-[15px] text-on-surface-variant max-w-xl">{strings.docDesc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {strings.documentationItems.map((item: { title: string; detail: string }) => (
              <div key={item.title} tabIndex={0} className="reveal-card bg-surface-container-lowest p-6 border-l-2 border-transparent hover:border-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                <Shield size={20} className="text-primary mb-4" />
                <p className="text-sm font-extrabold text-on-surface tracking-tighter mb-2">{item.title}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="reveal-card mt-8">
            <p className="text-xs text-on-surface-variant">{strings.docContact} <a href="mailto:inquiry@vetrux.tech" className="text-accent underline">inquiry@vetrux.tech</a>.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-12">
            <SectionLabel>{strings.answersSectionLabel}</SectionLabel>
            <h2 className="text-3xl font-serif font-medium text-on-background tracking-tight leading-[1.05]">{strings.answersTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strings.qualityAnswers.map((item: { question: string; answer: string }) => (
              <div key={item.question} className="bg-surface-container-lowest p-6 border-l-2 border-accent">
                <h3 className="text-sm font-extrabold text-on-surface tracking-tighter mb-2">{item.question}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div ref={processRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-12">
            <SectionLabel>{strings.approachSectionLabel}</SectionLabel>
            <h2 className="text-3xl font-serif font-medium text-on-background tracking-tight leading-[1.05] mb-4">{strings.approachTitle}</h2>
          </div>
          <div className="space-y-4">
            {strings.qaApproach.map((item: { step: string; title: string; desc: string }) => (
              <div key={item.step} tabIndex={0} className="reveal-card flex gap-6 bg-surface-container-lowest p-6 border-l-2 border-transparent hover:border-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary text-white text-sm font-extrabold">{item.step}</div>
                <div>
                  <p className="text-sm font-extrabold text-on-surface tracking-tighter mb-1">{item.title}</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal-card mt-12 text-center">
            <Link href={`${langPrefix}/inquiry`}><Button variant="accent" size="lg" icon={ArrowRight}>{strings.btnContactUs}</Button></Link>
            <p className="text-xs text-on-surface-variant mt-4">{strings.approachFooter}</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low">
        <div ref={certsRef} className="max-w-container mx-auto px-6 lg:px-12">
          <div className="reveal-card mb-6">
            <SectionLabel>{strings.dlSectionLabel}</SectionLabel>
            <h2 className="text-3xl font-serif font-medium text-on-background tracking-tight leading-[1.05] mb-4">{strings.dlTitle}</h2>
            <p className="text-[15px] text-on-surface-variant max-w-xl">{strings.dlDesc}</p>
          </div>
          <div className="space-y-3">
            {strings.downloadableDocuments.map((doc: { title: string; desc: string; format: string }) => (
              <button key={doc.title} type="button" onClick={() => openDocumentModal(doc.title.includes('SDS') ? 'SDS' : 'COA')} className="reveal-card w-full text-left flex items-center justify-between gap-6 bg-surface-container-lowest p-6 group hover:bg-surface-container border-l-2 border-transparent hover:border-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-extrabold text-on-surface tracking-tighter mb-1">{doc.title}</p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{doc.desc}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant">{doc.format}</span>
                  <div className="w-10 h-10 flex items-center justify-center bg-accent text-white rounded-md group-hover:bg-accent-hover transition-colors duration-200"><Download size={16} /></div>
                </div>
              </button>
            ))}
          </div>
          <div className="reveal-card mt-8">
            <p className="text-xs text-on-surface-variant">{strings.dlContact} <a href="mailto:inquiry@vetrux.tech" className="text-accent underline">inquiry@vetrux.tech</a>.</p>
          </div>
        </div>
      </section>

      {isDocumentModalOpen && (
        <DocumentRequestModal
          isOpen
          onClose={() => setIsDocumentModalOpen(false)}
          defaultDocumentType={documentModalType}
          sourcePage="/quality-assurance"
          productInterest="CBD Isolate"
          locale={locale}
        />
      )}
    </div>
  );
}
