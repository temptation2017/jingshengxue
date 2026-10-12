import { STAGES, stageByKey, RETRIEVED } from '@/lib/content';
import StageBody from '@/components/StageBody';
export function generateStaticParams() { return STAGES.map(s => ({ key: s.key })); }
export function generateMetadata({ params }: { params: { key: string } }) { const s = stageByKey(params.key); return { title: `${s.name}入学条件`, description: s.summary }; }
export default function P({ params }: { params: { key: string } }) {
  const s = stageByKey(params.key); const i = STAGES.indexOf(s);
  return <div className="mx-auto max-w-5xl px-4 pt-12">
    <p className="text-xs text-muted">学段 {i + 1} / 5 · {s.age}</p>
    <h1 className="mt-2 text-xl font-semibold sm:text-2xl">{s.name}</h1>
    <p className="mt-4 max-w-2xl text-muted">{s.summary}</p>
    <p className="mt-4 text-xs text-muted">适用：{s.schoolYear} · 官方原文核对 {RETRIEVED}</p>
    <div className="mt-10"><StageBody k={s.key} /></div>
  </div>;
}
