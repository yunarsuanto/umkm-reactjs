// src/utils/calculateCoverage.ts
import { Point } from "./ConvertToPoint";

export function CalculateCoverage(
  outline: Point[],
  userPoints: Point[],
  tolerance = 10
): number {
  let covered = 0;

  for (const o of outline) {
    const hit = userPoints.some(
      u => Math.hypot(u.x - o.x, u.y - o.y) <= tolerance
    );
    if (hit) covered++;
  }

  return (covered / outline.length) * 100;
}
