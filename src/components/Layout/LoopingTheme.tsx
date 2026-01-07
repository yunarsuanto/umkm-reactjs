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
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import shuffle from "@/constants/suffle";
import ShowInfo from "./Info";
import { Player } from "@lottiefiles/react-lottie-player";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DetailLessonDataResponse } from "@/types/admin/lesson/DetailLessonTypes";

interface LoopingThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse | DetailLessonDataResponse;
}

const LoopingTheme = ({ data }: LoopingThemeProps) => {
  const dispatch = useAppDispatch();
  const { progressBar, playVideoKamuHebat, loadedImages } = useAppSelector(
    (state) => state.general
  );

  const [options, setOptions] = useState<
    GetCategoryLessonPublicDataLessonItemResponse[]
  >([]);
  const [hasCompleted, setHasCompleted] = useState(false);

  const randomRef = useRef<GetCategoryLessonPublicDataLessonItemResponse[] | null>(
    null
  );

  useEffect(() => {
    if (!data) return;
    if (!randomRef.current && data.items) {
      // Pick 3 random items for the logic
      randomRef.current = shuffle(data.items).slice(0, 3);
      setOptions(randomRef.current);
    }
  }, [data]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (options.length > 0) {
      dispatch(setLoading(true));
      dispatch(setLoadedImages(new Array(options.length).fill(false)));

      // Force stop loading after 1 second
      timeoutId = setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    };
  }, [options]);

  useEffect(() => {
    if (loadedImages.length > 0 && loadedImages.every(Boolean)) {
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    }
  }, [loadedImages]);

  useEffect(() => {
    if (hasCompleted) return;
    if (options.length === 0) return;

    const allCorrect = options.every(item => item.isCorrect);

    if (allCorrect && !playVideoKamuHebat) {
      dispatch(setPlayVideoKamuHebat(true));
      setHasCompleted(true);
    }
  }, [options, playVideoKamuHebat]);

  useEffect(() => {
    if (!playVideoKamuHebat && hasCompleted) {
      dispatch(setProgressBar(progressBar + 1));
    }
  }, [playVideoKamuHebat, hasCompleted]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3,
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 3,
        // delay: 100, tolerance: 8 
      }
    })
  );

  const stripPrefix = (id: string | undefined) => {
    if (!id) return id;
    return id.replace(/^(drag-|drop-)/, "");
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeBase = stripPrefix(active.id);
    const overBase = stripPrefix(over.id);

    const correctMatch = activeBase === overBase;

    if (correctMatch) {
      setOptions(prev =>
        prev.map(o =>
          o.id === activeBase ? { ...o, isCorrect: true } : o
        )
      );
    } else {
      dispatch(setPlayVideoUhSalah(true));
    }
  };

  const DraggableItem = ({ id, children }: any) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`${isDragging ? 'opacity-50' : 'opacity-100'}`}
        style={{
          touchAction: "none",
          cursor: "grab",
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    );
  };

  const DroppableItem = ({ id, children, isCorrect }: any) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
      <div
        ref={setNodeRef}
        style={{
          opacity: isCorrect ? 1 : (isOver ? 1 : 0.8)
        }}
      >
        {children}
      </div>
    );
  };

  const [group3Items, setGroup3Items] = useState<GetCategoryLessonPublicDataLessonItemResponse[]>([]);

  useEffect(() => {
    if (group3Items.length === 0 && options.length > 0) {
      setGroup3Items(shuffle([...options]));
    }
  }, [options]);

  return (
    <div className='flex flex-col'>
      <div className={'rounded-lg bg-pink-200 p-1 flex flex-col mb-2'}>
        <span className={'text-blue-800 w-full text-center text-md'}>{data.title}</span>
        <span className={'text-orange-800 w-full text-center text-sm'}>{data.description}</span>
      </div>
      <div className={`relative max-w-full mx-auto overflow-hidden bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <ShowInfo description={data.description} />

        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToWindowEdges]}
        >
          <div className="grid grid-cols-3 gap-2 h-[45dvh]">
            <div className="flex flex-col gap-2 justify-center">
              {options.map((item, index) => (
                <div key={`0-${item.id}`} className="bg-white/10 p-2 rounded-lg backdrop-blur-sm items-center justify-center relative">
                  <Player
                    src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                    autoplay
                    loop
                    style={{
                      pointerEvents: 'none',
                      height: '12dvh'
                    }}
                    onEvent={(event) => {
                      if (event === 'load') {
                        dispatch(setLoadedImagesByIndex(index));
                      }
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 justify-center">
              {options.map((item, index) => (
                <div key={`0-${item.id}`} className="bg-white/10 p-2 rounded-lg backdrop-blur-sm items-center justify-center relative">
                  <Player
                    src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                    autoplay
                    loop
                    style={{
                      pointerEvents: 'none',
                      height: '12dvh'
                    }}
                    onEvent={(event) => {
                      if (event === 'load') {
                        dispatch(setLoadedImagesByIndex(index));
                      }
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 justify-center">
              {options.map((item) => (
                <div key={`2-drop-${item.id}`} className="bg-white/10 p-2 rounded-lg backdrop-blur-sm items-center justify-center relative">
                  <DroppableItem id={`drop-${item.id}`} isCorrect={item.isCorrect}>
                    {!item.isCorrect && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-6xl">?</p>
                      </div>
                    )}
                    <div className={`${item.isCorrect ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      <Player
                        src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                        autoplay
                        loop
                        style={{ pointerEvents: 'none', height: '12dvh' }}
                      />
                    </div>
                  </DroppableItem>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/80 rounded-lg p-1 h-[26dvh] flex flex-col justify-center relative">
            <p className="text-sky-600 mb-[10px] text-center text-sm">Pindahkan Gambar Di bawah Ke ? di atas</p>
            <div className="grid grid-cols-3 gap-2  ">
              {group3Items.map((item, index) => {
                const isCorrect = options.find(o => o.id === item.id)?.isCorrect;
                if (isCorrect) return <div key={`3-drag-${item.id}`} className="flex-1"></div>;
                return (
                  <DraggableItem id={`drag-${item.id}`} key={`drag-${item.id}`}>
                    <Player
                      src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                      autoplay
                      loop
                      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                    />
                  </DraggableItem>
                )
              })}
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default LoopingTheme;
