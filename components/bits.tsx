import { src, Status } from '@/lib/content';
const T: Record<Status | 'yes' | 'no', [string, string]> = {
  official: ['官方原文', 'text-ok border-ok/40'], not_stated: ['官方未写明', 'text-muted bg-subtle border-line'], pending: ['待收录', 'text-pend border-pend/40'],
  yes: ['满足', 'text-ok border-ok/40'], no: ['不满足', 'text-fail border-fail/40'],
};
export function Tag({ s }: { s: keyof typeof T }) { return <span className={`inline-block whitespace-nowrap rounded-sm border px-1.5 text-xs leading-5 ${T[s][1]}`}>{T[s][0]}</span>; }
export function Quote({ id, quote }: { id?: string; quote?: string }) {
  if (!id) return null; const s = src(id);
  return <details className="group mt-1.5 text-xs text-muted"><summary className="cursor-pointer select-none hover:text-ink">官方原文</summary>
    <div className="mt-2 border-l-2 border-line pl-3">{quote && <p className="text-base text-ink">「{quote}」</p>}<p className="mt-1"><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a> · {s.issuer} · 核对 2026-10-12</p></div></details>;
}
export function Num({ n }: { n: number }) { return <span className="num" aria-hidden>{n}</span>; }
