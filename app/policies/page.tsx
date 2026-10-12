import P from '@/data/policies.json';
export const metadata = { title: '政策原文库 · 京升学' };
export default function Page() { return <div><h1 className="text-3xl font-bold mb-2">政策原文库（{P.length} 条）</h1><p className="mb-4">每条均为官方来源，核对日期 2026-10-12。点链接看原文。</p>
 <ul className="space-y-4">{P.map((p: any) => <li key={p.id} className="bg-white border rounded p-4">
  <h2 className="text-xl font-bold">{p.title}</h2>
  <p className="text-base">学年：{p.schoolYear} ｜ 学段：{p.stage} ｜ 地区：{p.district === 'beijing' ? '北京市' : p.district === 'haidian' ? '海淀区' : p.district} ｜ 可信度：{p.confidence === 'verified' ? '已核验' : p.confidence} ｜ 核对：{p.lastVerifiedAt}</p>
  {p.issuer && <p className="text-base">发文机关：{p.issuer}</p>}
  <p className="mt-1">{p.summary}</p>
  {p.tags?.length > 0 && <p className="text-base mt-1">标签：{p.tags.join(' · ')}</p>}
  <ul className="mt-1">{p.officialUrls.map((u: string) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer" className="break-all">{u}</a></li>)}</ul>
 </li>)}</ul></div>; }
