import { BackgroundImage, Box, Button, Card, Container, Grid, Group, Progress, Stack, Text, useMantineTheme, Center } from '@mantine/core';
import PublicLayout from '@/components/public/PublicLayout';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useCategoryLessonsPublic } from '@/hooks/useCategoryLessonsPublic';
import randomColor from '@/constants/color';
import { setProgressBar } from '@/features/generalSlice';
import YokilaUhSalah from '@/components/Layout/YokilaUhSalah';
import YokilaJagonyaKamuHebat from '@/components/Layout/YokilaJagonyaKamuHebat';
import RecognitionTheme from '@/components/Layout/RecognitionTheme';
import IdentificationTheme from '@/components/Layout/IdentificationTheme';
import MatchingTheme from '@/components/Layout/MatchingTheme';
import { useDeviceMode } from '@/constants/dimension';
import ClasificationTheme from '@/components/Layout/ClasificationTheme';
import SequenceTheme from '@/components/Layout/SequenceTheme';
import LoopingTheme from '@/components/Layout/LoopingTheme';

interface PlayPageProps {
  setMode: () => void
}

const PlayPage = ({setMode} : PlayPageProps) => {
  const navigate = useNavigate()
  const theme = useMantineTheme();
  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const {progressBar, playVideoKamuHebat, playVideoUhSalah} = useAppSelector((state) => state.general);
  const queryOptions = useMemo(() => ({
    enabled: true,
  }), [pagination.page]);
  const { data } = useCategoryLessonsPublic(pagination, {}, queryOptions)
  
  const dispatch = useAppDispatch()
  const { device, orientation } = useDeviceMode();

  const HEADER_STYLE: any = {
    "mobile-small": { font: 12 },
    "mobile-medium": { font: 16 },
    "mobile-medium-plus": { font: 17 },
    "mobile-large": { font: 18 },

    "tablet": { font: 20 },
    "tablet-large": { font: 20 },
    "tablet-extra-large": { font: 20 },

    "laptop": { font: 22 },
    "laptop-standart": { font: 22 },
    "laptop-large": { font: 22 },
    "laptop-extra-large": { font: 22 },

    "desktop": { font: 25 },
    "desktop-large": { font: 25 },

    "4k": { font: 50, height: 150, paddingLeft: 200 },
  };

  const ORIENTATION_STYLE: any = {
    portrait: {
      fontMultiplier: 1,
    },
    landscape: {
      fontMultiplier: 1.3,
    },
  };

  const headerBase = HEADER_STYLE[device];
  const orient = ORIENTATION_STYLE[orientation];

  const headerStyle = {
    font: headerBase.font * orient.fontMultiplier,
  };

  useEffect(() => {
    dispatch(setProgressBar(1))
  }, [])
  return (
    <PublicLayout setMode={setMode}>
      <Container fluid p={0}>
        <Stack gap={0}>
          {playVideoKamuHebat && (
            <YokilaJagonyaKamuHebat play={playVideoKamuHebat} />
          )}
          {playVideoUhSalah && (
            <YokilaUhSalah play={playVideoUhSalah} />
          )}
          <Box>
            {data && data.data && data.data.lessons && (data.data.lessons.length > 0 && progressBar > 0 && progressBar <= data.data.lessons.length) ? (
              <BackgroundImage
                src={`${import.meta.env.VITE_API_IMAGE_URL}${data?.data.lessons[(progressBar - 1)].media}`}
                style={{
                  border: '0px',
                  minHeight: '100vh',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <Grid p={5} style={{zIndex: 2, position: 'relative'}}>
                  <Grid.Col span={12} style={{justifyItems: 'center'}}>
                    <Card shadow="sm" padding="sm" radius="sm" style={{width: '50%', height: '100%'}}>
                      <Group justify='space-around'>
                          <Text p={2} style={{textAlign: 'center', fontSize: headerStyle.font, color: theme.colors.red[9]}}>
                            {data?.data.title}
                          </Text>
                      </Group>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={12} style={{justifyItems: 'center'}}>
                    {data?.data?.lessons
                      .filter(row => row.level === progressBar && row.lesson_type === 'recognition')
                      .map((row, index) => (
                        <RecognitionTheme data={row} index={index} key={index} />
                    ))}
                    {data?.data?.lessons
                      .filter(row => row.level === progressBar && row.lesson_type === 'identification')
                      .map((row, index) => (
                        <IdentificationTheme data={row} index={index} key={index} />
                    ))}
                    {data?.data?.lessons
                      .filter(row => row.level === progressBar && row.lesson_type === 'matching')
                      .map((row, index) => (
                        <MatchingTheme data={row} index={index} key={index} />
                    ))}
                    {data?.data?.lessons
                      .filter(row => row.level === progressBar && row.lesson_type === 'clasification')
                      .map((row, index) => (
                        <ClasificationTheme data={row} index={index} key={index} />
                    ))}
                    {(() => {
                      const filtered = data?.data?.lessons
                        .filter(row => row.level == progressBar && row.lesson_type === 'sequence');
                      return filtered.map((row, index) => (
                        <SequenceTheme data={row} index={index} key={index} />
                      ));
                    })()}
                    {(() => {
                      const filtered = data?.data?.lessons
                        .filter(row => row.level == progressBar && row.lesson_type === 'looping');
                      return filtered.map((row, index) => (
                        <LoopingTheme data={row} index={index} key={index} />
                      ));
                    })()}
                  </Grid.Col>
                </Grid>
              </BackgroundImage>
            ):(
              <BackgroundImage
                src={`${import.meta.env.VITE_API_IMAGE_URL}${data?.data?.media}`}
                style={{
                  contain: 'layout',
                  border: '0px',
                  height: 'calc(100vh - 60px)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  paddingBottom: '80px',
                }}
              >
                <Box
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    zIndex: 1,
                  }}
                />
                <Box style={{position: 'relative', zIndex: 2, alignItems: 'center'}}>
                  <Center style={{height: '100vh'}}>
                    <Text>Selesai</Text>
                  </Center>
                </Box>
              </BackgroundImage>
            )}
          </Box>
          <Box component="footer"
            style={{
              backgroundColor: theme.colors.green[0],
              textAlign: 'center',
              position: 'fixed',
              bottom: 0,
              width: '100%',
              zIndex: 2,
            }}
          >
            <Grid>
              <Grid.Col span={8}>
                <Progress.Root color="red" style={{height: '100%', padding: 5}}>
                  {data && data.data.lessons.map((row, index) => {
                      const isDone = row.level <= progressBar;
                      const color = isDone ? randomColor.randomBoldColor() : theme.colors.gray[3];
                      return (
                        <Progress.Section value={100 / data.data.lessons.length} color={color} key={index}>
                          <Progress.Label style={{fontSize: headerStyle.font}}>{row.level}</Progress.Label>
                        </Progress.Section>
                      )
                  })}
                </Progress.Root>
              </Grid.Col>
              <Grid.Col span={4}>
                {progressBar >= data?.data?.lessons?.length! ? (
                  <Button variant='subtle' style={{width: '100%', height: '100%'}} onClick={() => {
                    navigate('/')
                    dispatch(setProgressBar(0))
                  }}>
                    <Text style={{fontSize: headerStyle.font}}>
                      Kembali
                    </Text>  
                  </Button>
                ) : (
                  <Button variant='subtle' style={{width: '100%', height: '100%'}} onClick={() => {
                    if (progressBar < data?.data?.lessons?.length!) {
                      dispatch(setProgressBar(progressBar + 1));
                    }
                  }}>
                    <Text style={{fontSize: headerStyle.font}}>
                      Lanjut
                    </Text>  
                  </Button>
                )}
              </Grid.Col>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </PublicLayout>
  );
};

export default PlayPage;