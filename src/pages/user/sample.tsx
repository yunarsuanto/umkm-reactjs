// src/pages/UserLessonPage.tsx
import { useEffect, useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import UserLayout from "@/components/user/UserLayout";
import { isMobile } from "react-device-detect";
import { ConvertToFill, Fill } from "@/components/user/ConvertToFill";
import { CalculateFillCoverageByArea } from "@/components/user/CalculateFillCoverageByArea";

const UserLessonPage = () => {
  const [fillPoints, setFillPoints] = useState<Fill[]>([]);
  const [lines, setLines] = useState<Fill[][]>([]);
  const [drawing, setDrawing] = useState(false);
  const [progress, setProgress] = useState(0);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const brushSize = 50;

  const svgUrl = "/sample.svg";

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const res = await fetch(svgUrl);
        const svgText = await res.text();

        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svgText;
          const svgEl = svgContainerRef.current.querySelector("svg");
          const pathEl = svgEl?.querySelector("path") as SVGPathElement;

          if (pathEl && svgEl) {
            // Wait for a tick to ensure layout
            setTimeout(() => {
              // Get viewBox to determine original coordinate system
              const viewBox = svgEl.viewBox.baseVal;
              // Fallback to getBBox if viewBox is missing or zero (though sample usually has it)
              const vWidth = viewBox.width || 333.33; // value from sample.svg
              const vHeight = viewBox.height || 333.33;
              const vX = viewBox.x || 0;
              const vY = viewBox.y || 0;

              const targetWidth = 200;
              const targetHeight = 200;

              const scaleX = targetWidth / vWidth;
              const scaleY = targetHeight / vHeight;

              const rawPoints = ConvertToFill(pathEl, 5);

              // Transform points to screen coordinates
              const points = rawPoints.map(p => ({
                x: (p.x - vX) * scaleX,
                y: (p.y - vY) * scaleY
              }));

              setFillPoints(points);
            }, 0);
          }
        }
      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };
    fetchSvg();
  }, []);

  const handleDown = (e: any) => {
    setDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, [pos]]);
  };

  const handleMove = (e: any) => {
    if (!drawing) return;
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    const last = lines[lines.length - 1];
    last.push(pos);
    lines.splice(lines.length - 1, 1, last);
    setLines(lines.concat());

    const userPoints = lines.flat();
    setProgress(Math.floor(CalculateFillCoverageByArea(fillPoints, userPoints, brushSize / 2)));
  };

  const handleUp = () => setDrawing(false);

  return (
    <UserLayout>
      {/* Hidden container for SVG processing */}
      <div
        ref={svgContainerRef}
        style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
      />

      {isMobile && (
        <div className="flex flex-col p-2 mt-[60px] h-[calc(100dvh-60px)]">
          <div style={{ position: "relative", width: 200, height: 200 }}>
            <svg width={200} height={200} style={{ position: "absolute", pointerEvents: "none" }}>
              <image href={svgUrl} width={200} height={200} preserveAspectRatio="none" />
              {fillPoints.length > 0 && (
                <polygon
                  points={fillPoints.map(p => `${p.x},${p.y}`).join(" ")}
                  fill="none"
                  stroke="none"
                />
              )}
            </svg>

            {/* Drawing Layer */}
            <Stage
              width={200}
              height={200}
              onMouseDown={handleDown}
              onMouseMove={handleMove}
              onMouseUp={handleUp}
              onTouchStart={handleDown}
              onTouchMove={handleMove}
              onTouchEnd={handleUp}
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.flatMap(p => [p.x, p.y])}
                    stroke="black"
                    strokeWidth={brushSize}
                    lineCap="round"
                    lineJoin="round"
                  />
                ))}
              </Layer>
            </Stage>

            <div style={{ position: "relative", bottom: 8, left: 8 }}>
              Progress: {progress}%
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default UserLessonPage;
