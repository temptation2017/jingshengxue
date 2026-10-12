import Guide from '@/components/Guide'; import { PageHead } from '@/components/ui';
export const metadata = { title: '下一步行动清单' };
export default function P() { return <><PageHead eyebrow="第 1 层 · 你现在该做什么" title="下一步行动清单" desc="一步一步来，做完就勾上。" /><Guide /></>; }
