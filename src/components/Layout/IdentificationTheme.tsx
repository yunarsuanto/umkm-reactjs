import getRandomOptions from "@/constants/random_option";
import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { Carousel } from "@mantine/carousel";
import { Box, Flex, Grid, Group, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import IdentificationSlideTheme from "./IdentificationSlideTheme";
import { EmblaCarouselType } from "embla-carousel";
import { setPlayVideoKamuHebat, setProgressBar } from "@/features/generalSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useDeviceMode } from "@/constants/dimension";

interface IdentificationThemeProps {
  data: GetCategoryLessonPublicDataLessonResponse;
  index: number;
}

const IdentificationTheme = ({ data, index }: IdentificationThemeProps) => {
  const dispatch = useAppDispatch()
  const theme = useMantineTheme();
  
  const total = data.items.length;
  const {progressBar, playVideoKamuHebat} = useAppSelector((state) => state.general);
  const speakRef = useRef(false);
  const emblaRef = useRef<EmblaCarouselType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const handleSpeak = (slideIndex: number) => {
    const r = data.items[slideIndex];
    if (!r) return;
    speak(`Yang manakah yang dinamakan ${r.content}?`);
  };

  const handleCorrectAnswer = () => {
    dispatch(setPlayVideoKamuHebat(true));
  };

  useEffect(() => {
    if (!speakRef.current) {
      speakRef.current = true;
      if(progressBar !== 1){
        handleSpeak(0);
      }
    }
  }, []);
  
  useEffect(() => {
    if (playVideoKamuHebat) return;

    if (!playVideoKamuHebat) {
      const embla = emblaRef.current;
      if (!embla) return;

      if (currentIndex === total - 1) {
        dispatch(setProgressBar(progressBar + 1));
        return;
      }

      const next = currentIndex + 1;
      setCurrentIndex(next);
      embla.scrollTo(next);

      speak(`Yang manakah yang dinamakan ${data.items[next].content}?`);
    }
  }, [playVideoKamuHebat]);
  return (
    <Box key={`${index}-${data.title}`}>
      <Carousel
        slideSize="100%"
        height={"100%"}
        emblaOptions={{
          loop: false,
          align: "center",
          dragFree: false,
          watchDrag: false,
        }}
        key={`${index}-${data.title}`}
        withControls={false}
        draggable={false}
        getEmblaApi={(embla) => (emblaRef.current = embla)}
        p={5}
      >
        {data.items?.map((r, i) => {
          const options = getRandomOptions(data.items, r, 3);
          return (
            <IdentificationSlideTheme 
              key={`${i}-${r.content}`}
              r={r}
              options={options}
              theme={theme}
              onCorrectAnswer={handleCorrectAnswer}
            />
          )
        })}
      </Carousel>
    </Box>
  );
};

export default IdentificationTheme;