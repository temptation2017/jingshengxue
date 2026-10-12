import stages from '@/data/stages.json';
import { STAGES } from '@/lib/site';
import Link from 'next/link';
export function generateStaticParams() { return stages.map(s => ({ slug: s.slug })); }
const linkify = (t: string) => t.split(/(https?:\/\/[^\s；，）]+)/g).map((p, i) => p.startsWith('http') ? <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="break-all">{p}</a> : p);
export default function Stage({ params }: { params: { slug: string } }) {
  const s = stages.find(x => x.slug === params.slug)!;
  return (<div>
    <nav aria-label="学段" className="flex flex-wrap gap-2 mb-4">{STAGES.map(([k, t]) => <Link key={k} href={`/stages/${k}/`} aria-current={k === s.slug ? 'page' : undefined} className={`px-3 py-1 rounded border ${k === s.slug ? 'bg-pine text-white' : 'bg-white'}`}>{t}</Link>)}</nav>
    <h1 className="text-3xl font-bold mb-2">{s.title}</h1>
    <p className="mb-4 text-base">统一字段表。「待核验」表示本站未检索到官方原文，请以官方入口为准。「区教委每年一变」的条目不要套用往年。</p>
    <div className="overflow-x-auto"><table><thead><tr><th scope="col" className="w-32">字段</th><th scope="col">内容（可溯源）</th><th scope="col" className="w-40">来源</th></tr></thead>
      <tbody>{s.rows.map(r => <tr key={r.field}><th scope="row">{r.field}</th><td>{linkify(r.content)}</td><td className="text-base">{linkify(r.source)}</td></tr>)}</tbody></table></div>
    {s.notes.map(n => <p key={n} className="mt-3">{n}</p>)}
  </div>);
}
