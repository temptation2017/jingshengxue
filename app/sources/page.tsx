import { SOURCES, STAGES, CHANGELOG } from '@/lib/content';
export const metadata = { title: '政策原文' };
export default function P() { return <div className="mx-auto max-w-3xl px-4 pt-12"><h1 className="text-xl font-semibold">政策原文</h1><p className="mt-4 text-muted">本站每一条内容都来自下列官方文件。核对日期均为 2026-10-12。</p>
  <section className="mt-10 rounded-md bg-subtle p-4"><h2 className="text-xs font-semibold text-muted">更新记录</h2><ul className="mt-2 space-y-1 text-base">{CHANGELOG.map(([d, t], i) => <li key={i}><span className="mr-3 text-xs text-muted tabular-nums">{d}</span>{t}</li>)}</ul></section>
  {STAGES.map((s, i) => <section key={s.key} className="mt-14"><h2 className="flex items-baseline gap-3 text-lg font-semibold"><span className="text-xs text-muted tabular-nums">{i + 1}</span>{s.name}</h2>
    <ul className="mt-4 divide-y divide-line border-y border-line">{SOURCES.filter(x => x.stage.includes(s.key)).map(x => <li key={x.id} className="py-4"><a href={x.url} target="_blank" rel="noopener noreferrer">{x.title}</a><p className="mt-1 text-xs text-muted">{x.issuer} · 适用 {x.year} · 核对 2026-10-12</p></li>)}</ul></section>)}
</div>; }
