// src/utils/sampleSvgPath.ts
export type Point = { x: number; y: number };

export function ConvertToPoint(
  path: SVGPathElement,
  step = 5
): Point[] {
  const length = path.getTotalLength();
  const points: Point[] = [];

  for (let i = 0; i <= length; i += step) {
    const p = path.getPointAtLength(i);
    points.push({ x: p.x, y: p.y });
  }

  return points;
}
