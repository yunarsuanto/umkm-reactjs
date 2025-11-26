import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useDeviceMode } from "@/constants/dimension";
import speak from "@/constants/speak";
import { setPlayVideoKamuHebat, setPlayVideoUhSalah } from "@/features/generalSlice";
import { Carousel } from "@mantine/carousel";
import { Box, Grid, Group, Text } from "@mantine/core";
import { useEffect } from "react";

interface IdentificationSlideThemeProps {
  r: any;
  options: any[]; 
  theme: any;
  onCorrectAnswer: () => void;
}

const IdentificationSlideTheme = ({ r, options, theme, onCorrectAnswer }: IdentificationSlideThemeProps) => {
  const dispatch = useAppDispatch();
  const { device, orientation } = useDeviceMode();
  const HEADER_STYLE: any = {
    "mobile-small": { font: 15, height: 180 },
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

  const CheckItem = (first: string, second: string) => {
    if(first === second) {
      onCorrectAnswer()
    }else{
      dispatch(setPlayVideoUhSalah(true))
    }
  }
  return (
    <Carousel.Slide style={{ display:"flex", justifyContent: 'space-around' }}>
      <Grid justify={'center'} align={'center'} style={{textAlign: 'center'}}>
        {options.map((opt, idx) => (
          <Grid.Col span={orientation === 'portrait' ? 6 : 4} key={idx} style={{display: 'flex', justifyContent: 'center'}}>
            <div
              style={{
                maxHeight: headerStyle.height + 60,
                maxWidth: "100%",
              }}
            >  
              <video
                src={`${import.meta.env.VITE_API_IMAGE_URL}${opt.media}`}
                autoPlay
                muted
                loop
                playsInline
                style={{ maxHeight: headerStyle.height }}
                onClick={() => {
                  CheckItem(r.content, opt.content)
                }}
              />
              <Text
                style={{
                  fontSize: headerStyle.font,
                  color: theme.colors.blue[9],
                  textShadow: '1px 1px 0px white, -1px 1px 0px white, 1px -1px 0px white, -1px -1px 0px white'
                }}
              >
                {opt.content}
              </Text>
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </Carousel.Slide>
  )
};

export default IdentificationSlideTheme;