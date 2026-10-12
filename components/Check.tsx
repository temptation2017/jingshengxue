'use client';
import { useEffect, useState } from 'react';
import { STAGES, IDENTITIES, DISTRICTS, QUESTIONS, stageByKey, src, Identity, District, StageKey, Item } from '@/lib/content';
import { visible, conclusion } from '@/lib/filter';
import { entryYears } from '@/lib/years';
import { useFilter } from './useFilter';
import { Tag, Quote, Num } from './bits';
type Mark = 'yes' | 'no' | 'not_stated' | 'pending' | 'self';
const d = (s: string) => new Date(s + 'T00:00:00');
function judge(it: Item, Y: number, birth: string, v: { identity: Identity; lives: boolean; permit: string; ins: string; cont: boolean }): [Mark, string] {
  const pub = Y === 2026; const pend = pub ? '' : `（${Y} 年细则未发布，按 2026 年口径推算）`;
  if (it.status === 'not_stated') return ['not_stated', ''];
  if (it.status === 'pending') return ['pending', ''];
  switch (it.check) {
    case 'age': return [pub ? 'yes' : 'pending', `按出生 ${birth.slice(0, 7)}，对应 ${Y} 年入学${pend}。`];
    case 'live': return v.identity === 'local' || v.lives ? ['yes', v.identity === 'local' ? '户籍或房产在本区。' : '家庭实际住在本区。'] : ['no', '户籍和实际居住都不在本区。'];
    case 'permit': { if (!v.permit) return ['no', '未填写居住证起始日。']; const lim = `${Y - 1}-09-01`; const ok = d(v.permit) < d(lim); return [ok ? (pub ? 'yes' : 'pending') : 'no', `起始日 ${v.permit}，要求早于 ${lim}${pend}。`]; }
    case 'insurance': { if (!v.ins) return ['no', '未填写首次参保日。']; const lim = `${Y - 1}-09-01`; const ok = d(v.ins) < d(lim) && v.cont; return [ok ? (pub ? 'yes' : 'pending') : 'no', `参保 ${v.ins}${v.cont ? '，连续缴纳' : '，有断缴'}；要求 ${lim} 前参保并连续缴纳${pend}。`]; }
  }
  return ['self', '本站无法替你判断，请对照原文自行核对。'];
}
const ML: Record<Mark, string> = { yes: '满足', no: '不满足', not_stated: '官方未写明', pending: '待收录 / 推算', self: '需自行核对' };
const MC: Record<Mark, string> = { yes: 'text-ok border-ok/40', no: 'text-fail border-fail/40', not_stated: 'text-muted bg-subtle border-line', pending: 'text-pend border-pend/40', self: 'text-muted border-line' };
export default function Check() {
  const [f, setF] = useFilter();
  const [stage, setStage] = useState<StageKey>('kindergarten'); const [birth, setBirth] = useState('');
  const [lives, setLives] = useState(true); const [permit, setPermit] = useState(''); const [ins, setIns] = useState(''); const [cont, setCont] = useState(true);
  const [show, setShow] = useState(false); const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => { const q = new URLSearchParams(location.search).get('stage'); if (q && STAGES.some(s => s.key === q)) setStage(q as StageKey); }, []);
  const identity = (f.identity || 'local') as Identity; const s = stageByKey(stage);
  const Y = birth ? entryYears(birth)[stage] : 0;
  const v = { identity, lives, permit, ins, cont };
  const L = 'flex flex-col gap-1.5'; const T = 'text-xs text-muted';
  return <div>
    <form className="no-print grid gap-5 sm:grid-cols-2" onSubmit={e => { e.preventDefault(); setShow(true); }}>
      <label className={L}><span className={T}>学段</span><select value={stage} onChange={e => setStage(e.target.value as StageKey)}>{STAGES.map(x => <option key={x.key} value={x.key}>{x.name}</option>)}</select></label>
      <label className={L}><span className={T}>孩子出生日期</span><input type="date" required value={birth} onChange={e => setBirth(e.target.value)} /></label>
      <label className={L}><span className={T}>身份</span><select value={identity} onChange={e => setF({ ...f, identity: e.target.value as Identity })}>{IDENTITIES.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></label>
      <label className={L}><span className={T}>区</span><select value={f.district} onChange={e => setF({ ...f, district: e.target.value as District })}>{DISTRICTS.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></label>
      {identity !== 'local' && <label className="flex items-center gap-2 sm:col-span-2"><input type="checkbox" className="h-5 w-5" checked={lives} onChange={e => setLives(e.target.checked)} />家庭实际住在所选区</label>}
      {identity === 'nonBj' && <>
        <label className={L}><span className={T}>居住证有效期起始日</span><input type="date" value={permit} onChange={e => setPermit(e.target.value)} /></label>
        <label className={L}><span className={T}>社保首次参保日</span><input type="date" value={ins} onChange={e => setIns(e.target.value)} /></label>
        <label className="flex items-center gap-2 sm:col-span-2"><input type="checkbox" className="h-5 w-5" checked={cont} onChange={e => setCont(e.target.checked)} />社保按月连续缴纳，没有断缴</label>
      </>}
      <div className="sm:col-span-2"><button className="rounded-sm bg-primary px-5 py-2.5 font-semibold text-on-primary hover:opacity-90">查看结果</button></div>
    </form>
    {show && Y > 0 && <div className="mt-14 border-t border-line pt-10" aria-live="polite">
      <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className="text-lg font-semibold">{s.name} · {Y} 年{stage === 'gaokao' ? '高考' : '入学'}</h2><button onClick={() => print()} className="no-print text-xs text-primary underline">打印</button></div>
      <p className="mt-1 text-xs text-muted">{IDENTITIES.find(x => x[0] === identity)![1]} · {DISTRICTS.find(x => x[0] === f.district)![1]}{Y > 2026 ? ` · ${Y} 年细则未发布，以当年文件为准` : ''}{Y < 2026 ? ' · 该学年已过' : ''}</p>
      {QUESTIONS.map(([q, t], i) => { const items = visible(s.q[q].items, identity, f.district, s); return <section key={q} className="border-b border-line py-10 last:border-0">
        <h3 className="flex items-center gap-3 text-lg font-semibold"><Num n={i + 1} />{t}</h3>
        <p className="mt-3 text-muted">{conclusion(s, q, f.district)}</p>
        {q === 'eligibility' && <ul className="mt-5 space-y-4">{items.filter(x => !x.date).map(it => { const [m, why] = judge(it, Y, birth, v); return <li key={it.text}><div className="flex items-start gap-3"><span className={`mt-0.5 inline-block w-20 shrink-0 rounded-sm border px-1.5 text-center text-xs leading-5 ${MC[m]}`}>{ML[m]}</span><div className="min-w-0"><p>{it.text}</p>{why && <p className="text-xs text-muted">{why}</p>}<Quote id={it.source} quote={it.quote} /></div></div></li>; })}</ul>}
        {q === 'allocation' && <ul className="mt-5 list-disc space-y-2 pl-5">{items.map(it => <li key={it.text}>{it.status !== 'official' && <><Tag s={it.status} />{' '}</>}{it.text}</li>)}</ul>}
        {q === 'materials' && <ul className="mt-5 space-y-3">{items.filter(x => x.material).map(it => { const k = `${stage}:${it.text}`; return <li key={k}><label className="flex items-start gap-3"><input type="checkbox" className="mt-1 h-5 w-5" checked={!!done[k]} onChange={() => setDone({ ...done, [k]: !done[k] })} /><span>{it.text}</span></label></li>; })}
          {items.filter(x => !x.material).map(it => <li key={it.text} className="text-muted">{it.status !== 'official' && <><Tag s={it.status} />{' '}</>}{it.text}</li>)}
          {items.length === 0 && <li><Tag s="pending" /> 待收录</li>}</ul>}
        {q === 'when' && <><ul className="mt-5 space-y-2">{items.map(it => <li key={it.text}>{it.status !== 'official' && <><Tag s={it.status} />{' '}</>}{it.text}</li>)}</ul>
          <p className="mt-4">官方入口：{s.entries.map((e, j) => <span key={e}>{j > 0 && ' · '}<a href={src(e).url} target="_blank" rel="noopener noreferrer">{src(e).title}</a></span>)}</p></>}
      </section>; })}
      <p className="text-xs text-muted">结果只是对照官方原文的辅助判断，不构成录取承诺。</p>
    </div>}
  </div>;
}
