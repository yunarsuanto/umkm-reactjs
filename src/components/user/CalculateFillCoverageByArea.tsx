import { Fill } from '@/components/user/ConvertToFill'

export function CalculateFillCoverageByArea(
  fillPoints: Fill[],
  userPoints: Fill[],
  brushRadius: number = 6
): number {
  if (fillPoints.length === 0 || userPoints.length === 0) return 0;

  let hitCount = 0;

  for (const fp of fillPoints) {
    const hit = userPoints.some(u => Math.hypot(u.x - fp.x, u.y - fp.y) <= brushRadius);
    if (hit) hitCount++;
  }

  return (hitCount / fillPoints.length) * 100;
}