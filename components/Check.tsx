'use client';
import { useEffect, useState } from 'react';
import { Check as CheckI, CircleCheck, CircleAlert, CircleX, Printer, RotateCcw } from 'lucide-react';
import { STAGES, IDENTITIES, DISTRICTS, QUESTIONS, stageByKey, Identity, District, StageKey, Item } from '@/lib/content';
import { STAGE_ICON, ID_ICON, DISTRICT_ICON, Q_ICON, Mark } from '@/lib/icons';
import { visible, conclusion } from '@/lib/filter';
import { entryYears } from '@/lib/years';
import { judge } from '@/lib/judge';
import { useFilter } from './useFilter';
import QTabs, { useHashTab } from './QTabs';
import { Elig, Alloc, Mats, When } from './Panels';
import { Sources } from './bits';
const STEPS = ['学段与出生', '身份与区', '补充信息'];
function Choice<T extends string>({ opts, val, set, name }: { opts: [T, string, any][]; val: T; set: (v: T) => void; name: string }) {
  return <div role="radiogroup" aria-label={name} className="grid gap-2 sm:grid-cols-2">{opts.map(([k, t, I]) => { const on = val === k; return <button type="button" key={k} role="radio" aria-checked={on} onClick={() => set(k)} className={`flex items-center gap-3 rounded-md border p-3 text-left transition ${on ? 'border-primary bg-tint' : 'border-line bg-card hover:border-muted'}`}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-sm ${on ? 'bg-primary text-on-primary' : 'bg-subtle text-muted'}`}><I size={18} aria-hidden /></span><span className="text-sm font-medium">{t}</span></button>; })}</div>;
}
export default function Check() {
  const [f, setF] = useFilter(); const [tab, setTab] = useHashTab();
  const [step, setStep] = useState(0); const [stage, setStage] = useState<StageKey>('kindergarten'); const [birth, setBirth] = useState('');
  const [lives, setLives] = useState(true); const [permit, setPermit] = useState(''); const [ins, setIns] = useState(''); const [cont, setCont] = useState(true);
  useEffect(() => { const q = new URLSearchParams(location.search).get('stage'); if (q && STAGES.some(s => s.key === q)) setStage(q as StageKey); }, []);
  const identity = (f.identity || 'local') as Identity; const s = stageByKey(stage);
  const needExtra = identity !== 'local'; const last = needExtra ? 2 : 1; const show = step > last;
  const Y = birth ? entryYears(birth)[stage] : 0;
  const L = 'flex flex-col gap-1.5'; const T = 'text-sm font-medium';
  const canNext = step !== 0 || !!birth;
  if (show) {
    const prof = { identity, lives, permit, ins, cont, birth };
    const elig = visible(s.q.eligibility.items, identity, f.district, s).filter(i => !i.date);
    const jm = new Map<Item, [Mark, string]>(elig.map(it => [it, judge(it, Y, prof)]));
    const marks = Array.from(jm.values()).map(x => x[0]);
    const no = marks.filter(m => m === 'no').length; const unsure = marks.filter(m => m !== 'yes' && m !== 'no').length;
    const [SI, sc, st] = no ? [CircleX, 'text-fail bg-fail-bg', `有 ${no} 项条件不满足`] : unsure ? [CircleAlert, 'text-pend bg-pend-bg', `未发现不满足项，另有 ${unsure} 项需核对`] : [CircleCheck, 'text-ok bg-ok-bg', '已列出的条件均满足'];
    const items = visible(s.q[tab].items, identity, f.district, s); const QI = Q_ICON[tab];
    return <div>
      <section className="card flex items-start gap-4 p-5">
        <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full ${sc}`}><SI size={30} aria-hidden /></span>
        <div className="min-w-0 flex-1"><p className="text-xl font-semibold">{st}</p>
          <p className="mt-1 text-sm text-muted">{s.name} · {Y} 年{stage === 'gaokao' ? '高考' : '入学'} · {IDENTITIES.find(x => x[0] === identity)![1]} · {DISTRICTS.find(x => x[0] === f.district)![1]}</p>
          {Y > 2026 && <p className="mt-1 text-sm text-pend">{Y} 年细则未发布，以当年文件为准。</p>}{Y > 0 && Y < 2026 && <p className="mt-1 text-sm text-muted">该学年已过。</p>}
          <div className="no-print mt-3 flex gap-2"><button onClick={() => print()} className="btn-ghost py-1.5 text-sm"><Printer size={15} aria-hidden />打印</button><button onClick={() => setStep(0)} className="btn-ghost py-1.5 text-sm"><RotateCcw size={15} aria-hidden />重新填写</button></div></div>
      </section>
      <div className="mt-5"><QTabs tab={tab} set={setTab} idp="ck" /></div>
      <section id="ck-panel" role="tabpanel" aria-labelledby={`ck-tab-${tab}`} className="card mt-4 p-5">
        <p className="flex items-center gap-2 text-xs font-semibold text-primary"><QI size={15} aria-hidden />{QUESTIONS.find(q => q[0] === tab)![1]}</p>
        <p className="mt-2 text-lg font-semibold">{conclusion(s, tab, f.district)}</p>
        <div className="mt-4">{tab === 'eligibility' ? <Elig items={items} stage={s} showCompare={false} judged={jm} /> : tab === 'allocation' ? <Alloc items={items} /> : tab === 'materials' ? <Mats items={items} stageKey={s.key} /> : <When items={items} stage={s} />}</div>
        <Sources items={items} />
      </section>
      <p className="mt-4 text-xs text-muted">仅为对照官方原文的辅助判断，不构成录取承诺。</p>
    </div>;
  }
  return <div className="card p-5 sm:p-6">
    <ol className="mb-6 flex items-center gap-2" aria-label="步骤">{STEPS.slice(0, last + 1).map((t, i) => <li key={t} className="flex flex-1 items-center gap-2"><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${i < step ? 'bg-primary text-on-primary' : i === step ? 'border-2 border-primary text-primary' : 'bg-subtle text-muted'}`} aria-current={i === step ? 'step' : undefined}>{i < step ? <CheckI size={14} aria-hidden /> : i + 1}</span><span className={`hidden text-sm sm:inline ${i === step ? 'font-semibold' : 'text-muted'}`}>{t}</span>{i < last && <span className="h-px flex-1 bg-line" />}</li>)}</ol>
    <form onSubmit={e => { e.preventDefault(); if (canNext) setStep(step + 1); }} className="space-y-5">
      {step === 0 && <><div className={L}><span className={T}>要查哪个学段</span><Choice name="学段" opts={STAGES.map(x => [x.key, x.name, STAGE_ICON[x.key]] as [StageKey, string, any])} val={stage} set={setStage} /></div>
        <label className={L}><span className={T}>孩子出生日期</span><input type="date" required value={birth} onChange={e => setBirth(e.target.value)} className="sm:w-64" /></label></>}
      {step === 1 && <><div className={L}><span className={T}>身份</span><Choice name="身份" opts={IDENTITIES.map(([k, t]) => [k, t, ID_ICON[k]] as [Identity, string, any])} val={identity} set={v => setF({ ...f, identity: v })} /></div>
        <div className={L}><span className={T}>区</span><Choice name="区" opts={DISTRICTS.map(([k, t]) => [k, t, DISTRICT_ICON] as [District, string, any])} val={f.district} set={v => setF({ ...f, district: v })} /></div></>}
      {step === 2 && <><label className="flex items-center gap-3"><input type="checkbox" className="h-5 w-5" checked={lives} onChange={e => setLives(e.target.checked)} />家庭实际住在所选区</label>
        {identity === 'nonBj' && <div className="grid gap-4 sm:grid-cols-2"><label className={L}><span className={T}>居住证有效期起始日</span><input type="date" value={permit} onChange={e => setPermit(e.target.value)} /></label><label className={L}><span className={T}>社保首次参保日</span><input type="date" value={ins} onChange={e => setIns(e.target.value)} /></label>
          <label className="flex items-center gap-3 sm:col-span-2"><input type="checkbox" className="h-5 w-5" checked={cont} onChange={e => setCont(e.target.checked)} />社保按月连续缴纳，没有断缴</label></div>}</>}
      <div className="flex gap-2 pt-2">{step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="btn-ghost">上一步</button>}<button disabled={!canNext} className="btn-primary flex-1 disabled:opacity-40 sm:flex-none">{step === last ? '查看结果' : '下一步'}</button></div>
    </form>
  </div>;
}
