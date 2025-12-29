import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setLoadedImages, setLoading } from "@/features/generalSlice";
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

interface MatchingSlideThemeProps {
  single: GetCategoryLessonPublicDataLessonItemResponse;
  array: GetCategoryLessonPublicDataLessonItemResponse[];
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

  useEffect(() => {
    if (single) {
      setOptions(
        getRandomOptions(array, single, 4) as GetCategoryLessonPublicDataLessonItemResponse[]
      )
    }
  }, [single, array])


  useEffect(() => {
    if (options && options.length > 0) {
      dispatch(setLoading(true));
      dispatch(setLoadedImages(new Array(options.length + 1).fill(false)));
    }
  }, [])

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
        distance: 15,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  const DragOverlayItem = ({ media }: { media: string }) => {
    return (
      <lottie-player
        autoplay
        loop
        mode="normal"
        src={`${import.meta.env.VITE_API_IMAGE_URL}${media}`}
        style={{
          width: '100%',
          pointerEvents: 'none',
          touchAction: 'none'
        }}
      />
    );
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
      modifiers={[]}
    >
      <div>
        {single && (
          <ShowInfo description={description.replaceAll('{content}', single.content)} />
        )}
        <div className="h-[72dvh] w-full flex flex-col">
          <div className="h-[27dvh]">
            {single && (
              <DroppableItem id={single.id}>
                <lottie-player
                  ref={(el: any) => (playerRef.current[0] = el)}
                  autoplay
                  loop
                  mode="normal"
                  src={`${import.meta.env.VITE_API_IMAGE_URL}${single.media}`}
                  onLoad={() => {
                    const newLoaded = [...loadedImages];
                    newLoaded[0] = true;
                    dispatch(setLoadedImages(newLoaded));
                  }}
                  style={{
                    filter: isCorrect ? 'brightness(1)' : 'brightness(0)',
                    height: '27dvh',
                  }}
                />
              </DroppableItem>
            )}
          </div>
          <div className="h-[45dvh] grid grid-cols-2 gap-0">
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
                    onLoad={() => {
                      const newLoaded = [...loadedImages];
                      newLoaded[index + 1] = true;
                      dispatch(setLoadedImages(newLoaded));
                    }}
                    style={{
                      pointerEvents: 'none',
                      touchAction: 'none'
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
