import { STAGES, stageByKey } from '@/lib/content';
import StageView from '@/components/StageView';
export function generateStaticParams() { return STAGES.map(s => ({ key: s.key })); }
export function generateMetadata({ params }: { params: { key: string } }) { const s = stageByKey(params.key); return { title: `${s.name}入学条件`, description: s.summary }; }
export default function P({ params }: { params: { key: string } }) { return <StageView k={params.key} />; }
