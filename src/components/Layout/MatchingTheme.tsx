import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
// import { Carousel } from "@mantine/carousel";
import { Box, Flex, Grid, Group, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { setPlayVideoKamuHebat, setProgressBar } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import MatchingSlideTheme from "./MatchingSlideTheme";

interface MatchingThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse;
  index: number;
}

const MatchingTheme = ({ data, index }: MatchingThemeProps) => {
  const dispatch = useAppDispatch()
  const { progressBar, playVideoKamuHebat } = useAppSelector((state) => state.general);
  const speakRef = useRef(false);
  const theme = useMantineTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [optionsState, setOptionsState] = useState<any[]>([]);
  const total = data.items.length;
  const emblaRef = useRef<EmblaCarouselType | null>(null);
  const [pendingNext, setPendingNext] = useState<number | null>(null);
  const [isLast, setIslast] = useState(false);

  useEffect(() => {
    const styleId = 'embla-touch-action-style';
    if (isDragging) {
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = `.mantine-Carousel-container { touch-action: none !important; }`;
    } else {
      const styleTag = document.getElementById(styleId);
      if (styleTag) styleTag.remove();
    }
    return () => {
      const styleTag = document.getElementById(styleId);
      if (styleTag) styleTag.remove();
    };
  }, [isDragging]);
  
  const handleSpeak = (slideIndex: number) => {
    const r = data.items[slideIndex];
    if (!r) return;
    speak(`Yang manakah yang dinamakan ${r.content}?`);
  };

  const handleCorrectAnswer = (idx: number) => {
    dispatch(setPlayVideoKamuHebat(true));

    const isLast = idx === data.items.length - 1;

    if (isLast) {
      setIslast(isLast)
    }
    setPendingNext(idx);
  };

  useEffect(() => {
    if (!speakRef.current) {
      speakRef.current = true;
      if(progressBar !== 1){
        handleSpeak(0);
      }
    }
  }, []);

  // Update optionsState setiap currentIndex berubah
  useEffect(() => {
    if (data.items && data.items[currentIndex]) {
      setOptionsState(getRandomOptions(data.items, data.items[currentIndex], 3));
    }
  }, [currentIndex, data.items]);

  useEffect(() => {
    if (pendingNext === null) return;
    if (playVideoKamuHebat) return;

    const next = pendingNext + 1;
    setPendingNext(null);

    if (next >= total) {
      if(isLast && !playVideoKamuHebat){
        dispatch(setProgressBar(progressBar + 1));
      }
      return;
    }
    setCurrentIndex(next);
    emblaRef.current?.scrollTo(next);
    speak(`Yang manakah yang dinamakan ${data.items[next].content}?`);
  }, [playVideoKamuHebat]);
  return (
    <Box key={`${index}-${data.title}`}>
        <Text
          p={5}
          style={{
            textAlign: "center",
            fontSize: 20,
            color: theme.colors.lime[9],
            textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white'
          }}
        >
          {data.title}
        </Text>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              pointerEvents: isDragging ? 'all' : 'none',
            }}
          />
          <div
            id="embla-carousel-wrapper"
            style={{ touchAction: isDragging ? 'none' : 'pan-y' }}
          >
            <MatchingSlideTheme
              r={data.items[currentIndex]}
              options={optionsState}
              onCorrectAnswer={() => handleCorrectAnswer(currentIndex)}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            />
          </div>
        </div>
    </Box>
  );
};

export default MatchingTheme;