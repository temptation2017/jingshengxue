import fs from 'fs'; import path from 'path';
export const metadata = { title: '关于与免责' };
export default function P() {
  const lines = fs.readFileSync(path.join(process.cwd(), 'data/disclaimer.md'), 'utf8').split('\n').filter(l => l.trim() && l.trim() !== '---');
  return <div className="mx-auto max-w-3xl px-4 pt-12"><h1 className="text-xl font-semibold">关于与免责</h1>
    <p className="mt-4 text-muted">京升学是非官方的北京入学政策整理工具。全站按「能不能报、怎么分、带什么、何时何地办」四个问题组织，只收录能找到官方原文的内容；找不到的标「官方未写明」或「待收录」。</p>
    <div className="mt-10">{lines.map((l, i) => { const s = l.replace(/\*\*|`/g, ''); return l.startsWith('## ') ? <h2 key={i} className="mt-10 text-lg font-semibold">{s.slice(3)}</h2> : <p key={i} className="mt-2">{s}</p>; })}</div></div>;
}
