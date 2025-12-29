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
import { arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import shuffle from "@/constants/suffle";

interface PuzzleThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse;
}

const PuzzleTheme = ({ data }: PuzzleThemeProps) => {
  const dispatch = useAppDispatch();
  const { progressBar, playVideoKamuHebat } = useAppSelector(
    (state) => state.general
  );
  const [activeId, setActiveId] = useState('')
  const [dragStartRect, setDragStartRect] = useState<any>(null);
  const [items, setItems] = useState<GetCategoryLessonPublicDataLessonItemResponse[]>(data.items);
  const draggableRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const droppableRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const overlayRef = useRef<HTMLDivElement>(null);

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
      // setItems(updatedItems);

      // dispatch(setPlayVideoKamuHebat(true));
      // setShowedVideo(true);

      // const timer = setTimeout(() => {
      //   dispatch(setProgressBar(progressBar + 1));
      // }, 3000);

      // return () => clearTimeout(timer);
    }
  }, [items, progressBar, dispatch]);


  const handleDragEnd = ({ active, over }: any) => {
    if (!over) return;

    const overlayMediaRect = overlayRef.current?.getBoundingClientRect();
    if (!overlayMediaRect) {
      return;
    }

    const dropZoneRect = droppableRefs.current[over.id]?.getBoundingClientRect();

    if (dropZoneRect && isCenterAligned(overlayMediaRect, dropZoneRect)) {
      const updatedItems = items.map((item) =>
        item.id === active.id ? { ...item, isCorrect: true } : item
      );
      setItems(updatedItems);
    } else {
      console.log("NOT MATCH");
    }
  };

  const isCenterAligned = (dragRect: any, dropRect: any) => {
    if (!dragRect || !dropRect) return false;

    const dragCenterX = dragRect.left + dragRect.width / 2;
    const dragCenterY = dragRect.top + dragRect.height / 2;

    const dropCenterX = dropRect.left + dropRect.width / 2;
    const dropCenterY = dropRect.top + dropRect.height / 2;

    const toleranceX = 35;
    const toleranceY = 40;

    const isMatched = Math.abs(dragCenterX - dropCenterX) <= toleranceX && Math.abs(dragCenterY - dropCenterY) <= toleranceY;
    return isMatched;
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

  const handleDragStart = ({ active }: any) => {
    setActiveId(active.id);
    // Capture rect manual dari ref
    const ref = draggableRefs.current[active.id];
    let rect = null;
    if (ref) {
      rect = ref.getBoundingClientRect();
    }
    setDragStartRect(rect);
  };

  const DraggableItem = ({ id, children, isDragging }: any) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const localRef = useRef<HTMLDivElement>(null);

    return (
      <div
        ref={(node) => {
          setNodeRef(node);
          localRef.current = node as HTMLDivElement;
          if (node) {
            draggableRefs.current[id] = node;
          }
        }}
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
  // const DroppableItem = ({ id, children }: any) => {
  //   const { setNodeRef, isOver } = useDroppable({ id });
  //   return (
  //     <div
  //       style={{
  //         width: '100%',
  //         height: `${headerStyle.height}px`,
  //         // border: '1px solid red',
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: "center",
  //       }}
  //     >
  //       <div 
  //         ref={(node) => {
  //           setNodeRef(node);
  //           if (node) {
  //             droppableRefs.current[id] = node;
  //           }
  //         }}
  //         style={{
  //           border: '2px dashed rgb(60 60 60)',
  //           width: `${headerStyle.width}px`,
  //           height: `${headerStyle.height}px`,
  //           background: 'rgba(192, 247, 214, 0.5)',
  //           borderRadius: 10,
  //         }}
  //       >
  //         {children}
  //       </div>
  //     </div>
  //   );
  // };

  // const YourDraggablePreview = ({ itemId } : any) => {
  //   const item = items.find((x) => x.id === itemId);
  //   if (!item) return
  //   return (
  //     <img
  //       src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
  //       style={{
  //         width: `${headerStyle.width}px`,
  //         height: `${headerStyle.height}px`,
  //         borderRadius: 10,
  //       }}
  //     />
  //   );
  // };

  return (
    <>
      asdasd
    </>
    // <Box key={`${index}-${data.title}`}>
    //   <DndContext
    //     onDragEnd={handleDragEnd}
    //     sensors={sensors}
    //     collisionDetection={rectIntersection}
    //     onDragStart={handleDragStart}
    //   >
    //     <Stack
    //       w="100vw"
    //     >
    //       <Box
    //         style={{
    //           // background: 'white',
    //           flex: 1,
    //           width: "100%",
    //           position: "relative",
    //           overflow: "hidden",
    //         }}
    //         px={0}
    //       >
    //         <DroppableItem id={`drop-zone-1`}>
    //           {items.map((item, index) => {
    //             if(item.is_done && item.isCorrect){
    //               return (
    //                 <Box
    //                   key={index}
    //                   style={{
    //                     position: "absolute",
    //                     inset: 0,
    //                     display: "flex",
    //                     alignItems: "center",
    //                     justifyContent: "center",
    //                   }}
    //                 >
    //                   <video
    //                     src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
    //                     autoPlay
    //                     muted
    //                     loop
    //                     playsInline
    //                     style={{
    //                       height: "100%",
    //                       objectFit: "cover",
    //                       pointerEvents: "none",
    //                     }}
    //                   />
    //                 </Box>
    //               )
    //             }
    //             if(!item.is_done && item.isCorrect){
    //               return (
    //                 <Box
    //                   key={index}
    //                   style={{
    //                     position: "absolute",
    //                     inset: 0,
    //                     display: "flex",
    //                     alignItems: "center",
    //                     justifyContent: "center",
    //                   }}
    //                 >
    //                   <img
    //                     src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
    //                     style={{
    //                       height: "100%",
    //                       objectFit: "cover",
    //                     }}
    //                   />
    //                 </Box>
    //               )
    //             }
    //             return null;
    //           })}
    //         </DroppableItem>
    //       </Box>
    //       <Box
    //         style={{
    //           overflowX: "auto",
    //         }}
    //       >
    //         <Box style={{
    //           display: "flex",
    //           gap: 10,
    //           padding: "10px 10px 10px 10px",
    //           minWidth: "fit-content",
    //           height: '35vh',
    //         }}>
    //           {items && items.length > 0 && items.map((item, index) => {
    //             if(!item.is_done && !item.isCorrect){
    //               return(
    //                 <DraggableItem id={item.id} key={index} isDragging={activeId === item.id}>
    //                   <BackgroundImage
    //                     src={'./gradient-14.jpeg'}
    //                     style={{
    //                       border: '0px',
    //                       borderRadius: '10px',
    //                       backgroundPosition: 'center',
    //                       backgroundRepeat: 'no-repeat',
    //                       textAlign: 'center',
    //                       float: 'left',
    //                       height: '100%',
    //                       padding: 10,
    //                     }}
    //                     onClick={() => {
    //                       speak(item.content)
    //                     }}
    //                   >
    //                     <img
    //                       src={`${import.meta.env.VITE_API_IMAGE_URL}${item.thumbnail}`}
    //                       style={{
    //                         height: "100%",
    //                         objectFit: "cover",
    //                       }}
    //                     />
    //                   </BackgroundImage>
    //                 </DraggableItem>
    //               )
    //             }
    //           })}
    //         </Box>
    //       </Box>
    //     </Stack>
    //     <DragOverlay>
    //       {activeId ? (
    //         <div ref={overlayRef}>
    //           <YourDraggablePreview itemId={activeId} />
    //         </div>
    //       ) : null}
    //     </DragOverlay>
    //   </DndContext>
    // </Box>
  );
};

export default PuzzleTheme;
