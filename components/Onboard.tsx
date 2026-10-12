'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LS, Profile } from '@/lib/roadmap';
type Opt = [string, string, string?];
const Q: { k: keyof Profile; q: string; hint: string; opts?: Opt[] }[] = [
  { k: 'birth', q: '孩子是哪年哪月出生的？', hint: '入学按出生日期划线，月份就够了。' },
  { k: 'district', q: '打算在哪个区上学？', hint: '目前海淀区的细则最全，其他区先给通用路线。', opts: [['haidian', '海淀区'], ['other', '其他区']] },
  { k: 'hukou', q: '孩子的户口是哪种？', hint: '户口就是户籍登记所在地。', opts: [['haidian', '北京户口，在海淀'], ['otherBj', '北京户口，在其他区'], ['nonBj', '不是北京户口', '外地户口，可能要办居住证'], ['collective', '集体户口', '挂在单位或学校的公共户口']] },
  { k: 'housing', q: '在打算上学的区，住房是哪种？', hint: '大致选一个就行，细节后面会提醒你核对。', opts: [['own', '自己家的房', '有产权证或已网签'], ['rent', '租房'], ['none', '没有房 / 借住亲友家']] },
];
export default function Onboard() {
  const r = useRouter();
  const [i, setI] = useState(0);
  const [v, setV] = useState<Partial<Profile>>({});
  const q = Q[i]; const last = i === Q.length - 1;
  const ok = !!v[q.k] && (q.k !== 'birth' || /^\d{4}-\d{2}$/.test(v.birth!));
  const next = () => { if (!ok) return; if (last) { localStorage.setItem(LS.profile, JSON.stringify(v)); r.push('/roadmap/'); } else setI(i + 1); };
  return (<div className="card p-5 sm:p-8">
    <div className="mb-6"><div className="flex justify-between text-sm text-muted"><span>第 {i + 1} / {Q.length} 题</span><span>约 30 秒</span></div>
      <div className="mt-2 h-2 rounded-pill bg-sunken" role="progressbar" aria-valuemin={0} aria-valuemax={Q.length} aria-valuenow={i + 1} aria-label="答题进度"><div className="h-2 rounded-pill bg-accent transition-all duration-500" style={{ width: `${((i + 1) / Q.length) * 100}%` }} /></div></div>
    <div key={i} className="fade-in">
      <h2 className="text-2xl font-bold" id="q">{q.q}</h2><p className="mt-1 text-muted">{q.hint}</p>
      {q.opts ? <div role="radiogroup" aria-labelledby="q" className="mt-5 grid gap-3">{q.opts.map(([val, t, sub]) => { const on = v[q.k] === val; return (
        <button key={val} role="radio" aria-checked={on} onClick={() => setV({ ...v, [q.k]: val })} className={`text-left rounded-2xl border-2 px-4 py-3 transition ${on ? 'border-accent bg-soft' : 'border-line bg-surface hover:border-muted'}`}>
          <span className="font-semibold">{t}</span>{sub && <span className="block text-sm text-muted">{sub}</span>}</button>); })}</div>
      : <label className="mt-5 block"><span className="sr-only">出生年月</span><input type="month" min="2010-01" max="2027-12" value={v.birth ?? ''} onChange={e => setV({ ...v, birth: e.target.value })} onKeyDown={e => e.key === 'Enter' && next()} className="w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-lg text-ink focus:border-accent" /></label>}
    </div>
    <div className="mt-8 flex gap-3">
      {i > 0 && <button className="btn-ghost" onClick={() => setI(i - 1)}>上一题</button>}
      <button className="btn-primary flex-1 disabled:opacity-40" disabled={!ok} onClick={next}>{last ? '生成我家的路线图' : '下一题'}</button>
    </div>
    <p className="mt-4 text-xs text-muted">答案只保存在你这台设备的浏览器里，不会上传。</p>
  </div>);
}
