import Link from 'next/link'; import { LESSONS } from '@/lib/learn'; import { PageHead } from '@/components/ui'; import KgCard from '@/components/KgCard';
export function generateStaticParams() { return LESSONS.map(l => ({ slug: l.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) { return { title: LESSONS.find(l => l.slug === params.slug)!.title }; }
export default function P({ params }: { params: { slug: string } }) {
  const i = LESSONS.findIndex(l => l.slug === params.slug); const l = LESSONS[i]; const nx = LESSONS[i + 1];
  return <div className="space-y-6"><PageHead eyebrow={`第 2 层 · 第 ${i + 1} 站 · ${l.age}`} title={l.title} desc={l.oneLine} />
    {l.slug === 'kindergarten' && <KgCard />}
    <section className="card p-5"><h2 className="font-bold">流程四步看懂</h2><ol className="mt-3 space-y-3">{l.steps.map((s, k) => <li key={s.t} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-soft text-sm font-bold text-accent">{k + 1}</span><div><p className="font-semibold">{s.t}</p><p className="text-muted">{s.d}</p></div></li>)}</ol></section>
    <section className="card p-5"><h2 className="font-bold">名词白话</h2><dl className="mt-3 grid gap-2">{l.terms.map(([a, b]) => <div key={a} className="rounded-xl bg-sunken p-3"><dt className="font-semibold">{a}</dt><dd className="text-sm text-muted">{b}</dd></div>)}</dl></section>
    <section className="rounded-card bg-warn-soft p-5 text-warn"><h2 className="font-bold">容易踩的坑</h2><ul className="mt-2 list-disc pl-5">{l.watch.map(w => <li key={w}>{w}</li>)}</ul></section>
    <section><h2 className="font-bold">官方原文</h2><ul className="mt-2 space-y-1">{l.src.map(s => <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label} ↗</a></li>)}</ul>
      <p className="mt-2 text-sm"><Link href={`/library/stages/${l.slug}/`}>进阶：查看这个学段的完整字段表 →</Link></p></section>
    <div className="flex flex-col gap-3 sm:flex-row"><Link href="/start/" className="btn-primary flex-1">看我家在这一站要做什么</Link>{nx && <Link href={`/learn/${nx.slug}/`} className="btn-ghost flex-1">下一站：{nx.title} →</Link>}</div></div>;
}
