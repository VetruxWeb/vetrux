import type { DocumentRequestPayload } from './documentRequest';

export interface DocumentRequestApiResponse {
  ok: boolean;
  message: string;
  referenceId?: string;
  error?: {
    code: string;
    message: string;
  };
}

export async function submitDocumentRequest(
  payload: DocumentRequestPayload,
): Promise<DocumentRequestApiResponse> {
  const response = await fetch('/api/document-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  let data: DocumentRequestApiResponse = {
    ok: false,
    message: 'Empty response from document request API.',
  };

  if (raw) {
    try {
      data = JSON.parse(raw) as DocumentRequestApiResponse;
    } catch {
      data = {
        ok: false,
        message: 'Unable to request documents right now. Please try again later.',
      };
    }
  }

  if (!response.ok) {
    throw new Error(data.error?.message ?? data.message ?? 'Unable to request documents.');
  }

  return data;
}
