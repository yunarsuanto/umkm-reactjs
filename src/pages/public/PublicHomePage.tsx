import { BackgroundImage, Box, Center, Container, Grid, Group, Stack, Text, useMantineTheme, Image, Card, Button } from '@mantine/core';
import PublicLayout from '@/components/public/PublicLayout';
import { useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate()
  return (
    <PublicLayout setMode={setMode}>
      <Container fluid p={0}>
        <Stack gap={0}>
          <Box id='home'>
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
                  <Grid.Col span={{lg: 6, md: 6, sm: 12}} h={{lg: 500, md: 300, sm: 200}} style={{justifyItems: justifyFirstItem, alignContent: 'center'}}>
                    <Box>
                      <Text style={{color: theme.colors.blue[9], fontSize: fontSizeHeader}}>
                        🌈 Belajar 
                      </Text>
                      <Stack>
                        <Text style={{fontSize: fontSizeContent, fontFamily: 'child-hood'}}>
                          Jadi Petualangan Seru!
                        </Text>
                        <Button variant='filled' color='pink' onClick={() => {
                          navigate('/play')
                        }}>
                          <Text style={{fontSize: '20px'}}>
                            Mainkan
                          </Text>
                        </Button>
                      </Stack>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{lg: 6, md: 6, sm: 12}} h={{lg: 500, md: 300, sm: 200}} style={{justifyItems: justifySecondItem, alignContent: 'center', paddingLeft: 30}}>
                      <Box p={10}>
                          <Image src='/no-bg-2.png' style={{width: 200}} />
                          <Group>
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
          <Box id='feature'>
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
                  <Text style={{ fontSize: fontSizeContent, color: theme.colors.grape[9]}}>
                    Fitur
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
          <Box id='about'>
            <Card style={{textAlign: 'center'}}>
              <Card.Section>
                <Center py={40}>
                  <Text style={{ fontSize: fontSizeContent, color: theme.colors.orange[9]}}>
                    Tentang Kami
                  </Text>
                </Center>
              </Card.Section>
              <Text mt="md">
                Kami adalah tim kreatif yang percaya belajar bisa jadi petualangan seru.
              </Text>
              <Text mt="md" c="dimmed">
                Dengan berbagai fitur interaktif,
              </Text>
              <Text mt="md">
                kami ingin membuat anak-anak menikmati belajar sambil mengeksplorasi imajinasi mereka.
              </Text>
              <Text mt="md" c="dimmed">
                Belajar membaca, menulis, dan berhitung jadi lebih menyenangkan dan penuh warna!
              </Text>
            </Card>
          </Box>
          <Box id='contact'>
            <Card style={{textAlign: 'center'}}>
              <Card.Section>
                <Center py={40}>
                  <Text style={{ fontSize: fontSizeContent, color: theme.colors.green[9]}}>
                    Kontak
                  </Text>
                </Center>
              </Card.Section>
              <Text mt="md">
                Email: yokila@gmail.com
              </Text>
              <Text mt="md" c="dimmed">
                Whatsapp: 087799749729
              </Text>
              <Text mt="md">
                Tuliskan Saran dan Kritik Anda Ke Email / Whatsapp Kami
              </Text>
            </Card>
          </Box>
          {/* <Box>
            <BackgroundImage
              src="/savana.jpeg"
            >
              
              <Box style={{ position: 'relative', zIndex: 2 }}>
                <Center py={40}>
                  <Text style={{ fontSize: fontSizeHeader, color: theme.colors.red[9]}}>
                    Sample
                  </Text>
                </Center>
                <Grid justify="center" gutter="xl" px={40} pb={60} style={{textAlign: 'center'}}>
                  <Grid.Col span={{ lg: 4, md: 6, sm: 12 }}>
                    <video 
                      src="/gajah.webm"
                      autoPlay
                      muted
                      loop
                      style={{
                        width: 300,
                        objectPosition: 'center center',
                      }}
                      onClick={() => {
                        speak('gajah')
                      }}
                    />
                    <Text style={{color: theme.colors.blue[9], fontSize: 30}}>
                      Gajah
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={{ lg: 4, md: 6, sm: 12 }} onClick={() => {
                    speak('jerapah')
                  }}>
                    <video 
                      src="/jerapah.webm"
                      autoPlay
                      muted
                      loop
                      style={{
                        width: 300,
                        objectPosition: 'center center',
                      }}
                    />
                    <Text style={{color: theme.colors.blue[9], fontSize: 30}}>
                      jerapah
                    </Text>
                  </Grid.Col>
                </Grid>
              </Box>
            </BackgroundImage>
          </Box> */}
        </Stack>
      </Container>
    </PublicLayout>
  );
};

export default PublicHomePage;