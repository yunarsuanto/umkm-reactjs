import { BackgroundImage, Box, Button, Card, Container, Grid, Group, Progress, Stack, Text, useMantineTheme, Image, Flex } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import PublicLayout from '@/components/public/PublicLayout';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { setDataPagination, setPaginationSearch } from '@/features/paginationSlice';
import speak from '@/constants/speak';
import { useCategoryLessonsPublic } from '@/hooks/useCategoryLessonsPublic';
import randomColor from '@/constants/color';
import { setPlayVideo, setProgressBar } from '@/features/generalSlice';
import YokilaAyo from '@/components/Layout/YokilaAyo';
import YokilaUhSalah from '@/components/Layout/YokilaUhSalah';
import YokilaSelamatGabung from '@/components/Layout/YokilaSelamatGabung';
import YokilaKemonAyolah from '@/components/Layout/YokilaKemonAyolah';
import YokilaJagonyaKamuHebat from '@/components/Layout/YokilaJagonyaKamuHebat';

interface PlayPageProps {
  setMode: () => void
}

const PlayPage = ({setMode} : PlayPageProps) => {
  const theme = useMantineTheme();
  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const {progressBar, playVideo} = useAppSelector((state) => state.general);
  const queryOptions = useMemo(() => ({
    enabled: true,
  }), [pagination.page]);
  const { data } = useCategoryLessonsPublic(pagination, {}, queryOptions)
  
  const dispatch = useAppDispatch()
  const { isExtraSmall, isSmall, isMedium, isLarge, isDesktop, isExtraLarge } = useAppSelector((state) => state.general )
  const fontSizeHeader = isExtraSmall || isSmall ? 30 : isMedium ? 40 : isLarge || isDesktop ||isExtraLarge ? 50 : 0
  const fontSizeContent = isExtraSmall || isSmall ? 20 : isMedium ? 25 : isLarge || isDesktop ||isExtraLarge ? 30 : 0
  const justifyFirstItem = isExtraSmall || isSmall || isMedium || isLarge || isDesktop ? 'center' : isExtraLarge ? 'flex-end' : ''
  const justifySecondItem = isExtraSmall || isSmall || isMedium || isLarge || isDesktop ? 'center' : isExtraLarge ? 'flex-start' : ''
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setProgressBar(1))
    dispatch(setPlayVideo(true))
  }, [])
  return (
    <PublicLayout setMode={setMode}>
      <Container fluid p={0}>
        <Stack gap={0}>
          {/* {playVideo && (
            <>
              <YokilaSelamatGabung play={playVideo} />
            </>
          )} */}
          <Box>
            {data && data.data && data.data.lessons && data.data.lessons.length > 0 && progressBar > 0 && (
              <BackgroundImage
                src={`${import.meta.env.VITE_API_IMAGE_URL}${data?.data.lessons[(progressBar - 1)].media}`}
                style={{
                  // contain: 'layout',
                  border: '0px',
                  minHeight: 'cal(100vh - 60px)',
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
                  <Flex justify="center" align="center" py={20}>
                    <Card shadow="sm" padding="lg" radius="md" style={{width: '50%'}}>
                      <Flex justify="space-around" align="center">
                        <Image
                          src={`${import.meta.env.VITE_API_IMAGE_URL}${data?.data.media}`}
                          radius="md"
                          alt={`${data?.data.title}`}
                          style={{width: 100}}
                        />
                        <Text p={5} style={{textAlign: 'center', fontSize: 30, color: theme.colors.red[9]}}>
                          {data?.data.title}
                        </Text>
                      </Flex>
                    </Card>
                  </Flex>
                  {data && data.data.lessons.map((row, index) => {
                    if (progressBar === row.level) {
                      return (
                        <Box key={`${index}-${row.title}`}>
                          <Text p={5} style={{textAlign: 'center', fontSize: 30, color: theme.colors.lime[9]}}>
                            {row.title}
                          </Text>
                          <Carousel
                            slideSize="33%"
                            slideGap="md"
                            height={'100%'}
                            emblaOptions={{
                              loop: true,
                              align: 'start',
                            }}
                            p={10}
                          >
                            {row.items && row.items.map((r, i) => {
                              return (
                                <Carousel.Slide key={`${i}-${r.content}`} onClick={() => {speak(r.content)}} style={{textAlign: 'center'}}>
                                  <Box>
                                    <video
                                      src={`${import.meta.env.VITE_API_IMAGE_URL}${r.media}`}
                                      autoPlay
                                      muted
                                      loop
                                      playsInline
                                      style={{
                                        maxHeight: '350px',
                                      }}
                                    />
                                    <Text style={{fontSize: 30, color: theme.colors.blue[9]}}>{r.content}</Text>
                                  </Box>
                                </Carousel.Slide>
                              )
                            })}
                          </Carousel>
                        </Box>
                      )
                    }
                  })}
                </Box>
              </BackgroundImage>
            )}
          </Box>
          <Box component="footer"
            style={{
              backgroundColor: theme.colors.green[0],
              padding: '1rem',
              textAlign: 'center',
              position: 'fixed',
              bottom: 0,
              width: '100%',
              zIndex: 2,
            }}
          >
            <Grid>
              <Grid.Col span={10}>
                <Progress.Root color="red" style={{height: 20}}>
                  {data && data.data.lessons.map((row, index) => {
                      const isDone = row.level <= progressBar;
                      const color = isDone ? randomColor.randomBoldColor() : theme.colors.gray[3];
                      return (
                        <Progress.Section value={100 / data.data.lessons.length} color={color} key={index}>
                          <Progress.Label style={{fontSize: 15}}>{row.level}</Progress.Label>
                        </Progress.Section>
                      )
                  })}
                </Progress.Root>
              </Grid.Col>
              <Grid.Col span={2}>
                <Button variant='subtle' style={{width: '100%'}} onClick={() => {
                  dispatch(setProgressBar(progressBar + 1))
                }} disabled={progressBar === data?.data.lessons.length}>
                  {progressBar === data?.data.lessons.length ? (
                    <Text style={{fontSize: 30}}>
                      Selesai
                    </Text>
                  ) : (
                    <Text style={{fontSize: 30}}>
                      Lanjutkan
                    </Text>  
                  )}
                </Button>
              </Grid.Col>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </PublicLayout>
  );
};

export default PlayPage;