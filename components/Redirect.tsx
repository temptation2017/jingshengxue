'use client';
import { useEffect } from 'react';
export default function Redirect({ to }: { to: string }) {
  const url = '/jingshengxue' + to; useEffect(() => { location.replace(url); }, [url]);
  return <div className="mx-auto max-w-3xl px-4 pt-12"><meta httpEquiv="refresh" content={`0; url=${url}`} /><p>页面已移动。<a href={url}>前往新页面</a></p></div>;
}
