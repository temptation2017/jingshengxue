export const RETRIEVED = '2026-10-12';
export const OFFICIAL = {
  ryfw: { label: '北京市学前教育入园服务平台', href: 'https://ryfw.bjedu.cn' },
  yjrx: { label: '北京市义务教育入学服务平台', href: 'https://yjrx.bjedu.cn/' },
  hdService: { label: '海淀区教育服务专题', href: 'https://zyk.bjhd.gov.cn/ztzl/jyfw/' },
  bjCompulsory2026: { label: '北京市教委 2026 义务教育入学工作意见（京教基二〔2026〕7号）', href: 'https://www.beijing.gov.cn/zhengce/zhengcefagui/202604/t20260417_4589381.html' },
  hdKgFaq: { label: '海淀区教委《关于2026年海淀区幼儿园适龄儿童信息采集常见问题答疑》', href: 'https://www.bjhdedu.cn/gongkai/tzgg/202605/t20260529_92765.html' },
  hdKgManual: { label: '海淀区学前教育综合管理服务平台操作手册', href: 'https://xqsletcj.hdjky.org.cn/kindergarten/mobile/czsc' },
  hdRoster2026: { label: '海淀区 2026 幼儿园小班招生名录', href: 'https://www.bjhdedu.cn/gongkai/tzgg/202605/t20260529_92769.html' },
  hdGov2026: { label: '海淀区 2026 义务教育入学实施意见', href: 'https://zyk.bjhd.gov.cn/zwdt/szgb/wqgb/202602/202607/t20260724_4823196.shtml' },
  hdFaq2026: { label: '海淀区 2026 义务教育入学政策解读', href: 'https://zyk.bjhd.gov.cn/zwdt/szgb/zcjd/202607/t20260724_4823209.shtml' },
  senior2026: { label: '北京市教委 2026 中招工作意见（京教计〔2026〕5号）', href: 'https://www.beijing.gov.cn/zhengce/zhengcefagui/202603/t20260330_4569138.html' },
  bjeea: { label: '北京教育考试院', href: 'https://www.bjeea.cn/' },
  gaokao2026: { label: '北京市 2026 普通高校招生工作规定', href: 'https://www.bjeea.cn/html/gkgz/tzgg/2026/0505/88114.html' },
  migrant2027: { label: '2027 随迁子女在京参加高职招生考试报名通知', href: 'https://www.bjeea.cn/html/gkgz/tzgg/2026/0922/88355.html' },
  hdJunior: { label: '海淀小升初平台', href: 'https://qryjrx.bjedu.cn/hdxsc' },
  hdDirectory: { label: '2024–2025 学年度海淀区义务教育学校名录', href: 'https://zyk.bjhd.gov.cn/sjkf/jyzy/202505/t20250509_4768788.shtml' },
};
export type Src = { label: string; href: string };
export const STAGES: [string, string][] = [
  ['kindergarten', '幼儿园'], ['primary', '小学（幼升小）'], ['junior', '初中（小升初）'], ['senior', '高中 / 中职（中考）'], ['university', '大学（在京高考资格）'],
];
