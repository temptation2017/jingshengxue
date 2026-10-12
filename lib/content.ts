// 唯一内容源：学段 × 4 个问题 × 身份 × 区。只收录已核实材料（research/ 下文件），不编造。
export type Identity = 'local' | 'localNoHouse' | 'nonBj' | 'other';
export type District = 'city' | 'haidian' | 'otherDistrict';
export type Status = 'official' | 'not_stated' | 'pending';
export type QKey = 'eligibility' | 'allocation' | 'materials' | 'when';
export type StageKey = 'kindergarten' | 'primary' | 'junior' | 'senior' | 'gaokao';

export const IDENTITIES: [Identity, string, string][] = [
  ['local', '京户 · 本区有房', '北京户口，在目标区有自有住房'],
  ['localNoHouse', '京户 · 无房或人户分离', '北京户口，但在目标区无房，或户口与住址不在一处'],
  ['nonBj', '非京户（居住证）', '外地户口，在京持居住证'],
  ['other', '其他', '集体户口、军人子女、按本市户籍对待等'],
];
export const DISTRICTS: [District, string][] = [['city', '全市通则'], ['haidian', '海淀区'], ['otherDistrict', '其他区']];
export const QUESTIONS: [QKey, string][] = [['eligibility', '能不能报'], ['allocation', '怎么分'], ['materials', '带什么'], ['when', '何时何地办']];

export interface Source { id: string; title: string; issuer: string; year: string; url: string; stage: StageKey[]; official: boolean }
export const SOURCES: Source[] = [
  { id: 'bjCompulsory', title: '关于2026年义务教育阶段入学工作的意见（京教基二〔2026〕7号）', issuer: '北京市教育委员会', year: '2026', url: 'https://www.beijing.gov.cn/zhengce/zhengcefagui/202604/t20260417_4589381.html', stage: ['primary', 'junior'], official: true },
  { id: 'hdGov', title: '海淀区关于2026年义务教育阶段入学工作的实施意见', issuer: '北京市海淀区人民政府', year: '2026', url: 'https://zyk.bjhd.gov.cn/zwdt/szgb/wqgb/202602/202607/t20260724_4823196.shtml', stage: ['primary', 'junior'], official: true },
  { id: 'hdFaq', title: '关于2026年义务教育阶段入学工作的实施意见政策解读', issuer: '北京市海淀区人民政府', year: '2026', url: 'https://zyk.bjhd.gov.cn/zwdt/szgb/zcjd/202607/t20260724_4823209.shtml', stage: ['primary', 'junior'], official: true },
  { id: 'yjrx', title: '北京市义务教育入学服务平台', issuer: '北京市教育委员会', year: '2026', url: 'https://yjrx.bjedu.cn/', stage: ['primary', 'junior'], official: true },
  { id: 'hdDirectory', title: '2024–2025 学年度海淀区义务教育学校名录', issuer: '北京市海淀区人民政府', year: '2024–2025', url: 'https://zyk.bjhd.gov.cn/sjkf/jyzy/202505/t20250509_4768788.shtml', stage: ['primary', 'junior'], official: true },
  { id: 'hdJunior', title: '海淀区小升初服务平台', issuer: '北京市海淀区教育委员会', year: '2026', url: 'https://qryjrx.bjedu.cn/hdxsc', stage: ['junior'], official: true },
  { id: 'hdKgFaq', title: '关于2026年海淀区幼儿园适龄儿童信息采集常见问题答疑', issuer: '北京市海淀区教育委员会', year: '2026', url: 'https://www.bjhdedu.cn/gongkai/tzgg/202605/t20260529_92765.html', stage: ['kindergarten'], official: true },
  { id: 'hdKgRoster', title: '2026年海淀区幼儿园小班招生名录', issuer: '北京市海淀区教育委员会', year: '2026', url: 'https://www.bjhdedu.cn/gongkai/tzgg/202605/t20260529_92769.html', stage: ['kindergarten'], official: true },
  { id: 'hdService', title: '海淀区教育服务专题（幼儿园 / 幼升小 / 小升初）', issuer: '北京市海淀区人民政府', year: '2026', url: 'https://zyk.bjhd.gov.cn/ztzl/jyfw/', stage: ['kindergarten', 'primary', 'junior'], official: true },
  { id: 'bjKgNotices', title: '本月开始报名！北京各区发布幼儿园招生工作公告', issuer: '首都之窗（北京市人民政府门户网站）', year: '2026', url: 'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202606/t20260604_4685525.html', stage: ['kindergarten'], official: true },
  { id: 'ryfw', title: '北京市适龄幼儿入园服务平台', issuer: '北京市教育委员会', year: '2026', url: 'https://ryfw.bjedu.cn', stage: ['kindergarten'], official: true },
  { id: 'senior', title: '关于做好2026年高级中等学校考试招生工作的意见（京教计〔2026〕5号）', issuer: '北京市教育委员会', year: '2026', url: 'https://www.beijing.gov.cn/zhengce/zhengcefagui/202603/t20260330_4569138.html', stage: ['senior'], official: true },
  { id: 'gaokao', title: '北京市2026年普通高等学校招生工作规定', issuer: '北京教育考试院', year: '2026', url: 'https://www.bjeea.cn/html/gkgz/tzgg/2026/0505/88114.html', stage: ['gaokao'], official: true },
  { id: 'migrant2027', title: '关于做好2027年进城务工人员随迁子女在京参加高等职业学校招生考试报名工作的通知', issuer: '北京教育考试院', year: '2027', url: 'https://www.bjeea.cn/html/gkgz/tzgg/2026/0922/88355.html', stage: ['gaokao'], official: true },
  { id: 'migrant2026', title: '关于做好2026年进城务工人员随迁子女在京参加高等职业学校招生考试报名工作的通知', issuer: '北京教育考试院', year: '2026', url: 'https://www.bjeea.cn/html/gkgz/tzgg/2025/0925/87302.html', stage: ['gaokao'], official: true },
  { id: 'bjeea', title: '北京教育考试院', issuer: '北京教育考试院', year: '—', url: 'https://www.bjeea.cn/', stage: ['senior', 'gaokao'], official: true },
];
export const src = (id: string) => SOURCES.find(s => s.id === id)!;

export interface Item { text: string; status: Status; source?: string; quote?: string; who?: Identity[]; district?: District /* 默认 city */; material?: boolean; date?: boolean; check?: 'age' | 'live' | 'permit' | 'insurance' }
export interface QBlock { conclusion: Partial<Record<District, string>>; items: Item[] }
export interface Stage { key: StageKey; name: string; short: string; age: string; summary: string; schoolYear: string; detailDistricts: District[]; entries: string[]; q: Record<QKey, QBlock>; compare?: Partial<Record<Identity, string>>; terms: [string, string][] }

const H = 'haidian' as const;
export const STAGES: Stage[] = [
 { key: 'kindergarten', name: '幼儿园', short: '幼儿园', age: '约 3 岁', schoolYear: '2026 入园季（2027 未发布）', detailDistricts: ['haidian'], entries: ['ryfw', 'hdKgFaq'],
   summary: '在网上报名，填几所想去的幼儿园；每所园按自己定的「招生顺位」（录取先后规则）录取。不划片，不考试。',
   compare: { local: '海淀：户籍在海淀，可报名', localNoHouse: '海淀：户籍在海淀或实际住在海淀，二选一即可报名', nonBj: '海淀：实际住在海淀即在报名范围；是否需要居住证，官方未写明', other: '官方未写明' },
   q: {
    eligibility: { conclusion: { city: '报名对象由各区自己规定，全市统一从入园服务平台进入。', haidian: '两条门槛：年龄在出生窗口内，且户籍在海淀或家庭实际住在海淀（二选一）。' }, items: [
      { text: '全市入口统一：北京市适龄幼儿入园服务平台，各区入口陆续开放，各区自行发布招生公告。', status: 'official', source: 'bjKgNotices', quote: '6月1日起，北京市适龄幼儿入园服务平台（https://ryfw.bjedu.cn）各区入口将陆续开放' },
      { text: '全市统一的入园年龄与对象文件', status: 'not_stated', source: 'bjKgNotices', quote: '本站未检索到 2026 年市级统一入园文件；首都之窗汇总为各区公告。' },
      { text: '年龄：小班为 2022 年 9 月 1 日至 2023 年 8 月 31 日出生（2026 年）。', check: 'age', status: 'official', district: H, source: 'hdKgFaq', quote: '小班：2022年9月1日至2023年8月31日期间出生且户籍所在地或家庭实际居住在海淀区的适龄儿童' },
      { text: '地域：户籍在海淀，或家庭实际住在海淀，满足一条即可。', check: 'live', status: 'official', district: H, source: 'hdKgFaq', quote: '户籍所在地或家庭实际居住在海淀区的适龄儿童' },
      { text: '必须先完成网上信息采集（网上报名），否则不能入园。', status: 'official', district: H, source: 'hdKgFaq', quote: '不能，信息采集是幼儿园招生工作的第一步。' },
      { text: '托班（小班前一年的班）：看各园招生简章。', status: 'official', district: H, source: 'hdKgFaq', quote: '托班：详见已开设托班幼儿园招生简章' },
      { text: '非京户报名是否必须持居住证', status: 'not_stated', district: H, who: ['nonBj'], source: 'hdKgFaq', quote: '答疑、名录、教育服务专题均未把居住证列为报名条件（核对 2026-10-12）。' },
      { text: '用什么材料证明「家庭实际居住」、借住是否算', status: 'not_stated', district: H, who: ['localNoHouse', 'nonBj'], source: 'hdKgFaq' },
      { text: '集体户口、军人子女等如何认定', status: 'not_stated', district: H, who: ['other'], source: 'hdKgFaq' },
      { text: '2027 年出生窗口', status: 'pending', district: H, source: 'hdKgFaq', quote: '2027 年答疑尚未发布。' },
    ] },
    allocation: { conclusion: { city: '各区、各园规则不同，以所在区公告和园所招生简章为准。', haidian: '没有全区统一的录取顺序：每所园自己定「招生顺位」，按顺位录满为止。' }, items: [
      { text: '每所园根据周边学位需求自定招生顺位，按顺位依次录取，额满为止。', status: 'official', district: H, source: 'hdKgFaq', quote: '海淀区要求各幼儿园根据周边学位需求和本园具体情况，合理确定入园招生顺位，各园按照招生顺位依次录取，额满为止。' },
      { text: '同一顺位里，才参考家长填的志愿先后。', status: 'official', district: H, source: 'hdKgFaq', quote: '同等顺位条件下参考家长填写的入园意向顺序录取。' },
      { text: '报名早晚不影响录取先后。', status: 'official', district: H, source: 'hdKgFaq', quote: '报名时间与招生先后顺序没有关系。' },
      { text: '每人填 2–5 个志愿，需排顺序。', status: 'official', district: H, source: 'hdKgFaq', quote: '填报2-5个入园意向（至少填报2个），入园意向需设定顺序。' },
      { text: '每所园的顺位：登录海淀学前平台后点园名看招生简章，或打名录上的咨询电话。', status: 'official', district: H, source: 'hdKgFaq', quote: '注册登录系统后，点击幼儿园名称可查看招生简章。' },
      { text: '没录上如何补录、调剂', status: 'not_stated', district: H, source: 'hdKgFaq', quote: '答疑只写「额满为止」；平台可查询「未录取」状态。' },
    ] },
    materials: { conclusion: { city: '材料以所在区和园所招生简章为准。', haidian: '官方只规定了上传格式；具体清单以意向园招生简章为准。' }, items: [
      { text: '证件原件扫描或拍照上传，清晰，每张 1M 以内。', status: 'official', district: H, source: 'hdKgFaq', quote: '证件材料需原件扫描或拍照上传，确保清晰可辨，大小在1M以内。', material: true },
      { text: '网上审核通过后，幼儿园进行现场材料审核。', status: 'official', district: H, source: 'hdKgFaq', quote: '网上信息审核通过后，幼儿园会进行现场材料审核。' },
      { text: '全区统一的材料清单', status: 'not_stated', district: H, source: 'hdKgFaq' },
    ] },
    when: { conclusion: { city: '多数区在每年 6 月报名，日期各区不同。', haidian: '2026 年为 6 月 1 日至 15 日，15 日后不能再改信息和志愿。' }, items: [
      { text: '2026 年各区报名窗口不同（如东城 6/8–17），以各区公告为准。', status: 'official', source: 'bjKgNotices', date: true },
      { text: '报名：2026 年 6 月 1 日至 6 月 15 日。', status: 'official', district: H, source: 'hdKgFaq', quote: '系统开放时间：2026年6月1日-2026年6月15日', date: true },
      { text: '6 月 15 日以后，信息和报名园所不能再修改。', status: 'official', district: H, source: 'hdKgFaq', date: true },
      { text: '入口：ryfw.bjedu.cn → 海淀 →「我要报名」，进入海淀区学前教育综合管理服务平台。一个账号可添加多名本人子女。', status: 'official', district: H, source: 'hdKgFaq' },
      { text: '咨询：区教委学前科 88487315；各学区电话见答疑。', status: 'official', district: H, source: 'hdKgFaq' },
      { text: '2027 年报名日期', status: 'pending', district: H, source: 'hdKgFaq', date: true },
    ] } },
   terms: [['信息采集', '网上报名、登记孩子信息'], ['招生顺位', '每所园自定的录取先后规则'], ['托班', '小班之前、约 2–3 岁的班'], ['普惠园', '收费受政府指导的幼儿园，含公办和部分民办']] },

 { key: 'primary', name: '小学', short: '小学', age: '满 6 周岁', schoolYear: '2026 入学（2027 未发布）', detailDistricts: ['haidian'], entries: ['yjrx', 'bjCompulsory', 'hdFaq'],
   summary: '免试就近入学：按户籍和住房对应学校「登记入学」，部分情况「电脑派位」（电脑随机分配学校）。不考试。',
   compare: { local: '免试就近；海淀需户籍或房产在海淀并实际居住', localNoHouse: '海淀：外区京户无房需租住备案满 3 年 + 海淀就业满 3 年', nonBj: '需居住证、就业、住所、户口簿，到街镇联审', other: '台胞、华侨、博士后、工作居住证等「按本市户籍对待」' },
   q: {
    eligibility: { conclusion: { city: '年满 6 周岁（入学当年往前数 6 年的 8 月 31 日以前出生）即须参加信息采集；非京户还要通过街镇材料审核。', haidian: '年满 6 周岁，并按身份满足户籍 / 房产 / 居住证等条件。' }, items: [
      { text: '年龄：2026 年为 2020 年 8 月 31 日以前出生，满 6 周岁。', check: 'age', status: 'official', source: 'bjCompulsory', quote: '本市户籍适龄儿童凡年满6周岁（2020年8月31日以前出生）均须参加学龄人口信息采集' },
      { text: '京户：免试就近入学。', status: 'official', who: ['local', 'localNoHouse'], source: 'bjCompulsory' },
      { text: '京户无房、在非户籍区入学：按有关规定办理（细则在区）。', status: 'official', who: ['localNoHouse'], source: 'bjCompulsory', quote: '本市户籍无房家庭适龄子女在非户籍所在区入学按有关规定办理' },
      { text: '非京户：父母持在京务工就业材料、实际住所材料、全家户口簿、北京市居住证，到居住地街道或乡镇审核。', status: 'official', who: ['nonBj'], source: 'bjCompulsory', quote: '父母持本人在京务工就业材料、在京实际住所居住材料、全家户口簿、北京市居住证，到居住地所在街道办事处或乡镇人民政府参加入学资格审核' },
      { text: '按本市户籍对待：台胞子女、华侨子女、在京博士后子女、正在办随军的现役军人子女、父母一方京户或持《北京市工作居住证》。', status: 'official', who: ['other'], source: 'hdFaq' },
      { text: '海淀户籍 + 实际居住；或外区京户 + 监护人在海淀有合法住宅类房产 + 实际居住。', check: 'live', status: 'official', district: H, who: ['local'], source: 'hdGov' },
      { text: '外区京户无房：在海淀连续单独承租并实际居住 3 年以上、租赁平台备案，且在海淀稳定就业 3 年以上。', status: 'official', district: H, who: ['localNoHouse'], source: 'hdGov' },
      { text: '居住证：监护人一方持住址为海淀的北京市居住证，有效期起始日早于 2025 年 9 月 1 日（不含当日），地址与住所材料一致。', check: 'permit', status: 'official', district: H, who: ['nonBj'], source: 'hdFaq', quote: '适龄儿童法定监护人一方持有居住地址为海淀区的北京市居住证，且证件在有效期内[有效期起始日须为2025年9月1日前（不含当日）]。' },
      { text: '社保：2025 年 9 月 1 日前参保，2025 年 9 月至 2026 年 5 月按月连续在海淀缴纳。', check: 'insurance', status: 'official', district: H, who: ['nonBj'], source: 'hdFaq' },
      { text: '随其他亲属（非父母）来京的非京户儿童，不能申请。', status: 'official', district: H, who: ['nonBj'], source: 'hdFaq', quote: '如果非本市户籍适龄儿童随其他亲属来京，是否可以申请在海淀区入学？不可以。' },
      { text: '2027 年各项日期', status: 'pending', district: H, source: 'hdFaq' },
    ] },
    allocation: { conclusion: { city: '以「登记入学」为主，单校划片（一个片区对应一所学校）与多校划片（对应几所、再派位）结合。', haidian: '多数按登记入学；2019 年 1 月 1 日后取得产权证的房产入学走电脑派位。' }, items: [
      { text: '免试就近、登记入学为主，单校划片与多校划片结合；严禁考试选拔。', status: 'official', source: 'bjCompulsory' },
      { text: '「19.1.1」：2019 年 1 月 1 日以后取得不动产权证的房产用于入学，走电脑派位（多校划片）。', status: 'official', district: H, who: ['local'], source: 'hdFaq' },
      { text: '「六年一学位」：同一房产原则上六年内只提供一个学位，符合国家生育政策的适龄儿童除外。', status: 'official', district: H, who: ['local'], source: 'hdGov' },
      { text: '民办小学、公办中学小学部、新建小学：报名后电脑派位。', status: 'official', district: H, source: 'hdService' },
      { text: '多孩：小学一至五年级，二孩可申请随大孩同校或相邻校。', status: 'official', district: H, source: 'hdFaq' },
      { text: '具体对应哪所学校：以当年学区 / 学校张贴的《入学登记通知》为准。', status: 'official', district: H, source: 'hdFaq' },
      { text: '官方「小区 → 学校」固定对照表', status: 'not_stated', district: H, source: 'hdDirectory', quote: '学校名录只列学校与地址，不是划片表。' },
    ] },
    materials: { conclusion: { city: '京户以户口簿、房产证明为主；非京户另需就业、住所、居住证材料。', haidian: '按身份准备；登记当天带《信息采集表》。' }, items: [
      { text: '全家户口簿', status: 'official', source: 'bjCompulsory', material: true },
      { text: '房产证明（不动产权证等）', status: 'official', district: H, who: ['local'], source: 'hdGov', material: true },
      { text: '《信息采集表》（平台审核后打印）', status: 'official', district: H, source: 'hdFaq', material: true },
      { text: '在京务工就业材料', status: 'official', who: ['nonBj'], source: 'bjCompulsory', material: true },
      { text: '在京实际住所居住材料', status: 'official', who: ['nonBj', 'localNoHouse'], source: 'bjCompulsory', material: true },
      { text: '北京市居住证', status: 'official', who: ['nonBj'], source: 'bjCompulsory', material: true },
      { text: '社保缴费记录', status: 'official', district: H, who: ['nonBj'], source: 'hdFaq', material: true },
      { text: '登记当日的完整材料清单以学校通知为准', status: 'official', district: H, source: 'hdGov' },
    ] },
    when: { conclusion: { city: '每年 4 月前后发布市级意见，5 月信息采集，6 月登记。', haidian: '2026 年：5 月采集与联审，6 月 13–14 日登记，7 月上旬发通知书。' }, items: [
      { text: '5 月 6–31 日：京户信息采集；5 月 6–15 日：非京户注册。', status: 'official', district: H, source: 'hdService', date: true },
      { text: '5 月 18–29 日：街镇联合审核非京户材料。', status: 'official', district: H, who: ['nonBj'], source: 'hdService', date: true },
      { text: '6 月 5–6 日：民办、新建校等报名；6 月 11 日前电脑派位。', status: 'official', district: H, source: 'hdService', date: true },
      { text: '6 月 13–14 日：到学校登记，审核材料。', status: 'official', district: H, source: 'hdService', date: true },
      { text: '6 月 22–23 日「19.1.1」填志愿；6 月 30 日派位。', status: 'official', district: H, who: ['local'], source: 'hdService', date: true },
      { text: '7 月上旬：发放入学通知书。', status: 'official', district: H, source: 'hdService', date: true },
      { text: '入口：北京市义务教育入学服务平台（京通登录）。', status: 'official', source: 'yjrx' },
      { text: '2027 年日程', status: 'pending', source: 'bjCompulsory', date: true },
    ] } },
   terms: [['登记入学', '按户籍和住址对应学校，到校登记即入学'], ['划片', '按住址划定对应学校的范围'], ['电脑派位', '电脑随机分配到片区内某所学校'], ['19.1.1', '海淀规定：2019 年 1 月 1 日后取得产权证的房产入学走派位'], ['六年一学位', '同一房产六年内原则上只给一个学位'], ['联审', '非京户到居住地街镇集中审核材料']] },

 { key: 'junior', name: '初中', short: '初中', age: '小学毕业', schoolYear: '2026 入学', detailDistricts: ['haidian'], entries: ['yjrx', 'hdJunior'],
   summary: '按学籍和户籍 / 房产类别，通过登记入学、对口直升或电脑派位进入初中。不考试。',
   q: {
    eligibility: { conclusion: { city: '完成小学教育即可；具体资格由区里规定。', haidian: '按学籍、户籍、房产分四类，非京户学籍学生需网上联审。' }, items: [
      { text: '各区按市级框架制定细则（「区级为主」）。', status: 'official', source: 'bjCompulsory' },
      { text: '海淀学籍的京户，及审核通过的非京户小学毕业生。', status: 'official', district: H, source: 'hdGov' },
      { text: '学籍不在海淀，但全家户籍在海淀，或监护人在海淀有合法住宅类房产并实际居住的京户。', status: 'official', district: H, who: ['local', 'localNoHouse'], source: 'hdGov' },
      { text: '按本市户籍对待的类别。', status: 'official', district: H, who: ['other'], source: 'hdGov' },
      { text: '非京户：学籍学生需街镇联审。', status: 'official', district: H, who: ['nonBj'], source: 'hdGov' },
    ] },
    allocation: { conclusion: { city: '登记入学、对口直升、电脑派位结合，比例每区每年不同。', haidian: '先填志愿一批录取，剩余按小学所在片区电脑派位。' }, items: [
      { text: '九年一贯制直升；按比例对口直升；公办登记入学；其余电脑派位（原则上以就读小学的招生区域为界）。', status: 'official', district: H, source: 'hdGov' },
      { text: '志愿可混合公办登记、对口直升、寄宿、民办，共 1–10 个。', status: 'official', district: H, source: 'hdFaq' },
      { text: '多胞胎可申请绑定同校。', status: 'official', district: H, source: 'hdFaq' },
      { text: '各校对口比例、登记区域', status: 'pending', district: H, source: 'hdGov', quote: '每年随区文件公布，本站未逐校收录。' },
    ] },
    materials: { conclusion: { city: '待收录。', haidian: '海淀学籍学生以平台办理为主；外区、外省回海淀按通知办理。' }, items: [
      { text: '海淀学籍学生在平台办理；外区 / 外省市回海淀按招考中心通知准备材料。', status: 'official', district: H, source: 'hdFaq' },
      { text: '具体材料清单', status: 'pending', source: 'hdFaq' },
    ] },
    when: { conclusion: { city: '每年 5–7 月。', haidian: '2026 年：5 月填志愿，6 月一批录取，7 月 2 日出派位结果。' }, items: [
      { text: '5 月 6–9 日回区采集；5 月 8–14 日跨区受理。', status: 'official', district: H, source: 'hdFaq', date: true },
      { text: '5 月 26–29 日填志愿；6 月 4 日一批录取。', status: 'official', district: H, source: 'hdFaq', date: true },
      { text: '6 月 24–26 日派位志愿；7 月 2 日派位结果；7 月上旬通知书。', status: 'official', district: H, source: 'hdFaq', date: true },
      { text: '入口：海淀区小升初服务平台。', status: 'official', district: H, source: 'hdJunior' },
    ] } },
   terms: [['九年一贯制', '小学和初中在同一所学校，可直升'], ['对口直升', '小学按比例直升指定初中'], ['学籍', '学生在教育系统里的在读档案']] },

 { key: 'senior', name: '高中 / 中职', short: '高中', age: '初中毕业', schoolYear: '2026 中考', detailDistricts: [], entries: ['senior', 'bjeea'],
   summary: '6 月参加中考（初中学业水平考试），考后知道分数再填志愿。非京户随迁子女在京可报考中等职业学校。',
   compare: { local: '应届初中毕业生正常参加中考', localNoHouse: '同京户，中考以学籍为主', nonBj: '在京可报考中职；条件以当年考试院通知为准', other: '待收录' },
   q: {
    eligibility: { conclusion: { city: '对象是初中毕业生；非京户随迁子女在京只能报考中职，需满足住所、职业、社保等条件。' }, items: [
      { text: '应届初中毕业生（及政策允许的往届生）参加中考。', status: 'official', source: 'senior' },
      { text: '随迁子女报考中职：合法稳定住所、合法稳定职业满 3 年、连续社保满 3 年等（按京政办发〔2012〕62号框架）。', status: 'official', who: ['nonBj'], source: 'senior' },
      { text: '随迁子女报考中职的精确月份窗口', status: 'pending', who: ['nonBj'], source: 'bjeea', quote: '以当年考试院通知为准。' },
    ] },
    allocation: { conclusion: { city: '按考试分数：提前招生 → 指标分配（名额分到各初中）→ 统一招生。' }, items: [
      { text: '考后知分填报：提前招生 → 指标分配 → 统一招生；未完成计划征集志愿。', status: 'official', source: 'senior' },
      { text: '优质高中不少于 50% 计划分配到初中校；严格控制普高跨区招生。', status: 'official', source: 'senior' },
      { text: '总分 510：语数外各 100，道法 80，物理 80，体育 50（2026）。', status: 'official', source: 'senior' },
    ] },
    materials: { conclusion: { city: '待收录：按学籍学校和当年通知准备。' }, items: [
      { text: '材料清单', status: 'pending', source: 'bjeea' },
    ] },
    when: { conclusion: { city: '2026 年 6 月 24–25 日文化课考试，7 月填报与录取。' }, items: [
      { text: '2026 年 6 月 24–25 日文化课考试。', status: 'official', source: 'senior', date: true },
      { text: '志愿填报与录取一般在 7 月，以考试院当年日程为准。', status: 'pending', source: 'bjeea', date: true },
    ] } },
   terms: [['中考', '初中学业水平考试'], ['指标分配', '优质高中把部分名额直接分给各初中'], ['中职', '中等职业学校']] },

 { key: 'gaokao', name: '高考', short: '高考', age: '高中毕业', schoolYear: '2026 高考 / 2027 随迁高职报名', detailDistricts: [], entries: ['bjeea', 'migrant2027'],
   summary: '北京正式户口可报名普通高考；非京户随迁子女只能报考高职（高等职业学校），且需同时满足五项条件。',
   compare: { local: '有北京正式户口，可报名普通高考', localNoHouse: '有北京正式户口，可报名普通高考', nonBj: '只能报高职；五项条件需同时满足', other: '持永居证外国人等另有规定；集体户口待收录' },
   q: {
    eligibility: { conclusion: { city: '看户口：北京正式户口报普通高考；随迁子女只能报高职。' }, items: [
      { text: '具有北京市正式户口，可报名普通高考。', status: 'official', who: ['local', 'localNoHouse'], source: 'gaokao' },
      { text: '随迁子女只能参加高等职业学校招生考试，不能报普通本科高考。', status: 'official', who: ['nonBj'], source: 'gaokao' },
      { text: '随迁高职五项须同时满足（2027）：有效居住证类证件；合法稳定住所；合法稳定职业满 6 年；养老或医保连续满 6 年（2021 年 9 月至 2026 年 8 月，不含补缴）；孩子有本市学籍且在京连续读完高中阶段 3 年。', status: 'official', who: ['nonBj'], source: 'migrant2027' },
      { text: '集体户口的报考限制（除体育 / 艺术中专外）', status: 'pending', who: ['other'], source: 'gaokao' },
    ] },
    allocation: { conclusion: { city: '京籍：统一高考加学业水平等级考；随迁：仅高职类考试与录取。' }, items: [
      { text: '京籍考生参加统一高考与等级考，按招生工作规定录取。', status: 'official', who: ['local', 'localNoHouse'], source: 'gaokao' },
      { text: '随迁子女仅参加高职类考试与录取。', status: 'official', who: ['nonBj'], source: 'migrant2027' },
    ] },
    materials: { conclusion: { city: '随迁子女需证明五项条件；京籍按学籍校安排。' }, items: [
      { text: '身份证、亲子关系证明', status: 'official', who: ['nonBj'], source: 'migrant2027', material: true },
      { text: '居住证类证件', status: 'official', who: ['nonBj'], source: 'migrant2027', material: true },
      { text: '社保缴费记录（连续 6 年）', status: 'official', who: ['nonBj'], source: 'migrant2027', material: true },
      { text: '学籍 / 毕业证明', status: 'official', who: ['nonBj'], source: 'migrant2027', material: true },
      { text: '京籍考生材料清单', status: 'pending', who: ['local', 'localNoHouse'], source: 'gaokao' },
    ] },
    when: { conclusion: { city: '报名在高考前一年的 10–11 月。' }, items: [
      { text: '2027 随迁高职：2026 年 10 月 9–10 日申请；11 月 1 日前出审核结果；11 月 1–4 日填报缴费；11 月 11 日前现场确认。', status: 'official', who: ['nonBj'], source: 'migrant2027', date: true },
      { text: '普通高考报名一般在前一年 10–11 月，以当年通知为准。', status: 'pending', who: ['local', 'localNoHouse'], source: 'bjeea', date: true },
    ] } },
   terms: [['随迁子女', '跟随在京工作的父母生活的外地户口孩子'], ['高职', '高等职业学校（大专层次）'], ['等级考', '高中学业水平等级性考试']] },
];
export const stageByKey = (k: string) => STAGES.find(s => s.key === k)!;
export const RETRIEVED = '2026-10-12';
export const CHANGELOG: [string, string][] = [
  ['2026-10-12', 'v3 改版：全站统一为「能不能报 / 怎么分 / 带什么 / 何时何地办」四问；新增身份与区筛选；海淀内容并入学段页。'],
  ['2026-10-12', '重新核对海淀幼儿园入园答疑原文，「门槛」与「顺位」分开表述。'],
  ['2026-10-12', '首次上线。'],
];
