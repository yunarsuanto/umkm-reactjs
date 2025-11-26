import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import {
  GetCategoryLessonPublicDataLessonItemResponse,
  GetCategoryLessonPublicDataLessonResponse,
} from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import {
  BackgroundImage,
  Box,
  Grid,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
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
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import shuffle from "@/constants/suffle";

interface LoopingThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse;
  index: number;
}

const LoopingTheme = ({ data, index }: LoopingThemeProps) => {
  const dispatch = useAppDispatch();
  const { progressBar, playVideoKamuHebat } = useAppSelector(
    (state) => state.general
  );
  const theme = useMantineTheme();
  const { device, orientation } = useDeviceMode();

  const HEADER_STYLE: any = {
    "mobile-small": { font: 15, height: 50 },
    "mobile-medium": { font: 16, height: 200 },
    "mobile-medium-plus": { font: 17, height: 250 },
    "mobile-large": { font: 18, height: 250 },
    tablet: { font: 20, height: 350 },
    "tablet-large": { font: 20, height: 400 },
    "tablet-extra-large": { font: 20, height: 450 },
    laptop: { font: 22, height: 500 },
    "laptop-standart": { font: 22, height: 500 },
    "laptop-large": { font: 22, height: 500 },
    "laptop-extra-large": { font: 22, height: 500 },
    desktop: { font: 80, height: 1000 },
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

  const [options, setOptions] = useState<
    GetCategoryLessonPublicDataLessonItemResponse[]
  >([]);
  const [hasCompleted, setHasCompleted] = useState(false);

  const randomRef = useRef<GetCategoryLessonPublicDataLessonItemResponse[] | null>(
    null
  );

  useEffect(() => {
    if (!data) return;
    if (!randomRef.current) {
      randomRef.current = shuffle(data.items).slice(0, 3);
    }
    setOptions(randomRef.current);
  }, [data]);

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
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 8 } })
  );

  const stripPrefix = (id: string | undefined) => {
    if (!id) return id;
    return id.replace(/^(drag-|drop-)/, "");
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeBase = stripPrefix(active.id);     // ID item yang di-drag
    const overBase = stripPrefix(over.id);         // ID tempat drop

    const correctMatch = activeBase === overBase;

    if (correctMatch) {
      setOptions(prev =>
        prev.map(o =>
          o.id === activeBase ? { ...o, isCorrect: true } : o
        )
      );
    }
  };

  const DraggableItem = ({ id, children }: any) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          touchAction: "none",
          cursor: "grab",
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
          width: "100%",
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
          border: isOver ? "2px dashed #1976d2" : "2px dashed #aaa",
          borderRadius: 12,
        }}
      >
        {children}
      </div>
    );
  };

  const shuffledGroup3Ref = useRef<GetCategoryLessonPublicDataLessonItemResponse[] | null>(null);
  if (!shuffledGroup3Ref.current && options.length > 0) {
    shuffledGroup3Ref.current = shuffle([...options]);
  }

  const group0 = options.map((item) => (
    <BackgroundImage
      key={`0-${item.id}`}
      src={"./gradient-14.jpeg"}
      style={{
        border: "0px",
        borderRadius: "10px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textAlign: "center",
        padding: 20,
        height: "100%",
      }}
    >
      <div style={{ transform: "scale(1.7)", width: "100%", minHeight: headerStyle.height }}>
        <video
          src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
          autoPlay
          muted
          loop
          playsInline
          style={{ maxHeight: headerStyle.height, pointerEvents: "none", width: "100%" }}
        />
      </div>
    </BackgroundImage>
  ));

  const group1 = options.map((item) => (
    <BackgroundImage
      key={`1-${item.id}`}
      src={"./gradient-14.jpeg"}
      style={{
        border: "0px",
        borderRadius: "10px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textAlign: "center",
        padding: 20,
        height: "100%",
      }}
    >
      <div style={{ transform: "scale(1.7)", width: "100%", minHeight: headerStyle.height }}>
        <video
          src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
          autoPlay
          muted
          loop
          playsInline
          style={{ maxHeight: headerStyle.height, pointerEvents: "none", width: "100%" }}
        />
      </div>
    </BackgroundImage>
  ));

  const group2 = options.map((item) => {
    const isVisible = item.isCorrect;

    return (
      <DroppableItem key={`2-drop-${item.id}`} id={`drop-${item.id}`}>
        <BackgroundImage
          src={"./gradient-14.jpeg"}
          style={{
            pointerEvents: "none",
            width: "100%",
            transition: "0.3s",
            opacity: isVisible ? 1 : 0,      
            visibility: isVisible ? "visible" : "hidden",
            border: "0px",
            borderRadius: "10px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            textAlign: "center",
            padding: 20,
            height: "100%",
          }}
        >
          <div
            style={{
              transform: "scale(1.7)",
              width: "100%",
              minHeight: headerStyle.height,
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
                pointerEvents: "none",
                width: "100%",
                transition: "0.3s",
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? "none" : "brightness(0)",
              }}
            />
          </div>
        </BackgroundImage>
      </DroppableItem>
    );
  });

  const group3Items = shuffledGroup3Ref.current ?? options;
  const group3 = group3Items.map((item) => (
    <DraggableItem key={`3-drag-${item.id}`} id={`drag-${item.id}`}>
      <BackgroundImage
        src={"./gradient-14.jpeg"}
        style={{
          border: "0px",
          borderRadius: "10px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          textAlign: "center",
          padding: 20,
          height: "100%",
        }}
      >
        <div style={{ transform: "scale(1.7)", width: "100%", minHeight: headerStyle.height }}>
          <video
            src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
            autoPlay
            muted
            loop
            playsInline
            style={{ maxHeight: headerStyle.height, pointerEvents: "none", width: "100%" }}
          />
        </div>
      </BackgroundImage>
    </DraggableItem>
  ));

  const finalRepeated = [...group0, ...group1, ...group2, ...group3];

  return (
    <Box key={`${index}-${data.title}`}>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <SimpleGrid cols={orientation === "portrait" ? 4 : 8} p={2} spacing={2}>
          {finalRepeated}
        </SimpleGrid>
      </DndContext>
    </Box>
  );
};

export default LoopingTheme;
