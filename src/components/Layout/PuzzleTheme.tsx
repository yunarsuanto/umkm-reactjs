import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import {
  GetCategoryLessonPublicDataLessonItemResponse,
  GetCategoryLessonPublicDataLessonResponse,
} from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  setPlayVideoKamuHebat,
  setPlayVideoUhSalah,
  setProgressBar,
  setLoadedImages,
  setLoading,
  setLoadedImagesByIndex
} from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useDeviceMode } from "@/constants/dimension";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  DragOverlay,
  rectIntersection,
} from "@dnd-kit/core";
import ShowInfo from "./Info";
import { Player } from "@lottiefiles/react-lottie-player";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DetailLessonDataResponse } from "@/types/admin/lesson/DetailLessonTypes";

interface PuzzleThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse | DetailLessonDataResponse;
}

const PuzzleTheme = ({ data }: PuzzleThemeProps) => {
  const dispatch = useAppDispatch();
  const { progressBar, playVideoKamuHebat, loadedImages } = useAppSelector(
    (state) => state.general
  );
  const [activeId, setActiveId] = useState('')
  const [dragStartRect, setDragStartRect] = useState<any>(null);
  const [items, setItems] = useState<GetCategoryLessonPublicDataLessonItemResponse[]>(data.items);
  // Refs to measure elements
  const draggableRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const droppableRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (items && items.length > 0) {
      dispatch(setLoading(true));
      dispatch(setLoadedImages(new Array(items.length).fill(false)));

      timeoutId = setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    };
  }, []);

  useEffect(() => {
    if (loadedImages.length > 0 && loadedImages.every(Boolean)) {
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    }
  }, [loadedImages]);

  useEffect(() => {
    const normalItems = items.filter(item => !item.is_done);
    const allNormalItemsCorrect = normalItems.length > 0 && normalItems.every(item => item.isCorrect);
    if (allNormalItemsCorrect) {
      const updatedItems = items.map(item => {
        if (item.is_done) {
          return { ...item, isCorrect: true };
        }
        return item;
      });
      const isSame = JSON.stringify(items) === JSON.stringify(updatedItems);

      if (!isSame) {
        setItems(updatedItems);
      }
      if (!playVideoKamuHebat) {
        setTimeout(() => {
          dispatch(setPlayVideoKamuHebat(true));
        }, 2000)
        setTimeout(() => {
          dispatch(setProgressBar(progressBar + 1));
        }, 4000);
      }
    }
  }, [items, progressBar, dispatch]);

  const handleDragEnd = ({ active }: any) => {
    const draggableRect = active.rect.current.translated;
    if (!draggableRect) return;

    const dropZone = droppableRefs.current["drop-zone-1"];
    if (!dropZone) return;

    const dropRect = dropZone.getBoundingClientRect();

    const centerX = draggableRect.left + draggableRect.width / 2;
    const centerY = draggableRect.top + draggableRect.height / 2;

    const centerBox = {
      left: dropRect.left + dropRect.width * 0.2,
      right: dropRect.left + dropRect.width * 0.8,
      top: dropRect.top + dropRect.height * 0.2,
      bottom: dropRect.top + dropRect.height * 0.8,
    };

    const isInsideCenter =
      centerX > centerBox.left &&
      centerX < centerBox.right &&
      centerY > centerBox.top &&
      centerY < centerBox.bottom;

    if (isInsideCenter) {
      setItems(prev =>
        prev.map((item) =>
          item.id === active.id ? { ...item, isCorrect: true } : item
        )
      );
    }

    setActiveId('');
  };

  useEffect(() => {
    setItems(data.items);
  }, [data]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 3,
        // delay: 100,
        // tolerance: 8,
      },
    })
  );

  const handleDragStart = ({ active }: any) => {
    setActiveId(active.id);
  };

  const DraggableItem = ({ id, children }: any) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`${activeId === id ? 'opacity-0' : 'opacity-100'} touch-none cursor-grab active:cursor-grabbing`}
        style={{
          transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
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
        ref={(el) => {
          setNodeRef(el);
          droppableRefs.current[id] = el;
        }}
        className={`relative w-full md:h-[70%] border-2 rounded-xl transition-colors ${isOver ? 'border-sky-400 bg-sky-50/20' : 'border-dashed border-white/50 bg-black/10'}`}
      >
        {children}
      </div>
    );
  };

  const [dropSize, setDropSize] = useState({ width: 0, height: 0 });

  const YourDraggablePreview = ({ itemId }: any) => {
    const item = items.find((x) => x.id === itemId);
    if (!item) return null;

    return (
      <div
        style={{
          width: dropSize.width,
          height: dropSize.height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="p-2"
      >
        <img
          src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  };

  useEffect(() => {
    const dropZone = droppableRefs.current["drop-zone-1"];
    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      setDropSize({ width: rect.width, height: rect.height });
    }
  }, [items]);


  return (
    <div className='flex flex-col'>
      <div className={'rounded-lg bg-pink-200 p-1 flex flex-col mb-2'}>
        <span className={'text-blue-800 w-full text-center text-md'}>{data.title}</span>
        <span className={'text-orange-800 w-full text-center text-sm'}>{data.description}</span>
      </div>
      <div className={`relative w-full bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg flex flex-col`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <ShowInfo description={data.description} />
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          modifiers={[restrictToWindowEdges]}
        >
          <div className="h-[44dvh] w-full flex justify-center p-4">
            <DroppableItem id="drop-zone-1">
              {items.map((item, index) => {
                if (item.isCorrect) {
                  return (
                    <div key={index} className="absolute inset-0 flex items-center justify-center pointer-events-none animate-fade-in">
                      <img src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`} alt="" style={{ height: '100%', padding: 10 }} />
                    </div>
                  )
                }
                return null;
              })}
              {items.every(item => item.isCorrect) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {items.filter(item => item.is_done).map((item, idx) => (
                    <Player
                      key={`done-${idx}`}
                      src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                      autoplay={true}
                      loop={false}
                      style={{ width: '300px', height: '300px' }}
                    />
                  ))}
                </div>
              )}
            </DroppableItem>
          </div>
          <div className="flex-1 overflow-x-auto">
            <div className="absolute left-0 right-0 bottom-10 z-10 text-center text-white/80 pointer-events-none select-none animate-pulse text-2xl drop-shadow-lg">
              ← geser →
            </div>
            <div className="flex gap-4 p-2 h-full min-w-max items-center">
              {items.filter(item => !item.isCorrect && !item.is_done).map((item, index) => (
                <div key={item.id} className="h-[80%] aspect-square">
                  <DraggableItem id={item.id}>
                    <div onClick={() => {
                      speak(item.content)
                    }} className="w-full h-full p-1 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 shadow-sm hover:scale-105 transition-transform flex justify-center items-center">
                      <img src={`${import.meta.env.VITE_API_IMAGE_URL}${item.thumbnail}`} alt="" style={{ height: 100 }} />
                    </div>
                  </DraggableItem>
                </div>
              ))}
            </div>
          </div>
          <DragOverlay>
            {activeId ? (
              <YourDraggablePreview itemId={activeId} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default PuzzleTheme;
