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
import classes from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setMode } from '../../features/generalSlice';
import { useNavigate } from 'react-router-dom';

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
  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    
    <Box pb={60}>
      <header className={classes.header} style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: theme.colors.green[0],
      }}>
        <Group justify="space-between" h="100%">
          <Box pl={20}>
            <Image
              src={`/logo.png`}
              alt={'cecep'}
              height={50}
              fit="cover"
            />
          </Box>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Button component='a' href={'/'} variant="subtle" color='lime' className={classes.link}>
              <Text style={{fontSize: '30px'}}>
                Home
              </Text>
            </Button>
            <Button variant="subtle" color='yellow' className={classes.link}>
              <Text style={{fontSize: '30px'}}>
                Learn
              </Text>
            </Button>
            <Button variant="subtle" color='blue' className={classes.link}>
              <Text style={{fontSize: '30px'}}>
                Academy
              </Text>
            </Button>
          </Group>
          {token && role === 'admin' && (
            <Group visibleFrom="sm">
              <Button variant="default" onClick={() => {
                dispatch(setMode('admin'))
                navigate('/admin')
              }}>
                <Text style={{fontSize: '20px'}}>
                  Admin
                </Text>
              </Button>
            </Group>
          )}
          {token && role === 'user' && (
            <Group visibleFrom="sm">
              <Button variant="default" onClick={() => {
                dispatch(setMode('user'))
                navigate('/user')
              }}>
                <Text style={{fontSize: '20px'}}>
                  User
                </Text>
              </Button>
            </Group>
          )}
          {!token && (
            <Group visibleFrom="sm">
              <Button variant="subtle" color='cyan' onClick={() => {
                setModeHeader() 
                navigate('/login')
              }}>
                <Text style={{fontSize: '20px'}}>
                  Log in
                </Text>
              </Button>
              <Button variant="filled" color='pink' onClick={() => {
                setModeHeader()
                navigate('/register')
              }}>
                <Text style={{fontSize: '20px'}}>
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
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Button variant="subtle" color='lime' className={classes.link}>
            <Text style={{fontSize: '20px'}}>
              Home
            </Text>
          </Button>
          <Button variant="subtle" color='yellow' className={classes.link}>
            <Text style={{fontSize: '20px'}}>
              Learn
            </Text>
          </Button>
          <Button variant="subtle" color='blue' className={classes.link}>
            <Text style={{fontSize: '20px'}}>
              Academy
            </Text>
          </Button>
          {token && role === 'admin' && (
            <Button variant="default" onClick={() => {
              dispatch(setMode('admin'))
              navigate('/admin')
            }}>
              <Text style={{fontSize: '20px'}}>
                Admin
              </Text>
            </Button>
          )}
          {token && role === 'user' && (
            <Button variant="default" onClick={() => {
              dispatch(setMode('user'))
              navigate('/user')
            }}>
              <Text style={{fontSize: '20px'}}>
                User
              </Text>
            </Button>
          )}
          {!token && (
            <div style={{float: 'right'}}>
              <Button variant="subtle" color='cyan' style={{margin: 5}}
              onClick={() => {
                setModeHeader() 
                navigate('/login')
              }}>
                <Text style={{fontSize: '20px'}}>
                  Log in
                </Text>
              </Button>
              <Button variant="filled" color='pink' style={{margin: 5}}
              onClick={() => {
                setModeHeader()
                navigate('/register')
              }}>
                <Text style={{fontSize: '20px'}}>
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
