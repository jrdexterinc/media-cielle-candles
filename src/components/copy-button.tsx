'use client';
import { useState } from 'react';
export function CopyButton({ text }: { text: string }) {
  const [status, setStatus] = useState('');
  async function copy() {
    try { await navigator.clipboard.writeText(text); setStatus('Copied to clipboard'); }
    catch { setStatus('Select the text above to copy it.'); }
  }
  return <div className="copy-control"><button type="button" onClick={copy} className="text-link">Copy description <span aria-hidden="true">↗</span></button><span role="status" className="copy-status">{status}</span></div>;
}
