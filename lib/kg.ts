import { OFFICIAL } from './site';
import { Profile, entryYears, PUBLISHED } from './roadmap';
export type Mark = 'yes' | 'no' | 'na';
export interface Check { item: string; mark: Mark; why: string; quote: string }
export const Q = {
  who: '答疑 1：「小班：2022年9月1日至2023年8月31日期间出生且户籍所在地或家庭实际居住在海淀区的适龄儿童」',
  must: '答疑 7(7)：「不能，信息采集是幼儿园招生工作的第一步。」',
  order: '答疑 7(8)：「海淀区要求各幼儿园根据周边学位需求和本园具体情况，合理确定入园招生顺位，各园按照招生顺位依次录取，额满为止。」',
  main: '答疑 5：「“招生顺位”是幼儿园录取的主要依据（详见各幼儿园招生简章）。同等顺位条件下参考家长填写的入园意向顺序录取。」',
  early: '答疑 6：「报名时间与招生先后顺序没有关系。」',
  wish: '答疑 4：「填报2-5个入园意向（至少填报2个），入园意向需设定顺序。」',
  upload: '答疑 7(3)：「证件材料需原件扫描或拍照上传，确保清晰可辨，大小在1M以内。」',
  onsite: '答疑 7(4)：「网上信息审核通过后，幼儿园会进行现场材料审核。」',
  time: '答疑 7(1)：「系统开放时间：2026年6月1日-2026年6月15日」；7(5)：6月15日以后信息和报名园所不能再修改。',
  brief: '答疑 2(2)：「注册登录系统后，点击幼儿园名称可查看招生简章。」',
};
export const SRC = OFFICIAL.hdKgFaq;
export function check(p: Profile): { year: number; rows: Check[]; applies: boolean } {
  const e = entryYears(p); const Y = e.kg; const pub = Y === PUBLISHED;
  const rows: Check[] = [];
  const applies = p.district === 'haidian';
  rows.push({ item: '年龄在小班出生窗口内', mark: pub ? 'yes' : 'na',
    why: pub ? `${Y - 4}-09-01 至 ${Y - 3}-08-31 出生，孩子 ${p.birth} 出生，在窗口内。` : `孩子 ${p.birth} 出生，按 2026 年「前一年 9/1–当年 8/31」结构推算应在 ${Y} 年报小班（窗口 ${Y - 4}-09-01 至 ${Y - 3}-08-31）。${Y} 年窗口官方未发布，以当年答疑为准。`, quote: Q.who });
  let m: Mark, why: string;
  if (!applies) { m = 'na'; why = '目标区不是海淀，这条只按海淀原文判断；其他区请看该区当年公告。'; }
  else if (p.hukou === 'haidian') { m = 'yes'; why = '户籍在海淀，满足「户籍所在地在海淀」。'; }
  else if (p.housing === 'own' || p.housing === 'rent') { m = 'yes'; why = `户籍不在海淀，但家庭${p.housing === 'own' ? '有房' : '租房'}住在海淀，按原文属于「家庭实际居住在海淀」。用什么材料证明实际居住：官方未写明，看意向园简章。`; }
  else { m = 'na'; why = '户籍不在海淀、无房或借住：借住是否算「实际居住」，官方未写明。请打学前科 88487315 确认。'; }
  rows.push({ item: '户籍在海淀，或家庭实际住在海淀（二选一）', mark: m, why, quote: Q.who });
  if (p.hukou === 'nonBj') rows.push({ item: '非京户是否必须有居住证才能报名', mark: 'na', why: '区里的答疑没有把居住证写成报名门槛，官方未写明。但常见简章把「有效期内的北京市居住证 + 父母一方在京社保证明」列为非京户要带的材料，录取顺位也常排在京户之后。', quote: '答疑、名录、教育服务专题均未提居住证（核对 2026-10-12）。' });
  if (p.hukou === 'collective') rows.push({ item: '集体户口', mark: 'na', why: '集体户口怎么算「户籍所在地」，官方未写明。', quote: '答疑未提集体户口。' });
  rows.push({ item: `在 ${Y} 年报名窗口内完成网上信息采集`, mark: 'na', why: '这是必须做的一步，不是你现在能满足的条件。2026 年窗口是 6/1–6/15。', quote: Q.must });
  return { year: Y, rows, applies };
}
