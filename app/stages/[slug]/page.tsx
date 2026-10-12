import Redirect from '@/components/Redirect';
const M: Record<string, string> = { kindergarten: 'kindergarten', primary: 'primary', junior: 'junior', senior: 'senior', university: 'gaokao' };
export const metadata = { title: '页面已移动', robots: { index: false } };
export function generateStaticParams() { return Object.keys(M).map(slug => ({ slug })); }
export default function P({ params }: { params: { slug: string } }) { return <Redirect to={`/stage/${M[params.slug]}/`} />; }
