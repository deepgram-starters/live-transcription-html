import { addTranscriptItem } from './transcript.js';

export function getErrorMessage(data) {
  if (typeof data.error?.message === 'string') {
    return data.error.message;
  }

  if (typeof data.description === 'string') {
    return data.description;
  }

  return 'Deepgram connection failed';
}

export function renderTranscript(data, { transcriptContainer, emptyState }) {
  const transcript = data.channel?.alternatives?.[0]?.transcript || data.transcript || '';
  const isFinal = data.is_final || data.speech_final || false;

  if (!transcript) return false;

  addTranscriptItem(transcriptContainer, emptyState, transcript, isFinal);
  return isFinal;
}
