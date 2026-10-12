'use client';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
export default function Sheet({ open, onClose, title, icon, children, footer }: { open: boolean; onClose: () => void; title: string; icon?: React.ReactNode; children: React.ReactNode; footer?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null); const back = useRef<Element | null>(null);
  useEffect(() => {
    if (!open) return; back.current = document.activeElement; document.body.style.overflow = 'hidden';
    const el = ref.current!; const q = () => Array.from(el.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'));
    setTimeout(() => q()[0]?.focus(), 30);
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.preventDefault(); onClose(); } if (e.key === 'Tab') { const f = q(); if (!f.length) return; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } } };
    document.addEventListener('keydown', k);
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; (back.current as HTMLElement | null)?.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-[60]">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
    <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-xl bg-card shadow-pop sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[480px] sm:rounded-none sm:rounded-l-xl">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4"><div className="mx-auto mb-1 h-1 w-10 rounded-full bg-line sm:hidden absolute left-1/2 top-1.5 -translate-x-1/2" aria-hidden />{icon}<h2 className="flex-1 text-lg font-semibold">{title}</h2><button onClick={onClose} aria-label="关闭" className="grid h-9 w-9 place-items-center rounded-full hover:bg-subtle"><X size={18} aria-hidden /></button></div>
      <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      {footer && <div className="border-t border-line px-5 py-3">{footer}</div>}
    </div>
  </div>;
}
