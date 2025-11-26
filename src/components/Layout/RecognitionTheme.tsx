import { useAppSelector } from "@/app/hooks";
import chunkArray from "@/constants/chunk_array";
import { useDeviceMode } from "@/constants/dimension";
import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { Carousel } from "@mantine/carousel";
import { Box, Flex, Grid, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";

interface RecognitionThemeType {
  data: GetCategoryLessonPublicDataLessonResponse;
  index: number;
}

const RecognitionTheme = ({ data, index }: RecognitionThemeType) => {
  const { device, orientation } = useDeviceMode();
  const theme = useMantineTheme();
  
  const HEADER_STYLE: any = {
    "mobile-small": { font: 15, height: 160 },
    "mobile-medium": { font: 16, height: 200 },
    "mobile-medium-plus": { font: 17, height: 250 },
    "mobile-large": { font: 18, height: 270 },

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
    portrait: {
      fontMultiplier: 1,
      heightMultiplier: 1,
    },
    landscape: {
      fontMultiplier: 1.1,
      heightMultiplier: 0.9,
    },
  };

  const headerBase = HEADER_STYLE[device];
  const orient = ORIENTATION_STYLE[orientation];

  const headerStyle = {
    font: headerBase.font * orient.fontMultiplier,
    height: headerBase.height * orient.heightMultiplier,
  };

  const slides = chunkArray(data.items, 3);
  return (
    <Box key={`${index}-${data.title}`} style={{width: '100%'}}>
      {orientation === 'portrait' && (
        <Text
          style={{
            textAlign: "center",
            fontSize: headerStyle.font,
            color: theme.colors.lime[9],
            textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white'
          }}
        >
          {data.title}
        </Text>
      )}
      <Carousel
        slideSize="100%"
        slideGap="sm"
        height={"100%"}
        emblaOptions={{
          loop: true,
          align: "center",
        }}
        p={5}
      >
        {slides.map((group, slideIndex) => (
          <Carousel.Slide key={slideIndex}>
            <Grid justify={'center'} align={'center'} style={{textAlign: 'center'}}>
              {group.map((item, itemIndex) => (
                <Grid.Col span={orientation === 'portrait' ? 6 : 4} key={itemIndex} style={{display: 'flex', justifyContent: 'center'}}>
                  <div onClick={() => {
                    speak(item.content)
                  }} 
                    style={{
                      maxHeight: headerStyle.height + 60,
                      maxWidth: "100%",
                      borderRadius: 10,
                    }}
                  >
                    <video
                      src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ maxHeight: headerStyle.height }}
                    />
                    <Text
                      style={{
                        fontSize: headerStyle.font,
                        color: theme.colors.blue[9],
                        textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white'
                      }}
                    >
                      {item.content}
                    </Text>
                  </div>
                </Grid.Col>
              ))}
            </Grid>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  )
};

export default RecognitionTheme;