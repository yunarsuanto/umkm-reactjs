import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonItemResponse, GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { useEffect, useMemo, useRef, useState } from "react";
import { setLoadedImages, setLoading, setPlayVideoKamuHebat, setPlayVideoUhSalah, setProgressBar } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useLessonGroupPublics } from "@/hooks/useLessonGroupPublics";
import { useDeviceMode } from "@/constants/dimension";
import { closestCenter, DndContext, MouseSensor, TouchSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import arrayCheck from "@/constants/arrayCheck";
import shuffle from "@/constants/suffle";
import ShowInfo from "./Info";
import SequenceFirstTheme from "./SequenceFirstTheme";
import SequenceSecondTheme from "./SequenceSecondTheme";
import suffle from "@/constants/suffle";

interface SequenceThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse;
}

const SequenceTheme = ({ data }: SequenceThemeProps) => {
  const dispatch = useAppDispatch()
  const { progressBar, playVideoKamuHebat, loadedImages } = useAppSelector((state) => state.general);
  const prevIndexRef = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false);
  const total = data.items.length;
  const [options, setOptions] = useState<GetCategoryLessonPublicDataLessonItemResponse[]>([])

  const handleSpeak = (slideIndex: number) => {
    const r = data.items[slideIndex];
    if (!r) return;
    setTimeout(() => {
      speak(data.description.replaceAll('{content}', r.content));
    }, 4200)
  };

  const onCorrectAnswer = () => {
    setTimeout(() => {
      setIsCorrect(true);
      dispatch(setPlayVideoKamuHebat(true));
    }, 1000);
  }

  const onWrongAnswer = () => {
    setTimeout(() => {
      dispatch(setPlayVideoUhSalah(true));
    }, 1000);
  }

  useEffect(() => {
    if (!playVideoKamuHebat && isCorrect) {
      if (currentIndex === 1) {
        dispatch(setProgressBar(progressBar + 1));
        handleSpeak(currentIndex + 1);
      }
    }
  }, [playVideoKamuHebat]);

  useEffect(() => {
    if(data && data.items && data.items.length > 0){
      setOptions(
        suffle(data.items)
      );
    }
  }, [data])

  const cacheKey = `loaded-${currentIndex}`;

  useEffect(() => {
      const cached = sessionStorage.getItem(cacheKey);
      if (!cached) {
          dispatch(setLoading(true));
          dispatch(setLoadedImages(new Array(data.items.length).fill(false)));
      } else {
          dispatch(setLoading(false));
      }
  }, []);

  useEffect(() => {
      if (loadedImages.length > 0 && loadedImages.every(Boolean)) {
          dispatch(setLoading(false));
          sessionStorage.setItem(cacheKey, "done");
      }
  }, [loadedImages]);

  return (
    <div className='flex flex-col'>
      <div className={`relative w-full bg-cover bg-no-repeat h-[74dvh] p-2 rounded-lg`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_IMAGE_URL}${data.media})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {currentIndex === 0 && (
          <div className="fixed top-[50dvh] right-3" onClick={() => setCurrentIndex(1)}>
            <img src={'/arrow-right.svg'} alt="add" width={30} height={30} className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" />  
          </div>
        )}
        {data && data.items && data.items.length > 0 && currentIndex === 0 && (
          <SequenceFirstTheme array={data.items} description={data.description} />
        )}
        {(options && options.length > 0) && (data && data.items && data.items.length > 0) && currentIndex === 1 && (
          <SequenceSecondTheme data={data.items} array={options} description={data.description} onCorrectAnswer={onCorrectAnswer} onWrongAnswer={onWrongAnswer} />
        )}
        {currentIndex === 1 && (
          <div className="fixed top-[50dvh] left-3" onClick={() => setCurrentIndex(0)}>
            <img src={'/arrow-left.svg'} alt="add" width={30} height={30} className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" />  
          </div>
        )}
      </div>
    </div>
    // <Box key={`${index}-${data.title}`}>
    //   {sliderLocal === 2 && (
    //     <div style={{position: 'absolute', top: '50vh', left: 10, border: '2px solid white', borderRadius: 100, width: 35, height: 35, background: 'white', alignItems: 'center', justifyItems: 'center', zIndex: 2}}
    //       onClick={() => {
    //         setSliderLocal(sliderLocal - 1)
    //       }}  
    //     >
    //       <div>
    //         <img src={'/back.svg'} alt="add" width={30} height={30} />  
    //       </div>
    //     </div>
    //   )}
    //   {sliderLocal === 1 && (
    //     <div style={{position: 'absolute', top: '50vh', right: 10, border: '2px solid white', borderRadius: 100, width: 35, height: 35, background: 'white', alignItems: 'center', justifyItems: 'center', zIndex: 2}}
    //       onClick={() => {
    //         setSliderLocal(sliderLocal + 1)
    //       }}  
    //     >
    //       <div>
    //         <img src={'/forward.png'} alt="add" width={30} height={30} />  
    //       </div>
    //     </div>
    //   )}
    //   {sliderLocal === 1 ? (
    //     <SimpleGrid cols={orientation === 'portrait' ? 3 : 6} p={5}>
    //     {data && data.items && data.items.map((item, indx) => {
    //       return (
    //         <BackgroundImage
    //           src={'./gradient-14.jpeg'}
    //           style={{
    //             border: '0px',
    //             borderRadius: '10px',
    //             backgroundSize: 'cover',
    //             backgroundPosition: 'center',
    //             backgroundRepeat: 'no-repeat',
    //             textAlign: 'center',
    //             padding: 20,
    //             height: '100%',
    //           }}
    //           key={indx}
    //           onClick={() => {
    //             speak(item.content)
    //           }}
    //         >
    //           <Text style={{
    //             fontSize: headerStyle.font+5,
    //             color: theme.colors.red[9],
    //             textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
    //           }}>{item.order}</Text>
    //           <div
    //             style={{
    //               transform: "scale(1.7)",
    //               transformOrigin: "center center",
    //               width: "100%",
    //             }}
    //           >
    //             <video
    //               src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
    //               autoPlay
    //               muted
    //               loop
    //               playsInline
    //               style={{
    //                 maxHeight: headerStyle.height,
    //                 touchAction: "none",
    //                 pointerEvents: "none",
    //                 width: '100%',
    //               }}
    //               onError={() => {
    //                 console.error('VIDEO ERROR:', item.media);
    //               }}
    //             />
    //           </div>
    //           <Text
    //             style={{
    //               fontSize: headerStyle.font,
    //               color: theme.colors.blue[9],
    //               textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
    //             }}
    //           >
    //             {item.content}
    //           </Text>
    //         </BackgroundImage>
    //       )
    //     })}
    //     </SimpleGrid>
    //   ) : (
    //     <DndContext
    //       onDragEnd={handleDragEnd}
    //       sensors={sensors}
    //       collisionDetection={closestCenter}
    //       modifiers={[]}
    //       key={index}
    //     >
    //         <SimpleGrid cols={orientation === 'portrait' ? 3 : 6} p={5}>
    //           <SortableContext items={options.map(o => o.id)} key={'wadaw'}>
    //             {options && options.map((item, indx) => {
    //               return (
    //                 <SortableItem id={item.id} key={item.id}>
    //                   <BackgroundImage
    //                     src={'./gradient-14.jpeg'}
    //                     style={{
    //                       border: '0px',
    //                       borderRadius: '10px',
    //                       backgroundSize: 'cover',
    //                       backgroundPosition: 'center',
    //                       backgroundRepeat: 'no-repeat',
    //                       textAlign: 'center',
    //                       padding: 20,
    //                       height: '100%',
    //                     }}
    //                     key={indx}
    //                     onClick={() => {
    //                       speak(item.content)
    //                     }}
    //                   >
    //                     <Text style={{
    //                       fontSize: headerStyle.font+5,
    //                       color: theme.colors.red[9],
    //                       textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
    //                     }}>{item.order}</Text>
    //                     <div
    //                       style={{
    //                         transform: "scale(1.7)",
    //                         transformOrigin: "center center",
    //                         width: "100%",
    //                       }}
    //                     >
    //                       <video
    //                         src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
    //                         autoPlay
    //                         muted
    //                         loop
    //                         playsInline
    //                         style={{
    //                           maxHeight: headerStyle.height,
    //                           touchAction: "none",
    //                           pointerEvents: "none",
    //                           width: '100%',
    //                           filter: isCorrect(item, indx) ? "brightness(1)" : "brightness(0)",
    //                         }}
    //                         onError={() => {
    //                           console.error('VIDEO ERROR:', item.media);
    //                         }}
    //                       />
    //                     </div>
    //                     <Text
    //                       style={{
    //                         fontSize: headerStyle.font,
    //                         color: theme.colors.blue[9],
    //                         textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white',
    //                       }}
    //                     >
    //                       {item.content}
    //                     </Text>
    //                   </BackgroundImage>
    //                 </SortableItem>
    //               )
    //             })}
    //           </SortableContext>
    //         </SimpleGrid>
    //       </DndContext>
    //   )}
    // </Box>
  );
};

export default SequenceTheme;