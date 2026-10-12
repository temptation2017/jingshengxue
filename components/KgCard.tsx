'use client';
import { useProfile } from './useProfile';
import { check, Q, SRC, Mark } from '@/lib/kg';
import { OFFICIAL } from '@/lib/site';
import { Basis } from './ui';
const MK: Record<Mark, [string, string]> = { yes: ['✓ 满足', 'bg-soft text-accent'], no: ['✕ 不满足', 'bg-danger-soft text-danger'], na: ['? 官方未写明 / 待确认', 'bg-warn-soft text-warn'] };
function Box({ n, title, sub, children }: { n: string; title: string; sub: string; children: React.ReactNode }) {
  return <section className="p-5 border-t border-line first:border-t-0"><div className="flex items-start gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-ink">{n}</span><div className="min-w-0 flex-1"><h3 className="text-lg font-bold">{title}</h3><p className="text-sm text-muted">{sub}</p><div className="mt-3 space-y-2">{children}</div></div></div></section>;
}
export default function KgCard() {
  const p = useProfile();
  const r = p ? check(p) : null;
  return (<div className="card overflow-hidden" id="kg-card">
    <div className="bg-accent px-5 py-4 text-accent-ink"><p className="text-sm opacity-90">海淀公办园 · 2026 年官方口径</p><h2 className="text-xl font-bold">入园条件卡</h2><p className="text-sm opacity-90">门槛（能不能报）和顺位（谁先录）是两件事，分开看。</p></div>
    <Box n="①" title="能不能报名（硬门槛）" sub="区教委只写了这两条，满足就能报名，不代表能录上。">
      <ul className="space-y-2"><li className="rounded-xl bg-sunken p-3"><strong>年龄：</strong>2022-09-01 至 2023-08-31 出生（2026 年小班）。</li><li className="rounded-xl bg-sunken p-3"><strong>地域：</strong>户籍在海淀，<strong>或</strong>家庭实际住在海淀，二选一。</li></ul>
      <Basis text={Q.who} src={SRC} />
      <p className="text-sm text-muted">官方<strong>没写</strong>的：非京户要不要居住证才能报名、怎样证明「实际居住」、房产 / 租房 / 外区户口有没有区别。这些不要当作门槛，去看意向园简章。</p>
      {r && <div className="mt-3 rounded-2xl border-2 border-accent/40 p-3"><p className="font-semibold">对照你家（{r.year} 年报小班）</p>
        <ul className="mt-2 space-y-3">{r.rows.map(c => <li key={c.item}><div className="flex flex-wrap items-center gap-2"><span className={`chip ${MK[c.mark][1]}`}>{MK[c.mark][0]}</span><span className="font-medium">{c.item}</span></div><p className="mt-1 text-sm text-muted">{c.why}</p><Basis text={c.quote} src={SRC} /></li>)}</ul></div>}
      {!r && <a href="/jingshengxue/start/" className="btn-ghost mt-2">回答 4 个问题，逐条对照我家</a>}
    </Box>
    <Box n="②" title="报了按什么顺序录（招生顺位）" sub="没有全区统一顺位，每所园自己定。">
      <p><strong>官方原话：</strong>各幼儿园「根据周边学位需求和本园具体情况，合理确定入园招生顺位」，按顺位录取，额满为止。同一顺位里才看你填的志愿先后；早报名不占优势。</p>
      <Basis text={`${Q.order} ${Q.main} ${Q.early}`} src={SRC} />
      <p className="rounded-xl bg-sunken p-3 text-sm"><strong>去哪看每所园的顺位：</strong>登录海淀学前平台后点幼儿园名称看招生简章；或按《小班招生名录》上的电话问。<br /><span className="text-muted">常见写法示例（某海淀公办园简章，非官方转载，仅供理解）：本小区业主子女 → 本街道海淀户籍或监护人有海淀房产 → 周边北京户籍 → 周边其他幼儿。</span></p>
      <Basis text={Q.brief} src={SRC} />
    </Box>
    <Box n="③" title="要带什么、什么时候、在哪里办" sub="官方只规定了上传要求和时间窗口，具体材料看各园。">
      <ul className="space-y-2"><li className="rounded-xl bg-sunken p-3"><strong>时间：</strong>2026 年为 6 月 1 日–15 日；15 日后不能再改信息和志愿。2027 年日期未发布。</li>
        <li className="rounded-xl bg-sunken p-3"><strong>在哪：</strong><a href={OFFICIAL.ryfw.href} target="_blank" rel="noopener noreferrer">ryfw.bjedu.cn</a> → 海淀 →「我要报名」，填 2–5 个有顺序的志愿。</li>
        <li className="rounded-xl bg-sunken p-3"><strong>上传：</strong>证件原件扫描或拍照，清晰，每张 1M 以内。之后幼儿园做现场材料审核。</li>
        <li className="rounded-xl bg-sunken p-3"><strong>具体材料清单：</strong>官方未统一列出，以意向园简章为准。常见简章会要：户口簿、监护人房产证明或在京实际住所材料、出生证明、预防接种证、信息采集表；非京户另加居住证和社保证明。</li>
        <li className="rounded-xl bg-sunken p-3"><strong>没录上：</strong>补录办法海淀官方未写明。平台可查「未录取」状态，然后打学前科 88487315 问。</li></ul>
      <Basis text={`${Q.time} ${Q.wish} ${Q.upload} ${Q.onsite}`} src={SRC} />
    </Box>
  </div>);
}
