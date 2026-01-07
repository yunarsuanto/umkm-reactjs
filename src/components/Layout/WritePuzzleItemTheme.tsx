import { GetLessonItemDataResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { ConvertToFill, Fill } from "../user/ConvertToFill";
import { CalculateFillCoverageByArea } from "../user/CalculateFillCoverageByArea";
import { Player } from "@lottiefiles/react-lottie-player";

interface WritePuzzleItemThemeType {
    data: GetLessonItemDataResponse;
    onSuccess: () => void;
}


const WritePuzzleItemTheme = ({ data, onSuccess }: WritePuzzleItemThemeType) => {
    const lottieRef = useRef<Player>(null);
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(0)
    const [drawing, setDrawing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fillPoints, setFillPoints] = useState<Fill[]>([]);
    const [lines, setLines] = useState<Fill[][]>([]);
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [isStrokeActive, setIsStrokeActive] = useState(false);
    const strokeStartIndexRef = useRef<number | null>(null);
    const [tryAgain, setIsTryAgain] = useState(false)
    const brushSize = 50;

    const handleDown = (e: any) => {
        e.evt?.preventDefault();

        setDrawing(true);
        setIsStrokeActive(true);

        const pos = e.target.getStage().getPointerPosition();

        strokeStartIndexRef.current = lines.length;

        setLines(prev => [...prev, [pos]]);
    };

    const handleMove = (e: any) => {
        e.evt?.preventDefault();
        if (!drawing || !isStrokeActive) return;

        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();

        setLines(prev => {
            const last = [...prev[prev.length - 1], pos];
            return [...prev.slice(0, -1), last];
        });

        const currentSessionLines = lines.slice(startIndex);
        const userPoints = currentSessionLines.flat();
        setProgress(Math.floor(CalculateFillCoverageByArea(fillPoints, userPoints, brushSize / 2)));
    };

    const handleUp = (e: any) => {
        e.evt?.preventDefault();

        setDrawing(false);
        setIsStrokeActive(false);

        if (strokeStartIndexRef.current !== null) {
            const strokeLines = lines[strokeStartIndexRef.current];

            const strokePoints = strokeLines.flat();
            const strokeProgress = Math.floor(
                CalculateFillCoverageByArea(
                    fillPoints,
                    strokePoints,
                    brushSize / 2
                )
            );
            if (strokeProgress < 70) {
                setLines(prev => prev.slice(0, startIndex));
                setProgress(0);
                if(strokeProgress > 40){
                    setIsTryAgain(true)
                }
                setTimeout(() => {
                    setIsTryAgain(false)
                }, 1000)
                return;
            }

            setProgress(100);
            setStartIndex(lines.length);
            onSuccess();
        }

        strokeStartIndexRef.current = null;
    };


    useEffect(() => {
        setProgress(0);
        setStep(1);

        const calculateDimensions = () => {
            const screenWidth = window.innerWidth;
            const maxWidth = screenWidth * 0.9;

            if (data?.thumbnail) {
                const img = new Image();
                img.onload = () => {
                    const aspectRatio = img.height / img.width;
                    const width = maxWidth;
                    const height = width * aspectRatio;

                    setContainerWidth(width);
                    setContainerHeight(height);
                };
                img.src = `${import.meta.env.VITE_API_IMAGE_URL}${data.thumbnail}`;
            }
        };

        calculateDimensions();

        window.addEventListener('resize', calculateDimensions);
        return () => window.removeEventListener('resize', calculateDimensions);
    }, [data]);

    useEffect(() => {
        if (!data?.thumbnail || !containerWidth || !containerHeight) return;

        const fetchSvg = async () => {
            try {
                const url = `${import.meta.env.VITE_API_IMAGE_URL}${data.thumbnail}`;
                const res = await fetch(url);
                const svgText = await res.text();

                if (svgContainerRef.current) {
                    svgContainerRef.current.innerHTML = svgText;
                    const svgEl = svgContainerRef.current.querySelector("svg");
                    const pathEls = svgEl?.querySelectorAll("path");

                    if (pathEls && svgEl) {
                        setTimeout(() => {
                            const viewBox = svgEl.viewBox.baseVal;
                            // Fallback if viewBox is missing or zero
                            const bBox = svgEl.getBBox ? svgEl.getBBox() : { width: 100, height: 100, x: 0, y: 0 };

                            const vWidth = viewBox.width || bBox.width || 100;
                            const vHeight = viewBox.height || bBox.height || 100;
                            const vX = viewBox.x || bBox.x || 0;
                            const vY = viewBox.y || bBox.y || 0;

                            const scaleX = containerWidth / vWidth;
                            const scaleY = containerHeight / vHeight;

                            let allPoints: Fill[] = [];
                            pathEls.forEach((pathEl) => {
                                const rawPoints = ConvertToFill(pathEl as SVGPathElement, 5);
                                const points = rawPoints.map(p => ({
                                    x: (p.x - vX) * scaleX,
                                    y: (p.y - vY) * scaleY
                                }));
                                allPoints = [...allPoints, ...points];
                            });

                            setFillPoints(allPoints);
                        }, 0);
                    }
                }
            } catch (error) {
                console.error("Error processing SVG for fill coverage:", error);
            }
        };

        fetchSvg();
    }, [data?.thumbnail, containerWidth, containerHeight]);

    useEffect(() => {
        if (data && data.is_done && lottieRef.current) {
            try {
                lottieRef.current.pause();
                lottieRef.current.stop();
            } catch (e) {
                console.warn("Failed to stop lottie on iOS", e);
            }
        }
    }, [data?.is_done]);
    return (
        <div className='flex justify-center items-center w-full h-full'>
            {tryAgain && (
                <div className="absolute z-50 bg-amber-200 p-2 rounded-lg top-20">
                    <p className="text-red-700">Coba Lagi</p>
                </div>
            )}
            <div
                ref={svgContainerRef}
                style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', width: 0, height: 0, overflow: 'hidden' }}
            />

            {containerWidth > 0 && containerHeight > 0 && (
                <div style={{ position: "relative", width: containerWidth, height: containerHeight, touchAction: "none" }}>
                    {data && (
                        <svg width={containerWidth} height={containerHeight} style={{ position: "absolute", pointerEvents: "none" }}>
                            <image
                                href={`${import.meta.env.VITE_API_IMAGE_URL}${data.thumbnail}`}
                                width={containerWidth}
                                height={containerHeight}
                                preserveAspectRatio="none"
                            />
                        </svg>
                    )}
                    {data && (
                        <>
                        {!data.is_done && (
                            <Player ref={lottieRef} src={`${import.meta.env.VITE_API_IMAGE_URL}${data.media}`} autoplay={true} loop={true} style={{ position: "absolute", pointerEvents: "none", width: containerWidth, height: containerHeight, zIndex: 50 }} />
                        )}
                        </>
                    )}
                    <Stage
                        width={containerWidth}
                        height={containerHeight}
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
                    {/* <div style={{ position: "relative", bottom: 8, left: 8 }}>
                        Progress: {progress}%
                    </div> */}
                </div>
            )}
        </div>
    )
}

export default WritePuzzleItemTheme;