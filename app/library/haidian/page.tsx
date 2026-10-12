import { Cite } from '@/components/ui';
import { OFFICIAL } from '@/lib/site';
export const metadata = { title: '海淀专章' };
const K = [
 ['北京市海淀区苏家坨镇幼儿园凤仪分园','公办（教育部门办）','苏家坨镇（地址见名录原文）','18510822619'],
 ['北京市海淀区科学城北区童心家园幼儿园','公办（教育部门办）','苏家坨镇（地址见名录原文）','56548393'],
 ['北京市海淀区苏家坨镇幼儿园','公办（教育部门办）','苏家坨镇苏三路一号','62420442 / 62420443'],
 ['北京市海淀区教科院台头未来实验小学附设幼儿班','公办（教育部门办）','苏家坨镇北安河路36号','62487416-623 等'],
 ['北京市海淀新区恩济幼儿园分园','公办（教育部门办）','苏家坨镇同泽园东里','57523191'],
 ['北京市海淀区中关村科学城北区柳林幼儿园','公办（单位办）','苏家坨镇柳林村河北三区62号','18518351205'],
 ['北京市海淀区中科幼教北安河岚山幼儿园','公办（单位办）','苏家坨镇北清路198号院北区8号楼','82612496 等'],
 ['北京市海淀区中科幼教北安河幼儿园','公办（单位办）','苏家坨镇安河家园五里北侧','82612496 等'],
];
const S = [
 ['北京市海淀区苏家坨中心小学','小学','苏家坨镇西小营村南环路2号'],['北京市海淀区北安河中心小学','小学','环谷园路2号'],
 ['北京市海淀区教科院台头未来实验小学','小学','聂各庄路13号'],['北京市海淀区翠湖小学','小学','白水洼村南'],
 ['北京市育英学校科学城学校','九年一贯制','苏三路与琪树路交叉口附近'],['北京十一中关村科学城学校','九年一贯制','苏家坨镇正林街安河家园九里二号楼北侧'],
 ['北京交通大学附属中学实验学校','九年一贯制','苏家坨镇西小营村'],
];
export default function Page() { return (<div className="space-y-6">
  <h1 className="text-3xl font-bold tracking-tight">海淀专章（苏家坨 / 科学城北区）</h1>
  <p className="bg-sunken p-3 rounded">只列公开可查的园校与官方要点；<strong>不排名、不写分数线、不承诺「买哪里稳上哪所」</strong>。官方未发布「小区→学校」对照表，划片以每年 6 月学区/校门《入学登记通知》为准。</p>
  <section><h2 className="text-2xl font-bold">幼儿园（2026 已核）</h2>
   <ul className="list-disc pl-6"><li>小班适龄：2022-09-01 至 2023-08-31 出生，且户籍在海淀或家庭实际居住在海淀</li><li>信息采集：2026-06-01 至 06-15，入口 ryfw.bjedu.cn → 海淀</li><li>填 2–5 个有序意向园；按各园「招生顺位」（录取先后规则）录取，报名早晚不影响</li><li>一个账号可添加多名本人子女（多孩家庭）</li><li>咨询：区教委学前科 88487315；温泉苏家坨学区 62456746</li></ul>
   <Cite href={OFFICIAL.hdRoster2026.href} label="海淀区《2026年幼儿园小班招生名录》" /></section>
  <section><h2 className="text-2xl font-bold">苏家坨镇公办园（2026 名录摘录）</h2>
   <div className="card prose-table overflow-x-auto"><table><thead><tr><th>园所</th><th>性质</th><th>地址</th><th>名录咨询电话</th></tr></thead><tbody>{K.map(k => <tr key={k[0]}>{k.map(c => <td key={c}>{c}</td>)}</tr>)}</tbody></table></div>
   <p className="mt-2">单位办园可能优先本单位职工子女——务必读当年招生简章的「招生顺位」。同镇民办（普惠）：宏远幼儿园；非普惠：稻香湖幼儿园（仅对照，非推荐）。</p></section>
  <section><h2 className="text-2xl font-bold">小学 / 初中（海淀 2026 已核）</h2>
   <ul className="list-disc pl-6"><li>年龄：满 6 周岁（2020-08-31 以前出生）</li><li>京户：海淀户籍 + 实际居住；或外区京户 + 海淀住宅类房产 + 实际居住</li><li>外区京户无房：连续单独承租并实际居住 3 年以上 + 租赁备案 + 海淀就业 3 年以上</li><li>非京户：居住证起始日、社保连续月数、住所材料按附件2（日期绑定 2026 学年）</li><li>「19.1.1」：2019-01-01 后取证的房产入学走电脑派位（多校划片，不固定学校）</li><li>「六年一学位」：一套房六年内只给一个学位，符合国家生育政策的适龄儿童除外</li><li>多孩同校：小学一至五年级，二孩可申请随大孩同校或相邻校（采集时勾选并提交大孩学籍号）</li><li>初中：登记入学 / 对口直升 / 寄宿 / 民办志愿派位，平台 qryjrx.bjedu.cn/hdxsc</li></ul>
   <Cite href={OFFICIAL.hdGov2026.href} label="海淀区 2026 义务教育入学实施意见" /><Cite href={OFFICIAL.hdFaq2026.href} label="海淀区 2026 政策解读" /></section>
  <section><h2 className="text-2xl font-bold">苏家坨周边公办中小学（名录级，不是划片表）</h2>
   <div className="card prose-table overflow-x-auto"><table><thead><tr><th>学校</th><th>层次</th><th>地址（名录）</th></tr></thead><tbody>{S.map(k => <tr key={k[0]}>{k.map(c => <td key={c}>{c}</td>)}</tr>)}</tbody></table></div>
   <Cite href="https://zyk.bjhd.gov.cn/sjkf/jyzy/202505/t20250509_4768788.shtml" label="《2024–2025 学年度海淀区义务教育学校名录》" /></section>
  <section><h2 className="text-2xl font-bold">家长行动清单</h2><ol className="list-decimal pl-6"><li>现在：确认房屋权属日期是否落入「19.1.1」；非京户尽早办居住证、连续缴社保</li><li>每年 5 月：看 yjrx.bjedu.cn / ryfw.bjedu.cn 新学年文件</li><li>入园年 5 月底–6 月：读小班名录 + 意向园简章</li><li>幼升小当年 6 月：到学区或小学看《入学登记通知》，不要用往年自媒体划片图</li><li>多孩：保留大孩学籍信息，备二孩「同校就读申请」</li></ol></section>
</div>); }
