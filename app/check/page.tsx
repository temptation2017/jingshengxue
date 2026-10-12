import Check from '@/components/Check';
export const metadata = { title: '条件自查' };
export default function P() { return <div className="mx-auto max-w-3xl px-4 pt-12"><h1 className="text-xl font-semibold">条件自查</h1><p className="mt-4 text-muted">填写后，按四个问题逐条对照官方原文。信息只在你的浏览器里计算。</p><div className="mt-10"><Check /></div></div>; }
