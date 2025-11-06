import { BackgroundImage, Box, Center, Container, Grid, Group, Stack, Text, useMantineTheme, Image, Card, Button } from '@mantine/core';
import PublicLayout from '@/components/public/PublicLayout';
import { useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';

interface PublicHomePageProps {
  setMode: () => void
}

const PublicHomePage = ({setMode} : PublicHomePageProps) => {
  const theme = useMantineTheme();
  const { isExtraSmall, isSmall, isMedium, isLarge, isDesktop, isExtraLarge } = useAppSelector((state) => state.general )
  const fontSizeHeader = isExtraSmall || isSmall ? 30 : isMedium ? 40 : isLarge || isDesktop ||isExtraLarge ? 50 : 0
  const fontSizeContent = isExtraSmall || isSmall ? 20 : isMedium ? 25 : isLarge || isDesktop ||isExtraLarge ? 30 : 0
  const justifyFirstItem = isExtraSmall || isSmall || isMedium || isLarge || isDesktop ? 'center' : isExtraLarge ? 'flex-end' : ''
  const justifySecondItem = isExtraSmall || isSmall || isMedium || isLarge || isDesktop ? 'center' : isExtraLarge ? 'flex-start' : ''

  return (
    <PublicLayout setMode={setMode}>
      <Container fluid p={0}>
        <Stack gap={0}>
          <Box>
            <BackgroundImage
              src="/bgcontent-2.jpeg"
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  zIndex: 1,
                }}
              />
                <Grid style={{position: 'relative', zIndex: 2}}>
                  <Grid.Col span={{lg: 6, md: 12, sm: 12}} h={{lg: 500, md: 300, sm: 200}} style={{justifyItems: justifyFirstItem, alignContent: 'center'}}>
                    <Box>
                      <Text style={{color: theme.colors.blue[9], fontSize: fontSizeHeader}}>
                        🌈 Belajar 
                      </Text>
                      <Text style={{fontSize: fontSizeContent, fontFamily: 'child-hood'}}>
                        Jadi Petualangan Seru!
                      </Text>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{lg: 6, md: 12, sm: 12}} h={{lg: 500, md: 300, sm: 200}} style={{justifyItems: justifySecondItem, alignContent: 'center', paddingLeft: 30}}>
                      <Box p={10}>
                        <Group>
                          <Image src='/no-bg-2.png' style={{width: 200}} />
                          <Text style={{fontSize: fontSizeContent, fontFamily: 'child-hood', color: theme.colors.pink[9]}}>
                            Yuk jelajahi kegiatan seru <br />
                            yang bikin imajinasi makin luas.<br /> 
                          </Text>
                        </Group>
                      </Box>
                  </Grid.Col>
                </Grid>
            </BackgroundImage>
          </Box>
          <Box>
            <BackgroundImage
              src="/gradient-2.jpeg"
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  zIndex: 1,
                }}
              />
              <Box style={{ position: 'relative', zIndex: 2 }}>
                <Center py={40}>
                  <Text style={{ fontSize: fontSizeHeader, color: theme.colors.indigo[9]}}>
                    ✏️ Fitur
                  </Text>
                </Center>
                <Grid justify="center" gutter="xl" px={40} pb={60}>
                  <Grid.Col span={{ lg: 4, md: 6, sm: 12 }}>
                    <Card shadow="sm" radius="lg" p="md" withBorder>
                      <Card.Section>
                        <Image src="/no-bg-read.png" alt="Belajar Membaca" height={200} fit='contain' />
                      </Card.Section>
                      <Text mt="md" fw={700}>
                        📖 Belajar Membaca
                      </Text>
                      <Text size="sm" mt="xs" c="dimmed">
                        Ayo kenali huruf-huruf lucu dan bentuk kata sederhana lewat permainan interaktif.
                      </Text>
                      <Button mt="md" color="blue" variant="light">Mulai</Button>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={{ lg: 4, md: 6, sm: 12 }}>
                    <Card shadow="sm" radius="lg" p="md" withBorder>
                      <Card.Section>
                        <Image src="/no-bg-write.png" alt="Belajar Menulis" height={200} fit='contain' />
                      </Card.Section>
                      <Text mt="md" fw={700}>
                        ✍️ Belajar Menulis
                      </Text>
                      <Text size="sm" mt="xs" c="dimmed">
                        Tulis huruf dan angka dengan panduan langkah demi langkah yang menyenangkan.
                      </Text>
                      <Button mt="md" color="pink" variant="light">Mulai</Button>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={{ lg: 4, md: 6, sm: 12 }}>
                    <Card shadow="sm" radius="lg" p="md" withBorder>
                      <Card.Section>
                        <Image src="/no-bg-counting.png" alt="Belajar Berhitung" height={200} fit='contain' />
                      </Card.Section>
                      <Text mt="md" fw={700}>
                        🔢 Belajar Berhitung
                      </Text>
                      <Text size="sm" mt="xs" c="dimmed">
                        Hitung benda, mainkan angka, dan temukan keseruan belajar matematika dasar!
                      </Text>
                      <Button mt="md" color="teal" variant="light">Mulai</Button>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Box>
            </BackgroundImage>
          </Box>
        </Stack>
      </Container>
    </PublicLayout>
  );
};

export default PublicHomePage;