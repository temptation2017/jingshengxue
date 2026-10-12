import type { Src } from '@/lib/site';
export function Basis({ text, src }: { text: string; src: Src }) {
  return <details className="group mt-2 rounded-xl bg-sunken px-3 py-2 text-sm"><summary className="cursor-pointer list-none font-medium text-muted"><span className="group-open:hidden">▸</span><span className="hidden group-open:inline">▾</span> 依据</summary>
    <p className="mt-1">{text}</p><a href={src.href} target="_blank" rel="noopener noreferrer" className="break-all">{src.label} ↗</a><span className="text-muted">（核对 2026-10-12）</span></details>;
}
export function Chip({ tone, children }: { tone: 'ok' | 'gap' | 'warn' | 'info'; children: React.ReactNode }) {
  const c = { ok: 'bg-soft text-accent', gap: 'bg-danger-soft text-danger', warn: 'bg-warn-soft text-warn', info: 'bg-sunken text-muted' }[tone];
  return <span className={`chip ${c}`}>{children}</span>;
}
export function PageHead({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return <div className="mb-6">{eyebrow && <p className="text-sm font-semibold text-accent">{eyebrow}</p>}<h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>{desc && <p className="mt-2 text-muted">{desc}</p>}</div>;
}
export function Cite({ href, label }: { href: string; label: string }) {
  return <p className="my-2 rounded-xl bg-sunken px-3 py-2 text-sm">📄 依据：<a href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a><span className="text-muted">（核对 2026-10-12）</span></p>;
}
