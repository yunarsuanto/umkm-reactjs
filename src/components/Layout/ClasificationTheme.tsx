import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { useEffect, useMemo, useRef, useState } from "react";
import { setPlayVideoKamuHebat, setPlayVideoUhSalah, setProgressBar, setLoadedImages, setLoading, setLoadedImagesByIndex } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useLessonGroupPublics } from "@/hooks/useLessonGroupPublics";
import { useDeviceMode } from "@/constants/dimension";
import { closestCenter, DndContext, MouseSensor, TouchSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import arrayCheck from "@/constants/arrayCheck";
import ShowInfo from "./Info";
import { Player } from "@lottiefiles/react-lottie-player";
import ClasificationFirstTheme from "./ClasificationFirstTheme";
import ClasificationSecondTheme from "./ClasificationSecondTheme";
import ClasificationThirdTheme from "./ClasificationThirdTheme";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DetailLessonDataResponse } from "@/types/admin/lesson/DetailLessonTypes";

interface ClasificationThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse | DetailLessonDataResponse;
}

const ClasificationTheme = ({ data }: ClasificationThemeProps) => {
  const [sliderLocal, setSliderLocal] = useState<number>(1)
  const dispatch = useAppDispatch()
  const { progressBar, playVideoKamuHebat, loadedImages } = useAppSelector((state) => state.general);
  const speakRef = useRef(false);
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: true,
  }), [pagination.page]);

  const { data: dataGroup } = useLessonGroupPublics(pagination, { lesson_id: data.id }, queryOptions)
  const { device, orientation } = useDeviceMode();
  const [activeArrayGroup, setActiveArrayGroup] = useState<string[]>([])

  const handleSpeak = () => {
    if (dataGroup && dataGroup.data) {
      const dataResponse = dataGroup?.data.filter(row => row.group === sliderLocal)
      if (dataResponse.length > 0) {
        // speak(`ini adalah ${dataResponse[0].description}?`);
      }
    }
  };

  const handleSlideChange = (index: number) => {
    if (dataGroup && dataGroup.data) {
      const dataResponse = dataGroup?.data.filter(row => row.group === index)
      if (dataResponse.length > 0) {
        // speak(`ini adalah ${dataResponse[0].description}?`);
      } else {
        // Fallback for second phase/drag phase logic if needed
        const dataResponse = dataGroup?.data.filter(row => row.group === index - dataGroup?.data.length)
        if (dataResponse && dataResponse.length > 0) {
          // speak(`yang manakah yang dinamakan ${dataResponse[0].description}?`);
        }
      }
    }
  };

  const DraggableItem = ({ id, children, isDragging }: any) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          pointerEvents: "auto",
          opacity: isDragging ? 0 : 1,
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        }}
      >
        {children}
      </div>
    );
  };

  const DroppableItem = ({ id, children, colCount }: any) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
      <div
        ref={setNodeRef}
        className={`grid ${colCount === 2 ? "grid-cols-2" : "grid-cols-1 w-1/2 mx-auto"} gap-3 p-4 flex-1 content-center ${isOver ? "border-2 border-dashed border-sky-500 bg-sky-100/30" : "border-2 border-dashed border-white/50"}`}
      >
        {children}
      </div>
    );
  };

  const handleDragEnd = ({ active }: any) => {
    const targetGroupIndex = sliderLocal - (dataGroup?.data?.length || 0);
    const dataDrop = dataGroup?.data.filter(row => row.group === targetGroupIndex);

    if (dataDrop?.length === 0) return;

    const d = dataDrop![0].lesson_items.filter((r) => r.lesson_item_id === active.id);

    if (d.length === 0) {
      dispatch(setPlayVideoUhSalah(true));
      return;
    }

    const newArray = Array.isArray(activeArrayGroup)
      ? [...activeArrayGroup]
      : [];

    if (!newArray.includes(active.id)) {
      newArray.push(active.id);
    }
    setActiveArrayGroup(newArray);
  };

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

  useEffect(() => {
    if (dataGroup?.data && sliderLocal > (dataGroup.data.length * 2)) {
      dispatch(setProgressBar(progressBar + 1));
    }
  }, [sliderLocal, dataGroup])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (data.items && data.items.length > 0) {
      dispatch(setLoading(true));
      dispatch(setLoadedImages(new Array(data.items.length).fill(false)));

      timeoutId = setTimeout(() => {
        dispatch(setLoading(false));
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    }
  }, [data.items]);

  useEffect(() => {
    if (loadedImages.length > 0 && loadedImages.every(Boolean)) {
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    }
  }, [loadedImages]);

  useEffect(() => {
    if (!playVideoKamuHebat) {
      const targetGroupIndex = sliderLocal - (dataGroup?.data?.length || 0);
      const dataResponse = dataGroup?.data.filter(
        row => row.group === targetGroupIndex
      );

      if (dataResponse && dataResponse.length > 0) {
        const compare = dataResponse[0].lesson_items.length;
        const TOTAL_SLIDES = (dataGroup?.data?.length || 0) * 2;

        if (compare === activeArrayGroup.length) {
          setActiveArrayGroup([]);
          const next = sliderLocal + 1;
          setSliderLocal(next);
          if (next > TOTAL_SLIDES) return;
          handleSlideChange(next);
        }
      }
    }
  }, [playVideoKamuHebat]);

  useEffect(() => {
    const currentGroup = dataGroup?.data?.find(row => row.group === (sliderLocal - dataGroup.data.length));
    if (!currentGroup) return;
    const totalItems = currentGroup.lesson_items.length;
    if (activeArrayGroup.length === totalItems) {
      dispatch(setPlayVideoKamuHebat(true));
    }
  }, [activeArrayGroup]);

  const getTitlePresentation = () => {
    if (!dataGroup || !dataGroup.data) return null;
    const presentationItem = dataGroup.data.find(row => row.group === sliderLocal);
    if (presentationItem) {
      return (
        <div className={'rounded-lg bg-pink-200 p-1 flex flex-col mb-2'}>
          <span className={'text-orange-800 w-full text-center text-sm'}>Ingat yah Teman ini adalah</span>
          <span className={'text-blue-800 w-full text-center text-md'}>{presentationItem.description}</span>
        </div>
      )
    }
    return null
  }
  const getTitleClasification = () => {
    if (!dataGroup || !dataGroup.data) return null;

    const targetGroupIndex = sliderLocal - (dataGroup?.data?.length || 0);
    const classificationItem = dataGroup.data.find(row => row.group === targetGroupIndex);

    if (classificationItem) {
      return (
        <div className={'rounded-lg bg-pink-200 p-1 flex flex-col mb-2'}>
          <span className={'text-orange-800 w-full text-center text-sm'}>Letakkan Di Kotak Mana Saja Yang Termasuk</span>
          <span className={'text-blue-800 w-full text-center text-md'}>{classificationItem.description}</span>
        </div>
      )
    }
    return null
  }

  const getBodyPresentation = () => {
    if (!dataGroup || !dataGroup.data) return null;
    const presentationItem = dataGroup.data.find(row => row.group === sliderLocal);
    if (presentationItem) {
      return (
        <div className="flex flex-col h-full relative">
          <ShowInfo description={presentationItem.description} />
          {sliderLocal !== 1 && (
            <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white rounded-full p-1 cursor-pointer shadow-lg active:scale-95 transition-transform"
              onClick={() => {
                setSliderLocal(sliderLocal - 1);
                handleSlideChange(sliderLocal - 1);
              }}>
              <img src={'/arrow-left.svg'} alt="back" width={30} height={30} />
            </div>
          )}
          {dataGroup.data.length >= sliderLocal && (
            <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white rounded-full p-1 cursor-pointer shadow-lg active:scale-95 transition-transform"
              onClick={() => {
                setSliderLocal(sliderLocal + 1);
                handleSlideChange(sliderLocal + 1);
              }}>
              <img src={'/arrow-right.svg'} alt="forward" width={30} height={30} />
            </div>
          )}
          {presentationItem && presentationItem.lesson_items && presentationItem.lesson_items.length > 0 && (() => {
            const colCount = presentationItem.lesson_items.length % 2 === 0 ? 2 : 1;
            return (
              <div className={`grid ${colCount === 2 ? "grid-cols-2" : "grid-cols-1 w-2/3 mx-auto"} gap-3 p-4 flex-1 content-center`}>
                {presentationItem.lesson_items.map((itm, indx) => (
                  <ClasificationFirstTheme data={itm} key={indx} />
                ))}
              </div>
            )
          })()}
        </div>
      )
    }
    return null;
  }

  const getBodyClasification = () => {
    if (!dataGroup || !dataGroup.data) return null;
    const targetGroupIndex = sliderLocal - (dataGroup?.data?.length || 0);
    const classificationItem = dataGroup.data.find(row => row.group === targetGroupIndex);
    const colCount = classificationItem?.lesson_items?.length! % 2 === 0 ? 2 : 1;

    return (
      <div>
        {classificationItem && (
          <DndContext
            onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToWindowEdges]}
          >
            <div>
              <ShowInfo description={`Letakkan Di Kotak Mana Saja Yang Termasuk ${classificationItem.description}`} />
              <div className="h-[72dvh] w-full flex flex-col">
                <div className="h-[25dvh]">
                  <DroppableItem id={`drop-zone-${classificationItem.id}`} colCount={colCount}>
                    {classificationItem && classificationItem.lesson_items && classificationItem.lesson_items.length > 0 && classificationItem.lesson_items.map((item, index) => {
                      return (
                        <ClasificationSecondTheme key={index} data={item} isActive={activeArrayGroup.includes(item.lesson_item_id)} />
                      )
                    })}
                  </DroppableItem>
                </div>
                <div className="h-[47dvh] ">
                  <div className="grid grid-cols-3 gap-2 h-full items-center">
                    {data && data.items.length > 0 && data.items.map((row, indx) => {
                      return (
                        <div key={indx} className="aspect-square">
                          <DraggableItem id={row.id}>
                            <ClasificationThirdTheme data={row} />
                          </DraggableItem>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </DndContext>
        )}
      </div>
    )
  }
  return (
    <div className='flex flex-col'>
      {getTitlePresentation()}
      {getTitleClasification()}
      <div className={`relative w-full bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        {getBodyPresentation()}
        {getBodyClasification()}
        <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
          {data.items.map((item, index) => (
            <Player
              key={index}
              src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
              autoplay={false}
              loop={false}
              onEvent={(event) => {
                if (event === 'load') {
                  dispatch(setLoadedImagesByIndex(index));
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClasificationTheme;