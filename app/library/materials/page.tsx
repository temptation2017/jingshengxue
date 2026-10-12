import Checklist from '@/components/Checklist';
export const metadata = { title: '材料清单' };
export default function Page() { return <div><h1 className="text-3xl font-bold tracking-tight mb-2">材料清单（可勾选、可打印）</h1><p className="mb-4">按 2026 学年已核验文件整理；登记日的最终材料以学校/园所通知为准。勾选只保存在本页，刷新会清空。</p><Checklist /></div>; }
