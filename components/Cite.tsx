export function Cite({ href, label }: { href: string; label: string }) {
  return <p className="text-base border-l-4 border-ochre bg-white px-3 py-1 my-2">📄 依据：<a href={href} target="_blank" rel="noopener noreferrer">{label}</a>（核对 2026-10-12）</p>;
}
export function Tag({ kind, children }: { kind: 'gap' | 'ok' | 'warn'; children: React.ReactNode }) {
  const m = { gap: ['bg-brick text-white', '缺口'], ok: ['bg-pine text-white', '已满足'], warn: ['bg-ochre text-white', '待核验'] }[kind];
  return <span className={`inline-block rounded px-2 py-0.5 text-sm font-bold mr-2 ${m[0]}`}>【{m[1]}】</span>;
}
