import fs from 'fs'; import path from 'path';
export const metadata = { title: '关于与免责' };
export default function Page() {
  const md = fs.readFileSync(path.join(process.cwd(), 'data/disclaimer.md'), 'utf8');
  const blocks = md.split('\n').filter(l => l.trim() && l.trim() !== '---');
  return <div><h1 className="text-3xl font-bold tracking-tight mb-2">关于与免责声明</h1>
   <p className="bg-sunken p-3 rounded mb-4">「京升学」是非官方的北京升学政策整理工具，以区教委当年文件为准。生效日期：2026-10-12。</p>
   {blocks.map((l, i) => { const s = l.replace(/\*\*/g, '').replace(/`/g, ''); return l.startsWith('## ') ? <h2 key={i} className="text-2xl font-bold mt-4">{s.slice(3)}</h2> : <p key={i} className="my-1">{s}</p>; })}</div>;
}
