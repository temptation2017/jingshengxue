import Check from '@/components/Check';
export const metadata = { title: '条件自查' };
export default function P() { return <div className="mx-auto max-w-3xl px-4 pt-8 sm:pt-12"><h1 className="text-2xl font-bold tracking-tight">条件自查</h1><p className="mt-2 text-muted">三步填写，按四个问题对照官方原文。只在本机计算。</p><div className="mt-6"><Check /></div></div>; }
