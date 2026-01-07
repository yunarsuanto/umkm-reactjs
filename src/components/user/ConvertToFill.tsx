// src/utils/ConvertToFill.ts
export interface Fill {
  x: number;
  y: number;
}

/**
 * Mengambil titik-titik di area path untuk fill
 * @param path SVGPathElement
 * @param step jarak antar titik (pixel)
 */
export function ConvertToFill(path: SVGPathElement, step = 5): Fill[] {
  const points: Fill[] = [];
  if (!path) return points;

  // Ambil bounding box SVG path
  const bbox = path.getBBox();
  const xStart = bbox.x;
  const yStart = bbox.y;
  const xEnd = bbox.x + bbox.width;
  const yEnd = bbox.y + bbox.height;

  // Cek setiap titik grid di dalam bounding box
  for (let x = xStart; x <= xEnd; x += step) {
    for (let y = yStart; y <= yEnd; y += step) {
      // Gunakan isPointInPath untuk cek apakah titik di dalam fill
      if ((path as any).isPointInFill) {
        const svg = path.ownerSVGElement!;
        const point = svg.createSVGPoint();
        point.x = x;
        point.y = y;
        if (path.isPointInFill(point)) {
          points.push({ x, y });
        }
      }
    }
  }

  return points;
}