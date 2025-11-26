import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonItemResponse, GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { BackgroundImage, Box, Flex, Grid, Group, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { setPlayVideoKamuHebat, setPlayVideoUhSalah, setProgressBar } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useLessonGroupPublics } from "@/hooks/useLessonGroupPublics";
import { useDeviceMode } from "@/constants/dimension";
import { closestCenter, DndContext, MouseSensor, TouchSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import arrayCheck from "@/constants/arrayCheck";
import shuffle from "@/constants/suffle";

interface SequenceThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse;
  index: number;
}

const SequenceTheme = ({ data, index }: SequenceThemeProps) => {
  const [sliderLocal, setSliderLocal] = useState<number>(1)
  const dispatch = useAppDispatch()
  const {progressBar, playVideoKamuHebat} = useAppSelector((state) => state.general);
  const theme = useMantineTheme();
  const speakRef = useRef(false);
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: true,
  }), [pagination.page]);
  const { device, orientation } = useDeviceMode();
  const [activeArrayGroup, setActiveArrayGroup] = useState<string[]>([])

  const HEADER_STYLE: any = {
    "mobile-small": { font: 15, height: 100 },
    "mobile-medium": { font: 16, height: 200 },
    "mobile-medium-plus": { font: 17, height: 250 },
    "mobile-large": { font: 18, height: 250 },

    "tablet": { font: 20, height: 350 },
    "tablet-large": { font: 20, height: 400 },
    "tablet-extra-large": { font: 20, height: 450 },

    "laptop": { font: 22, height: 500 },
    "laptop-standart": { font: 22, height: 500 },
    "laptop-large": { font: 22, height: 500 },
    "laptop-extra-large": { font: 22, height: 500 },

    "desktop": { font: 80, height: 1000 },
    "desktop-large": { font: 80, height: 500 },

    "4k": { font: 100, height: 1000 },
  };

  const ORIENTATION_STYLE: any = {
    portrait: { fontMultiplier: 1, heightMultiplier: 1 },
    landscape: { fontMultiplier: 1.1, heightMultiplier: 0.9 },
  };

  const headerBase = HEADER_STYLE[device];
  const orient = ORIENTATION_STYLE[orientation];

  const headerStyle = {
    font: headerBase.font * orient.fontMultiplier,
    height: headerBase.height * orient.heightMultiplier,
  };
  
  const [options, setOptions] = useState<GetCategoryLessonPublicDataLessonItemResponse[]>([])
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = options.findIndex((i) => i.id === active.id);
      const newIndex = options.findIndex((i) => i.id === over.id);

      const newOrder = arrayMove(options, oldIndex, newIndex);
      setOptions(newOrder);
    }
  };

  const isCorrect = (item: any, index: number) => {
    return item.order - 1 === index;
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 8,
      },
    })
  );

  const SortableItem = ({ id, children }: any) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.3 : 1,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  };

  useEffect(() => {
    if (hasCompleted) return;

    if (!playVideoKamuHebat) {
      if (data && data.items && options.length === data.items.length) {
        const isAllMatch = data.items.every(
          (item, index) => item.id === options[index].id
        );

        if (isAllMatch) {
          setHasCompleted(true);
          dispatch(setPlayVideoKamuHebat(true));
        }
      }
    }
  }, [playVideoKamuHebat, data, options]);

  useEffect(() => {
    if (hasCompleted && !playVideoKamuHebat) {
      dispatch(setProgressBar(progressBar + 1));
    }
  }, [playVideoKamuHebat, hasCompleted]);

  useEffect(() => {
    if(data){
      const opts = shuffle(data.items)
      setOptions(opts)
    }
  }, [data])

  return (
    <Box key={`${index}-${data.title}`}>
      {sliderLocal === 2 && (
        <div style={{position: 'absolute', top: '50vh', left: 10, border: '2px solid white', borderRadius: 100, width: 35, height: 35, background: 'white', alignItems: 'center', justifyItems: 'center'}}
          onClick={() => {
            setSliderLocal(sliderLocal - 1)
          }}  
        >
          <div>
            <img src={'/back.svg'} alt="add" width={30} height={30} />  
          </div>
        </div>
      )}
      {sliderLocal === 1 && (
        <div style={{position: 'absolute', top: '50vh', right: 10, border: '2px solid white', borderRadius: 100, width: 35, height: 35, background: 'white', alignItems: 'center', justifyItems: 'center'}}
          onClick={() => {
            setSliderLocal(sliderLocal + 1)
          }}  
        >
          <div>
            <img src={'/forward.png'} alt="add" width={30} height={30} />  
          </div>
        </div>
      )}
      {sliderLocal === 1 ? (
        <SimpleGrid cols={orientation === 'portrait' ? 3 : 6} p={5}>
        {data && data.items && data.items.map((item, indx) => {
          return (
            <BackgroundImage
              src={'./gradient-14.jpeg'}
              style={{
                border: '0px',
                borderRadius: '10px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                textAlign: 'center',
                padding: 20,
                height: '100%',
              }}
              key={indx}
              onClick={() => {
                speak(item.content)
              }}
            >
              <Text style={{
                fontSize: headerStyle.font+5,
                color: theme.colors.red[9],
                textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
              }}>{item.order}</Text>
              <div
                style={{
                  transform: "scale(1.7)",
                  transformOrigin: "center center",
                  width: "100%",
                }}
              >
                <video
                  src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    maxHeight: headerStyle.height,
                    touchAction: "none",
                    pointerEvents: "none",
                    width: '100%',
                  }}
                  onError={() => {
                    console.error('VIDEO ERROR:', item.media);
                  }}
                />
              </div>
              <Text
                style={{
                  fontSize: headerStyle.font,
                  color: theme.colors.blue[9],
                  textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
                }}
              >
                {item.content}
              </Text>
            </BackgroundImage>
          )
        })}
        </SimpleGrid>
      ) : (
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[]}
          key={index}
        >
            <SimpleGrid cols={orientation === 'portrait' ? 3 : 6} p={5}>
              <SortableContext items={options.map(o => o.id)} key={'wadaw'}>
                {options && options.map((item, indx) => {
                  return (
                    <SortableItem id={item.id} key={item.id}>
                      <BackgroundImage
                        src={'./gradient-14.jpeg'}
                        style={{
                          border: '0px',
                          borderRadius: '10px',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          textAlign: 'center',
                          padding: 20,
                          height: '100%',
                        }}
                        key={indx}
                        onClick={() => {
                          speak(item.content)
                        }}
                      >
                        <Text style={{
                          fontSize: headerStyle.font+5,
                          color: theme.colors.red[9],
                          textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
                        }}>{item.order}</Text>
                        <div
                          style={{
                            transform: "scale(1.7)",
                            transformOrigin: "center center",
                            width: "100%",
                          }}
                        >
                          <video
                            src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{
                              maxHeight: headerStyle.height,
                              touchAction: "none",
                              pointerEvents: "none",
                              width: '100%',
                              filter: isCorrect(item, indx) ? "brightness(1)" : "brightness(0)",
                            }}
                            onError={() => {
                              console.error('VIDEO ERROR:', item.media);
                            }}
                          />
                        </div>
                        <Text
                          style={{
                            fontSize: headerStyle.font,
                            color: theme.colors.blue[9],
                            textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
                          }}
                        >
                          {item.content}
                        </Text>
                      </BackgroundImage>
                    </SortableItem>
                  )
                })}
              </SortableContext>
            </SimpleGrid>
          </DndContext>
      )}
    </Box>
  );
};

export default SequenceTheme;