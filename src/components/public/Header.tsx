import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Image,
  rgba,
  BackgroundImage,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from '@/index.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setMode } from '../../features/generalSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDeviceMode } from '@/constants/dimension';
import { useEffect } from 'react';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of its tail is sticky and sweet',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'It is known to hide in holes in trees and rocks',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon has a tranquil nature',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
];

interface HeaderProps {
  setModeHeader: () => void;
}

export function Header({ setModeHeader } : HeaderProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const {token, role} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { device, orientation } = useDeviceMode();

  const HEADER_STYLE: any = {
    "mobile-small": { font: 15, height: 60, paddingLeft: 0 },
    "mobile-medium": { font: 16, height: 65, paddingLeft: 0 },
    "mobile-medium-plus": { font: 17, height: 65, paddingLeft: 10 },
    "mobile-large": { font: 18, height: 70, paddingLeft: 10 },

    "tablet": { font: 20, height: 70, paddingLeft: 10 },
    "tablet-large": { font: 20, height: 75, paddingLeft: 15 },
    "tablet-extra-large": { font: 20, height: 75, paddingLeft: 20 },

    "laptop": { font: 22, height: 80, paddingLeft: 20 },
    "laptop-standart": { font: 22, height: 80, paddingLeft: 50 },
    "laptop-large": { font: 22, height: 80, paddingLeft: 100 },
    "laptop-extra-large": { font: 22, height: 80, paddingLeft: 120 },

    "desktop": { font: 25, height: 120, paddingLeft: 150 },
    "desktop-large": { font: 25, height: 120, paddingLeft: 180 },

    "4k": { font: 50, height: 150, paddingLeft: 200 },
  };

  const ORIENTATION_STYLE: any = {
    portrait: {
      fontMultiplier: 1,
      heightMultiplier: 1,
      paddingLeftMultiplier: 1,
    },
    landscape: {
      fontMultiplier: 1,
      heightMultiplier: 1,
      paddingLeftMultiplier: 1,
    },
  };

  const headerBase = HEADER_STYLE[device];
  const orient = ORIENTATION_STYLE[orientation];
  
  const headerStyle = {
    font: headerBase.font * orient.fontMultiplier,
    height: headerBase.height * orient.heightMultiplier,
    paddingLeft: headerBase.paddingLeft * orient.paddingLeftMultiplier,
  };

  return (
    <Box pb={headerStyle.height}>
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        maxWidth: '100%',
        zIndex: 1000,
        backgroundColor: theme.colors.green[0],
        height: headerStyle.height,
        padding: 10,
        boxSizing: 'border-box',
      }}>
        <Group justify="space-between" h="100%">
          <Box style={{height: '100%', paddingLeft: headerStyle.paddingLeft}}>
            <Button component={Link} to={'/'} variant="subtle" color='lime' p={5} style={{height: '100%'}}>
              <Image
                src={`/logo.png`}
                alt={'cecep'}
                height={'100%'}
                fit="cover"
              />
            </Button>
          </Box>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Button component={Link} to={'/#home'} variant="subtle" color='lime' py={0} px={5} style={{height: '100%'}}>
              <Text style={{fontSize: headerStyle.font}}>
                Beranda
              </Text>
            </Button>
            <Button component={Link} to='/#feature' variant="subtle" color='yellow' py={0} px={5} style={{height: '100%'}}>
              <Text style={{fontSize: headerStyle.font}}>
                Fitur
              </Text>
            </Button>
            <Button variant="subtle" component={Link} to='/#about' color='blue' py={0} px={5} style={{height: '100%'}}>
              <Text style={{fontSize: headerStyle.font}}>
                Tentang Kami
              </Text>
            </Button>
            <Button variant="subtle" component={Link} to='/#contact' color='pink' py={0} px={5} style={{height: '100%'}}>
              <Text style={{fontSize: headerStyle.font}}>
                Kontak
              </Text>
            </Button>
          </Group>
          {token && (role === 'admin' || role === 'superadmin') && (
            <Group visibleFrom="sm">
              <Button variant="default" 
                onClick={() => {
                  closeDrawer();
                  dispatch(setMode('admin'))
                  navigate('/admin')
                }}
                py={0} pr={5}
                style={{height: '100%'}}
              >
                <Text style={{fontSize: headerStyle.font}}>
                  Admin
                </Text>
              </Button>
            </Group>
          )}
          {token && role === 'user' && (
            <Group visibleFrom="sm">
              <Button variant="default" 
                onClick={() => {
                  closeDrawer();
                  dispatch(setMode('user'))
                  navigate('/user')
                }}
                py={0} pr={5}
                style={{height: '100%'}}
              >
                <Text style={{fontSize: headerStyle.font}}>
                  User
                </Text>
              </Button>
            </Group>
          )}
          {!token && (
            <Group visibleFrom="sm">
              <Button variant="subtle" color='cyan' 
                onClick={() => {
                  closeDrawer();
                  setModeHeader() 
                  navigate('/login')
                }}
                py={0} pr={5}
                style={{height: '100%'}}
              >
                <Text style={{fontSize: headerStyle.font}}>
                  Log in
                </Text>
              </Button>
              <Button variant="filled" color='pink' 
                onClick={() => {
                  closeDrawer();
                  setModeHeader()
                  navigate('/register')
                }}
                py={0} pr={5}
                style={{height: '100%'}}
              >
                <Text style={{fontSize: headerStyle.font}}>
                  Register
                </Text>
              </Button>
            </Group>
          )}
        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        title="Yokila"
        style={{fontFamily: 'howdybun', fontSize: headerStyle.font}}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Button variant="subtle" component={Link} to={'/#home'} color='lime' py={0} px={10}>
            <Text style={{fontSize: headerStyle.font, fontFamily: 'howdybun'}}>
              Beranda
            </Text>
          </Button>
          <Button variant="subtle" component={Link} to={'/#feature'} color='yellow' py={0} px={10}>
            <Text style={{fontSize: headerStyle.font, fontFamily: 'howdybun'}}>
              Fitur
            </Text>
          </Button>
          <Button variant="subtle" component={Link} to={'/#about'} color='blue' py={0} px={10}>
            <Text style={{fontSize: headerStyle.font, fontFamily: 'howdybun'}}>
              Tentang Kami
            </Text>
          </Button>
          <Button variant="subtle" component={Link} to={'/#contact'} color='pink' py={0} px={10}>
            <Text style={{fontSize: headerStyle.font, fontFamily: 'howdybun'}}>
              Kontak
            </Text>
          </Button>
          <Divider my="sm" />
          {token && role === 'admin' && (
            <Button variant="default" onClick={() => {
              dispatch(setMode('admin'))
              navigate('/admin')
            }}>
              <Text style={{fontSize: headerStyle.font, fontFamily: 'howdybun'}}>
                Admin
              </Text>
            </Button>
          )}
          {token && role === 'user' && (
            <Button variant="default" onClick={() => {
              dispatch(setMode('user'))
              navigate('/user')
            }}>
              <Text style={{fontSize: headerStyle.font, fontFamily: 'howdybun'}}>
                User
              </Text>
            </Button>
          )}
          {!token && (
            <div>
              <Button variant="subtle" color='cyan' style={{margin: 5}}
              onClick={() => {
                closeDrawer();
                setModeHeader() 
                navigate('/login')
              }}>
                <Text style={{fontSize: headerStyle.font, fontFamily: 'howdybun'}}>
                  Log in
                </Text>
              </Button>
              <Button variant="filled" color='pink' style={{margin: 5}}
              onClick={() => {
                closeDrawer();
                setModeHeader()
                navigate('/register')
              }}>
                <Text style={{fontSize: headerStyle.font, fontFamily: 'howdybun'}}>
                  Register
                </Text>
              </Button>
            </div>
          )}
          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
