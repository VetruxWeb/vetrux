import type { InquiryPayload } from './inquiry';

export interface InquiryApiResponse {
  ok: boolean;
  message: string;
  referenceId?: string;
  error?: {
    code: string;
    message: string;
  };
}

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryApiResponse> {
  const response = await fetch('/api/inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as InquiryApiResponse;
  if (!response.ok) {
    throw new Error(data.error?.message ?? data.message ?? 'Unable to submit inquiry.');
  }

  return data;
}
