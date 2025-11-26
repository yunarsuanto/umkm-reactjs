import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { BackgroundImage, Box, Flex, Grid, Group, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { setPlayVideoKamuHebat, setPlayVideoUhSalah, setProgressBar } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useLessonGroupPublics } from "@/hooks/useLessonGroupPublics";
import { useDeviceMode } from "@/constants/dimension";
import { closestCenter, DndContext, MouseSensor, TouchSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import arrayCheck from "@/constants/arrayCheck";

interface ClasificationThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse;
  index: number;
}

const ClasificationTheme = ({ data, index }: ClasificationThemeProps) => {
  const [sliderLocal, setSliderLocal] = useState<number>(1)
  const dispatch = useAppDispatch()
  const {progressBar, playVideoKamuHebat} = useAppSelector((state) => state.general);
  const theme = useMantineTheme();
  const speakRef = useRef(false);
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: true,
  }), [pagination.page]);
  const { data: dataGroup } = useLessonGroupPublics(pagination, {lesson_id: data.id}, queryOptions)
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

  const handleSpeak = () => {
    if(dataGroup && dataGroup.data){
      const dataResponse = dataGroup?.data.filter(row => row.group === sliderLocal)
      if(dataResponse.length > 0){
        speak(`ini adalah ${dataResponse[0].description}?`);
      }
    }
  };

  const handleSlideChange = (index: number) => {
    if(dataGroup && dataGroup.data){
      const dataResponse = dataGroup?.data.filter(row => row.group === index)
      if(dataResponse.length > 0){
        speak(`ini adalah ${dataResponse[0].description}?`);
      }else{
        const dataResponse = dataGroup?.data.filter(row => row.group === index - dataGroup?.data.length)
        speak(`yang manakah yang dinamakan ${dataResponse[0].description}?`);
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
  const DroppableItem = ({ id, children }: any) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
      <div
        ref={setNodeRef}
        style={{
          width: '100%'
        }}
      >
        {children}
      </div>
    );
  };

  const handleDragEnd = ({ active }: any) => {
    const dataDrop = dataGroup?.data.filter(row => row.group === (sliderLocal - dataGroup?.data.length))
    if(dataDrop?.length === 0) return;
    const d = dataDrop![0].lesson_items.filter((r) => r.lesson_item_id === active.id);
    if(d.length === 0) {
      dispatch(setPlayVideoUhSalah(true));
      return;
    }
    const newArray = Array.isArray(activeArrayGroup)
    ? [...activeArrayGroup]
    : [];
    if (!newArray.includes(active.id)) {
      newArray.push(active.id);
    }
    setTimeout(() => {
      dispatch(setPlayVideoKamuHebat(true));
    }, 300)
    setActiveArrayGroup(newArray);
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
  useEffect(() => {
    if(sliderLocal > (dataGroup?.data?.length! * 2)){
      dispatch(setProgressBar(progressBar + 1));
    }
    if(dataGroup && dataGroup.data.length > 0){
      if (!speakRef.current) {
        speakRef.current = true;
        if(progressBar !== 1){
          handleSpeak();
        }
      }
    }
  }, [sliderLocal, dataGroup])
  useEffect(() => {
    if (!playVideoKamuHebat) {
      const dataResponse = dataGroup?.data.filter(
        row => row.group === (sliderLocal - dataGroup?.data.length)
      );

      if (dataResponse && dataResponse.length > 0) {
        const compare = dataResponse[0].lesson_items.length;
        const TOTAL_SLIDES = dataGroup?.data?.length! * 2;
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
  return (
    <Box key={`${index}-${data.title}`}>
        {dataGroup?.data.filter(row => row.group === sliderLocal).map((item, index) => {
          return (
            <Box key={index}>
              <Grid gutter="xs">
                <Grid.Col span={12} style={{justifyItems: 'center'}}>
                  <Text
                    p={0}
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: theme.colors.lime[9],
                      textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white'
                    }}
                  >
                    {item.description}
                  </Text>
                  {sliderLocal !== 1 && (
                    <div style={{position: 'absolute', top: '50vh', left: 10, border: '2px solid white', borderRadius: 100, width: 35, height: 35, background: 'white', alignItems: 'center', justifyItems: 'center'}}
                      onClick={() => {
                        setSliderLocal(sliderLocal - 1)
                        handleSlideChange(sliderLocal - 1)
                      }}  
                    >
                      <div>
                        <img src={'/back.svg'} alt="add" width={30} height={30} />  
                      </div>
                    </div>
                  )}
                  {dataGroup.data.length >= sliderLocal && (
                    <div style={{position: 'absolute', top: '50vh', right: 10, border: '2px solid white', borderRadius: 100, width: 35, height: 35, background: 'white', alignItems: 'center', justifyItems: 'center'}}
                      onClick={() => {
                        setSliderLocal(sliderLocal + 1)
                        handleSlideChange(sliderLocal + 1)
                      }}  
                    >
                      <div>
                        <img src={'/forward.png'} alt="add" width={30} height={30} />  
                      </div>
                    </div>
                  )}
                  <SimpleGrid cols={item.lesson_items.length} style={{height: '30vh', width: '94vw', padding: 5}}>
                    {item.lesson_items.length > 0 && item.lesson_items.map((itm, indx) => {
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
                          }}
                          key={indx}
                          onClick={() => {
                            speak(itm.content)
                          }}
                        >
                          <video
                            src={`${import.meta.env.VITE_API_IMAGE_URL}${itm.media}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{
                              maxHeight: headerStyle.height + 50,
                              touchAction: "none",
                              pointerEvents: "none",
                              width: '100%',
                            }}
                            onError={() => {
                              console.error('VIDEO ERROR:', itm.media);
                            }}
                          />
                          <Text
                            style={{
                              fontSize: headerStyle.font,
                              color: theme.colors.blue[9],
                              textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
                            }}
                          >
                            {itm.content}
                          </Text>
                        </BackgroundImage>
                      )
                    })}
                  </SimpleGrid>
                </Grid.Col>
              </Grid>
            </Box>
          )
        })}
        {dataGroup?.data.filter(row => row.group === (sliderLocal - dataGroup?.data.length)).map((item, index) => {
          return (
            <DndContext
              onDragEnd={handleDragEnd}
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[]}
              key={index}
            >
              <Box>
                {orientation === 'portrait' ? (
                  <Grid gutter="xs">
                    <DroppableItem id={'drop-zone-1'}>
                      <Grid.Col span={12} style={{justifyItems: 'center'}}>
                        <Text
                          p={0}
                          style={{
                            textAlign: "center",
                            fontSize: 20,
                            color: theme.colors.lime[9],
                            textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white'
                          }}
                        >
                          {item.description}
                        </Text>
                        {sliderLocal !== 1 && (
                          <div style={{position: 'absolute', top: '50vh', left: 10, border: '2px solid white', borderRadius: 100, width: 35, height: 35, background: 'white', alignItems: 'center', justifyItems: 'center'}}
                            onClick={() => {
                              setSliderLocal(sliderLocal - 1)
                              handleSlideChange(sliderLocal - 1)
                            }}  
                          >
                            <div>
                              <img src={'/back.svg'} alt="add" width={30} height={30} />  
                            </div>
                          </div>
                        )}
                        {dataGroup.data.length >= sliderLocal && (
                          <div style={{position: 'absolute', top: '50vh', right: 10, border: '2px solid white', borderRadius: 100, width: 35, height: 35, background: 'white', alignItems: 'center', justifyItems: 'center'}}
                            onClick={() => {
                              setSliderLocal(sliderLocal + 1)
                              handleSlideChange(sliderLocal + 1)
                            }}  
                          >
                            <div>
                              <img src={'/forward.png'} alt="add" width={30} height={30} />  
                            </div>
                          </div>
                        )}
                        <BackgroundImage
                          src={'./gradient-11.jpeg'}
                          style={{
                            border: '0px',
                            borderRadius: '10px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            textAlign: 'center',
                          }}
                        >  
                          <SimpleGrid cols={item.lesson_items.length} style={{height: '30vh', width: '100%', padding: 5, borderRadius: 10, border: '2px dashed gray'}}>
                            {item.lesson_items.length > 0 && item.lesson_items.map((itm, indx) => {
                              return (
                                <div key={indx}>
                                  {arrayCheck(itm.lesson_item_id, activeArrayGroup) && (
                                    <div>
                                      <video
                                        src={`${import.meta.env.VITE_API_IMAGE_URL}${itm.media}`}
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
                                          console.error('VIDEO ERROR:', itm.media);
                                        }}
                                      />
                                      <Text
                                        style={{
                                          fontSize: headerStyle.font,
                                          color: theme.colors.blue[9],
                                          textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
                                        }}
                                      >
                                        {itm.content}
                                      </Text>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </SimpleGrid>
                        </BackgroundImage>
                      </Grid.Col>
                    </DroppableItem>
                    {data && data.items.length > 0 && data.items.map((row, indx) => {
                      return (
                        <Grid.Col span={4} key={indx}>
                          <DraggableItem id={row.id}>
                              <BackgroundImage
                                src={'./gradient-14.jpeg'}
                                style={{
                                  border: '0px',
                                  borderRadius: '10px',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                }}
                              >    
                                <video
                                  src={`${import.meta.env.VITE_API_IMAGE_URL}${row.media}`}
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
                                    console.error('VIDEO ERROR:', row.media);
                                  }}
                                />
                              </BackgroundImage>
                          </DraggableItem>
                        </Grid.Col>
                      )
                    })}
                  </Grid>
                ) : (
                  <Grid gutter="xs">
                    <Grid.Col span={12}>
                      <Text
                        p={0}
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          color: theme.colors.lime[9],
                          textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white'
                        }}
                      >
                        {item.description}
                      </Text>
                      {sliderLocal !== 1 && (
                        <div style={{position: 'absolute', top: '50vh', left: 10, border: '2px solid white', borderRadius: 100, width: 35, height: 35, background: 'white', alignItems: 'center', justifyItems: 'center'}}
                          onClick={() => {
                            setSliderLocal(sliderLocal - 1)
                            handleSlideChange(sliderLocal - 1)
                          }}  
                        >
                          <div>
                            <img src={'/back.svg'} alt="add" width={30} height={30} />  
                          </div>
                        </div>
                      )}
                      {dataGroup.data.length >= sliderLocal && (
                        <div style={{position: 'absolute', top: '50vh', right: 10, border: '2px solid white', borderRadius: 100, width: 35, height: 35, background: 'white', alignItems: 'center', justifyItems: 'center'}}
                          onClick={() => {
                            setSliderLocal(sliderLocal + 1)
                            handleSlideChange(sliderLocal + 1)
                          }}  
                        >
                          <div>
                            <img src={'/forward.png'} alt="add" width={30} height={30} />  
                          </div>
                        </div>
                      )}
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <DroppableItem id={'drop-zone-1'}>
                        <BackgroundImage
                          src={'./gradient-11.jpeg'}
                          style={{
                            border: '0px',
                            borderRadius: '10px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            textAlign: 'center',
                          }}
                        >  
                          <SimpleGrid cols={item.lesson_items.length} style={{height: '50vh', width: '100%', borderRadius: 10, border: '2px dashed gray'}}>
                            {item.lesson_items.length > 0 && item.lesson_items.map((itm, indx) => {
                              return (
                                <div key={indx}>
                                  {arrayCheck(itm.lesson_item_id, activeArrayGroup) && (
                                    <div>
                                      <video
                                        src={`${import.meta.env.VITE_API_IMAGE_URL}${itm.media}`}
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
                                          console.error('VIDEO ERROR:', itm.media);
                                        }}
                                      />
                                      <Text
                                        style={{
                                          fontSize: headerStyle.font,
                                          color: theme.colors.blue[9],
                                          textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
                                        }}
                                      >
                                        {itm.content}
                                      </Text>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </SimpleGrid>
                        </BackgroundImage>
                      </DroppableItem>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Grid gutter={5}>
                        {data && data.items.length > 0 && data.items.map((row, indx) => {
                          return (
                            <Grid.Col span={4} key={indx}>
                              <DraggableItem id={row.id}>
                                  <BackgroundImage
                                    src={'./gradient-14.jpeg'}
                                    style={{
                                      border: '0px',
                                      borderRadius: '10px',
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      backgroundRepeat: 'no-repeat',
                                      // width: 100
                                    }}
                                  >  
                                  <div
                                    style={{
                                      transform: "scale(1.4)",
                                      transformOrigin: "center center",
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  >
                                    <video
                                      src={`${import.meta.env.VITE_API_IMAGE_URL}${row.media}`}
                                      autoPlay
                                      muted
                                      loop
                                      playsInline
                                      style={{
                                        maxHeight: headerStyle.height-20,
                                        touchAction: "none",
                                        pointerEvents: "none",
                                        width: '100%',
                                      }}
                                      onError={() => {
                                        console.error('VIDEO ERROR:', row.media);
                                      }}
                                    />
                                  </div>
                                  </BackgroundImage>
                              </DraggableItem>
                            </Grid.Col>
                          )
                        })}
                      </Grid>
                    </Grid.Col>
                  </Grid>
                )}
              </Box>
            </DndContext>
          )
        })}
    </Box>
  );
};

export default ClasificationTheme;