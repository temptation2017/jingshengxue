import { StageKey, Identity } from './content';
import { entryYears } from './years';
export function nextNode(stage: StageKey, birth: string, identity: Identity | '') {
  if (!birth) return null;
  const Y = entryYears(birth.slice(0, 7))[stage];
  const map: Record<StageKey, [number, number, string]> = {
    kindergarten: [Y, 6, '小班报名（信息采集）'], primary: [Y, 5, '入学信息采集'], junior: [Y, 5, '填报志愿'], senior: [Y, 6, '中考'],
    gaokao: [Y - 1, 10, identity === 'nonBj' ? '随迁子女高职报名' : '高考报名'],
  };
  const [y, m, label] = map[stage]; const now = new Date(); const left = y * 12 + m - (now.getFullYear() * 12 + now.getMonth() + 1);
  return { Y, y, m, label, left, estimated: Y > 2026 };
}
