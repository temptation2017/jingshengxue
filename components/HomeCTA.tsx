'use client';
import Link from 'next/link';
import { useProfile } from './useProfile';
export default function HomeCTA() {
  const p = useProfile();
  if (p) return <div className="flex flex-col gap-3 sm:flex-row"><Link href="/roadmap/" className="btn-primary flex-1 text-lg">继续看我家的路线图 →</Link><Link href="/guide/" className="btn-ghost flex-1">打开行动清单</Link></div>;
  return <div className="flex flex-col gap-3 sm:flex-row"><Link href="/start/" className="btn-primary flex-1 text-lg">开始：回答 4 个问题</Link><Link href="/learn/" className="btn-ghost flex-1">先了解全流程</Link></div>;
}
