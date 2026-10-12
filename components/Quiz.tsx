'use client';
import { useState } from 'react';
import { evaluate, Input } from '@/lib/engine';
import { Tag } from './Cite';
const L = { eligible: ['符合（按已核验规则）', 'bg-pine'], conditional: ['有条件符合', 'bg-ochre'], ineligible: ['暂不符合', 'bg-brick'], unknown: ['无法判断 / 以当年文件为准', 'bg-gray-600'] } as const;
const F = 'block w-full border-2 border-[#b9a98f] rounded p-2 bg-white text-lg';
export default function Quiz() {
  const [v, setV] = useState<Input>({ hukou: 'haidian', housing: 'ownPre2019', permitStart: '', insuranceStart: '', insuranceContinuous: true, birth: '', stage: 'kindergarten', year: 2027, district: 'haidian' });
  const [res, setRes] = useState<ReturnType<typeof evaluate> | null>(null);
  const set = (k: keyof Input) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setV({ ...v, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : k === 'year' ? +e.target.value : e.target.value });
  return (<div>
    <form className="grid sm:grid-cols-2 gap-4 bg-white rounded-xl p-4 border" onSubmit={e => { e.preventDefault(); setRes(evaluate(v)); }}>
      <label>目标学段<select className={F} value={v.stage} onChange={set('stage')}><option value="kindergarten">幼儿园小班</option><option value="primary">小学一年级</option><option value="junior">初中</option><option value="senior">高中/中职</option><option value="university">大学（高考报名资格）</option></select></label>
      <label>入学/报考年份<select className={F} value={v.year} onChange={set('year')}>{[2026, 2027, 2028, 2029, 2030, 2031].map(y => <option key={y} value={y}>{y}{y === 2026 ? '（已发布）' : '（未发布）'}</option>)}</select></label>
      <label>目标区<select className={F} value={v.district} onChange={set('district')}><option value="haidian">海淀区</option><option value="other">其他区（暂未细化）</option></select></label>
      <label>孩子出生日期<input type="date" className={F} value={v.birth} onChange={set('birth')} required /></label>
      <label>户口<select className={F} value={v.hukou} onChange={set('hukou')}><option value="haidian">北京户口·在海淀</option><option value="otherBj">北京户口·在其他区</option><option value="nonBj">非北京户口</option><option value="collective">集体户口（单位/学校的公共户口）</option></select></label>
      <label>住房<select className={F} value={v.housing} onChange={set('housing')}><option value="ownPre2019">自有住宅，产权证 2019-01-01 前取得</option><option value="ownPost2019">自有住宅，产权证 2019-01-01 及以后取得</option><option value="rentFiled3y">租房，连续单独承租满 3 年且已备案</option><option value="rent">租房（其他情况）</option><option value="none">无房 / 借住</option></select></label>
      {v.hukou === 'nonBj' && <>
        <label>居住证有效期起始日<input type="date" className={F} value={v.permitStart} onChange={set('permitStart')} /></label>
        <label>社保（社会保险）首次参保日<input type="date" className={F} value={v.insuranceStart} onChange={set('insuranceStart')} /></label>
        <label className="sm:col-span-2 flex gap-2 items-center"><input type="checkbox" className="w-6 h-6" checked={v.insuranceContinuous} onChange={set('insuranceContinuous')} />社保一直按月连续缴纳、未断缴（不含补缴）</label>
      </>}
      <button className="sm:col-span-2 bg-brick text-white rounded-lg py-3 text-xl font-bold">看结果</button>
    </form>
    {res && <section aria-live="polite" className="mt-6">
      <p className={`${L[res.status][1]} text-white rounded-lg p-4 text-2xl font-bold`}>结论：{L[res.status][0]}</p>
      {res.notes.map(n => <p key={n} className="mt-2 bg-apricot p-2 rounded">ⓘ {n}</p>)}
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-3 rounded border"><h2 className="font-bold text-xl">能做什么</h2><ul>{res.can.length ? res.can.map(c => <li key={c}><Tag kind="ok">{null}</Tag>{c}</li>) : <li>—</li>}</ul></div>
        <div className="bg-white p-3 rounded border-2 border-brick"><h2 className="font-bold text-xl">还差什么</h2><ul>{res.gaps.length ? res.gaps.map(c => <li key={c} className="mb-2"><Tag kind="gap">{null}</Tag>{c}</li>) : <li>暂无已知缺口</li>}</ul></div>
        <div className="bg-white p-3 rounded border"><h2 className="font-bold text-xl">去哪办</h2><ul>{res.where.map(w => <li key={w.href}><a href={w.href} target="_blank" rel="noopener noreferrer">{w.label}</a></li>)}</ul></div>
      </div>
      <p className="mt-3 text-base">结果仅为辅助判断，不构成录取承诺。</p>
    </section>}
  </div>);
}
