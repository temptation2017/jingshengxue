import Redirect from '@/components/Redirect'; import { STAGES } from '@/lib/site';
export const metadata = { title: '页面已搬家', robots: { index: false } };
export function generateStaticParams() { return STAGES.map(([slug]) => ({ slug })); }
export default function P({ params }: { params: { slug: string } }) { return <Redirect to={`/library/stages/${params.slug}/`} />; }
