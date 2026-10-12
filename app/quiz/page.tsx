import Quiz from '@/components/Quiz';
export const metadata = { title: '30秒自测 · 京升学' };
export default function Page() { return <div><h1 className="text-3xl font-bold mb-2">30 秒自测</h1><p className="mb-4">填写后只在你自己的浏览器里计算，不上传任何信息。</p><Quiz /></div>; }
