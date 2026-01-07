import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  DndContext,
  useDraggable,
  useDroppable,
  pointerWithin,
  useSensor,
  useSensors,
  DragOverlay,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { useState, useEffect, useRef } from "react";
import { GetCategoryLessonPublicDataLessonItemResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import getRandomOptions from "@/constants/random_option";
import ShowInfo from "./Info";
import speak from "@/constants/speak";
import "@lottiefiles/lottie-player";
import { setLoadedImages, setLoading } from "@/features/generalSlice";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { GetLessonItemDataResponse } from "@/types/admin/lesson_item/GetLessonItemTypes";


interface MatchingSlideThemeProps {
  single: GetCategoryLessonPublicDataLessonItemResponse | GetLessonItemDataResponse;
  array: GetCategoryLessonPublicDataLessonItemResponse[] | GetLessonItemDataResponse[];
  description: string;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  isCorrect: boolean;
}

const MatchingSlideTheme = ({ single, array, description, onCorrectAnswer, onWrongAnswer, isCorrect }: MatchingSlideThemeProps) => {
  const dispatch = useAppDispatch()
  const { loadedImages } = useAppSelector((state) => state.general)
  const [options, setOptions] = useState<GetCategoryLessonPublicDataLessonItemResponse[]>()
  const playerRef = useRef<(HTMLElement | null)[]>([]);
  const [activeItem, setActiveItem] = useState<GetCategoryLessonPublicDataLessonItemResponse>()
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (single) {
      setOptions(
        getRandomOptions(array, single, 4) as GetCategoryLessonPublicDataLessonItemResponse[]
      )
    }
  }, [single, array])

  useEffect(() => {
    if (!options) return;

    dispatch(setLoadedImages(new Array(options.length + 1).fill(false)));
    playerRef.current.forEach((player, index) => {
      if (!player) return;

      const onLoad = () => {
        const newLoaded = [...loadedImages];
        newLoaded[index] = true;

        dispatch(setLoadedImages(newLoaded));

        const allLoaded = newLoaded.every(Boolean);
        if (allLoaded) dispatch(setLoading(false));
      };

      player.addEventListener("load", onLoad);

      return () => player.removeEventListener("load", onLoad);
    });

  }, [options]);


  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 3,
        // delay: 150,
        // tolerance: 5,
      },
    })
  );

  const DragOverlayItem = ({ media }: { media: string }) => {
    return (<></>);
  };

  const DraggableItem = ({ id, children, isDragging }: any) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          touchAction: "none",
          // opacity: isDragging ? 0.5 : 1,
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        }}
      >
        {children}
      </div>
    );
  };

  const DroppableItem = ({ id, children }: any) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
      <div
        ref={setNodeRef}
        style={{
          border: isOver ? '2px dashed #1976d2' : '2px dashed #aaa',
        }}
      >
        {children}
      </div>
    );
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    if (!active) return;
    const found = options?.find((opt) => opt.id === active.id);
    if (found) {
      setActiveItem(found);
    }
  };

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) return;
    if (active.id === over.id) {
      onCorrectAnswer()
    } else {
      onWrongAnswer()
    }
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={pointerWithin}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="relative z-1">
        {single && (
          <ShowInfo description={description.replaceAll('{content}', single.content)} />
        )}
        <div ref={containerRef} className="h-[72dvh] w-full flex flex-col">
          <div className="h-[25dvh]">
            {single && (
              <DroppableItem id={single.id}>
                <lottie-player
                  ref={(el: any) => (playerRef.current[0] = el)}
                  autoplay
                  loop
                  mode="normal"
                  src={`${import.meta.env.VITE_API_IMAGE_URL}${single.media}`}
                  style={{
                    filter: isCorrect ? 'brightness(1)' : 'brightness(0)',
                    height: '22dvh',
                  }}
                />
              </DroppableItem>
            )}
          </div>
          <div className="h-[45dvh] grid grid-cols-2 gap-0 mt-4">
            {options && options.map((item, index) => {
              return (
                <DraggableItem
                  key={index}
                  id={item.id}
                  isDragging={activeItem?.id === item.id}
                >
                  <lottie-player
                    ref={(el: any) => (playerRef.current[index + 1] = el)}
                    autoplay
                    loop
                    mode="normal"
                    src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                    style={{
                      pointerEvents: 'none',
                      touchAction: 'none',
                      height: '18dvh'
                    }}
                  />
                </DraggableItem>
              )
            })}
          </div>
        </div>
        <DragOverlay>
          {activeItem ? (
            <DragOverlayItem media={activeItem.media} />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default MatchingSlideTheme;
