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
  IconLogout,
} from '@tabler/icons-react';
import classes from '@/components/user/HeaderUser.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setMode } from '../../features/generalSlice';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { clearToken } from '@/features/authSlice';

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

interface HeaderUserProps {
  setModeHeaderUser: () => void;
}

export function HeaderUser({ setModeHeaderUser } : HeaderUserProps) {
  const queryClient = useQueryClient();
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
          <Group visibleFrom="sm">
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <Button variant="subtle" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      <Image
                        src={`https://www.shutterstock.com/image-vector/man-shirt-tie-businessman-avatar-600nw-548848999.jpg`}
                        alt={'cecep'}
                        width={30}
                        height={30}
                        fit="cover"
                        radius="50%"
                      />
                    </Box>
                  </Center>
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>
                <Divider my="sm" />
                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button
                      component="a"
                      href="/"
                      variant="subtle"
                      className={classes.link}
                      onClick={(event) => {
                        event.preventDefault()
                        dispatch(setMode('public'))
                        dispatch(clearToken())
                        queryClient.removeQueries()
                      }}
                    >
                      <IconLogout className={classes.linkIcon} stroke={1.5} />
                      <span>Logout</span>
                    </Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
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
          <Button variant="subtle" className={classes.link} style={{float: 'right'}} onClick={toggleLinks}>
            <Image
              src={`https://www.shutterstock.com/image-vector/man-shirt-tie-businessman-avatar-600nw-548848999.jpg`}
              alt={'cecep'}
              width={30}
              height={30}
              fit="cover"
              radius="50%"
            />
          </Button>
          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
