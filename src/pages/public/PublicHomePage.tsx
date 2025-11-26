import { BackgroundImage, Box, Center, Container, Grid, Group, Stack, Text, useMantineTheme, Image, Card, Button } from '@mantine/core';
import PublicLayout from '@/components/public/PublicLayout';
import { useNavigate } from 'react-router-dom';
import { useDeviceMode } from '@/constants/dimension';
import { useEffect } from 'react';

interface PublicHomePageProps {
  setMode: () => void
}

const PublicHomePage = ({setMode} : PublicHomePageProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate()
  const { device, orientation } = useDeviceMode();
  
  const HEADER_STYLE: any = {
    "mobile-small": { font: 20, heightFirst: 200, heightSecond: 350, paddingLeft: 0 },
    "mobile-medium": { font: 20, heightFirst: 220, heightSecond: 360, paddingLeft: 0 },
    "mobile-medium-plus": { font: 22, heightFirst: 230, heightSecond: 370, paddingLeft: 0 },
    "mobile-large": { font: 25, heightFirst: 240, heightSecond: 380, paddingLeft: 0 },

    "tablet": { font: 28, heightFirst: 250, heightSecond: 400, paddingLeft: 10 },
    "tablet-large": { font: 30, heightFirst: 260, heightSecond: 420, paddingLeft: 15 },
    "tablet-extra-large": { font: 32, heightFirst: 270, heightSecond: 440, paddingLeft: 20 },

    "laptop": { font: 35, heightFirst: 280, heightSecond: 460, paddingLeft: 20 },
    "laptop-standart": { font: 38, heightFirst: 300, heightSecond: 480, paddingLeft: 50 },
    "laptop-large": { font: 40, heightFirst: 320, heightSecond: 500, paddingLeft: 100 },
    "laptop-extra-large": { font: 42, heightFirst: 340, heightSecond: 520, paddingLeft: 120 },

    "desktop": { font: 45, heightFirst: 360, heightSecond: 550, paddingLeft: 150 },
    "desktop-large": { font: 48, heightFirst: 380, heightSecond: 580, paddingLeft: 180 },

    "4k": { font: 50, heightFirst: 400, heightSecond: 600, paddingLeft: 200 },
  };

  const CONTENT_STYLE: any = {
    "mobile-small": { font: 12 },
    "mobile-medium": { font: 13 },
    "mobile-medium-plus": { font: 13 },
    "mobile-large": { font: 15 },

    "tablet": { font: 17 },
    "tablet-large": { font: 17 },
    "tablet-extra-large": { font: 17 },

    "laptop": { font: 20 },
    "laptop-standart": { font: 20 },
    "laptop-large": { font: 25 },
    "laptop-extra-large": { font: 25 },

    "desktop": { font: 30 },
    "desktop-large": { font: 30 },

    "4k": { font: 35 },
  };
  
  const ORIENTATION_STYLE: any = {
    portrait: {
      fontMultiplier: 1,
      heightMultiplier: 1,
      paddingLeftMultiplier: 1,
    },
    landscape: {
      fontMultiplier: 1.2,
      heightMultiplier: 1,
      paddingLeftMultiplier: 1.2,
    },
  };

  const headerBase = HEADER_STYLE[device];
  const contentBase = CONTENT_STYLE[device];
  const orient = ORIENTATION_STYLE[orientation];

  const headerStyle = {
    font: headerBase.font * orient.fontMultiplier,
    heightFirst: headerBase.heightFirst * orient.heightMultiplier,
    heightSecond: headerBase.heightSecond * orient.heightMultiplier,
    paddingLeft: headerBase.paddingLeft,
  };
  
  const contentStyle = {
    font: contentBase.font * orient.fontMultiplier,
  };

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
                  <Grid.Col 
                    span={{lg: 6, md: 6, sm: 12}} 
                    style={{
                      justifyItems: 'center', 
                      alignContent: 'center',
                      height: headerStyle.heightFirst,
                    }}
                  >
                    <Box>
                      <Text style={{color: theme.colors.blue[9], fontSize: headerStyle.font}}>
                        🌈 Belajar 
                      </Text>
                      <Stack>
                        <Text style={{fontSize: headerStyle.font, fontFamily: 'child-hood'}}>
                          Jadi Petualangan Seru!
                        </Text>
                        <Button variant='filled' color='pink' 
                          onClick={() => {
                            navigate('/play')
                          }}
                          style={{height: '100%'}}
                        >
                          <Text style={{fontSize: headerStyle.font}}>
                            Mainkan
                          </Text>
                        </Button>
                      </Stack>
                    </Box>
                  </Grid.Col>
                  <Grid.Col 
                    span={{lg: 6, md: 6, sm: 12}} 
                    style={{
                      justifyItems: 'center', 
                      alignContent: 'center',
                      height: headerStyle.heightSecond,
                    }}
                  >
                    <Box p={10}>
                        <Image src='/no-bg-2.png' style={{width: 200}} />
                        <Group>
                          <Text style={{fontSize: headerStyle.font, fontFamily: 'child-hood', color: theme.colors.pink[9]}}>
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
                  <Text style={{ fontSize: headerStyle.font, color: theme.colors.grape[9]}}>
                    Fitur
                  </Text>
                </Center>
                <Grid justify="center" gutter="xl" px={40} pb={60}>
                  <Grid.Col span={{ lg: 4, md: 6, sm: 12 }}>
                    <Card shadow="sm" radius="lg" p="md" withBorder>
                      <Card.Section>
                        <Image src="/no-bg-read.png" alt="Belajar Membaca" height={200} fit='contain' style={{paddingTop: 10}} />
                      </Card.Section>
                      <Text mt="md" fw={700} style={{fontSize: contentStyle.font}}>
                        📖 Belajar Membaca
                      </Text>
                      <Text size="sm" mt="xs" c="dimmed" style={{fontSize: contentStyle.font}}>
                        Ayo kenali huruf-huruf lucu dan bentuk kata sederhana lewat permainan interaktif.
                      </Text>
                      <Button mt="md" color="blue" variant="light" style={{fontSize: contentStyle.font, height: '100%', padding: 5}}>Mulai</Button>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={{ lg: 4, md: 6, sm: 12 }}>
                    <Card shadow="sm" radius="lg" p="md" withBorder>
                      <Card.Section>
                        <Image src="/no-bg-write.png" alt="Belajar Menulis" height={200} fit='contain' style={{paddingTop: 10}} />
                      </Card.Section>
                      <Text mt="md" fw={700} style={{fontSize: contentStyle.font}}>
                        ✍️ Belajar Menulis
                      </Text>
                      <Text size="sm" mt="xs" c="dimmed" style={{fontSize: contentStyle.font}}>
                        Tulis huruf dan angka dengan panduan langkah demi langkah yang menyenangkan.
                      </Text>
                      <Button mt="md" color="pink" variant="light" style={{fontSize: contentStyle.font, height: '100%', padding: 5}}>Mulai</Button>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={{ lg: 4, md: 6, sm: 12 }}>
                    <Card shadow="sm" radius="lg" p="md" withBorder>
                      <Card.Section>
                        <Image src="/no-bg-counting.png" alt="Belajar Berhitung" height={200} fit='contain' style={{paddingTop: 10}} />
                      </Card.Section>
                      <Text mt="md" fw={700} style={{fontSize: contentStyle.font}}>
                        🔢 Belajar Berhitung
                      </Text>
                      <Text size="sm" mt="xs" c="dimmed" style={{fontSize: contentStyle.font}}>
                        Hitung benda, mainkan angka, dan temukan keseruan belajar matematika dasar!
                      </Text>
                      <Button mt="md" color="teal" variant="light" style={{fontSize: contentStyle.font, height: '100%', padding: 5}}>Mulai</Button>
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
                  <Text style={{ fontSize: headerStyle.font, color: theme.colors.orange[9]}}>
                    Tentang Kami
                  </Text>
                </Center>
              </Card.Section>
              <Text mt="md" style={{fontSize: contentStyle.font}}>
                Kami adalah tim kreatif yang percaya belajar bisa jadi petualangan seru.
              </Text>
              <Text mt="md" c="dimmed" style={{fontSize: contentStyle.font}}>
                Dengan berbagai fitur interaktif,
              </Text>
              <Text mt="md" style={{fontSize: contentStyle.font}}>
                kami ingin membuat anak-anak menikmati belajar sambil mengeksplorasi imajinasi mereka.
              </Text>
              <Text mt="md" c="dimmed" style={{fontSize: contentStyle.font}}>
                Belajar membaca, menulis, dan berhitung jadi lebih menyenangkan dan penuh warna!
              </Text>
            </Card>
          </Box>
          <Box id='contact'>
            <Card style={{textAlign: 'center'}}>
              <Card.Section>
                <Center py={40}>
                  <Text style={{ fontSize: headerStyle.font, color: theme.colors.green[9]}}>
                    Kontak
                  </Text>
                </Center>
              </Card.Section>
              <Text mt="md" style={{fontSize: contentStyle.font}}>
                Email: yokila@gmail.com
              </Text>
              <Text mt="md" c="dimmed" style={{fontSize: contentStyle.font}}>
                Whatsapp: 087799749729
              </Text>
              <Text mt="md" style={{fontSize: contentStyle.font}}>
                Tuliskan Saran dan Kritik Anda Ke Email / Whatsapp Kami
              </Text>
            </Card>
          </Box>
        </Stack>
      </Container>
    </PublicLayout>
  );
};

export default PublicHomePage;