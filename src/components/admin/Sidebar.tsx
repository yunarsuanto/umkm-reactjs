import React from 'react';
import { Group, Code, Button, Collapse, NavLink } from '@mantine/core';
import {
  IconFingerprint,
  IconSettings,
  IconSwitchHorizontal,
  IconLogout,
  IconChevronRight,
  IconUserHexagon,
  IconUserBolt,
  IconBuildingBank,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setMode, setOpen } from '../../features/generalSlice';
import classes from '../../index.module.css';
import { clearToken } from '../../features/authSlice';
import { useQueryClient } from '@tanstack/react-query';

interface SidebarProps {
  currentLocation: string;
}

const Sidebar = ({ currentLocation }: SidebarProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.general);

  const data = [
    { link: '/admin/category-lessons', label: 'Lessons', icon: IconBuildingBank },
    // {
    //   label: 'Billing',
    //   icon: IconReceipt2,
    //   links: [
    //     { label: 'Overview', link: '/', icon: IconFingerprint },
    //     { label: 'Forecasts', link: '/', icon: IconKey },
    //     { label: 'Outlook', link: '/', icon: IconDatabaseImport },
    //     { label: 'Real time', link: '/', icon: Icon2fa },
    //   ],
    // },
    // { link: '', label: 'Security', icon: IconFingerprint },
    // { link: '', label: 'SSH Keys', icon: IconKey },
    // { link: '', label: 'Databases', icon: IconDatabaseImport },
    // { link: '/admin/authentication', label: 'Authentication', icon: Icon2fa },
    {
      label: 'Settings & Data Master',
      icon: IconSettings,
      links: [
        { label: 'Permission', link: '/admin/permissions', icon: IconFingerprint },
        { label: 'Role', link: '/admin/roles', icon: IconUserHexagon },
        { label: 'User', link: '/admin/users', icon: IconUserBolt },
      ],
    },
  ];

  const links = data.map((item) => {
    const hasLinks = Array.isArray(item.links);
    const isActive = item.link && currentLocation === item.link;

    return (
      <React.Fragment key={`main-${item.label}`}>
        <NavLink
          label={item.label}
          leftSection={<item.icon className={classes.linkIcon} stroke={1.5} />}
          rightSection={
            hasLinks ? (
              <IconChevronRight
                className={classes.chevron}
                style={{
                  transform: open === item.label ? 'rotate(90deg)' : 'none',
                  transition: 'transform 200ms ease',
                }}
              />
            ) : null
          }
          active={!!isActive}
          onClick={() => {
            if (hasLinks) {
              dispatch(setOpen(open === item.label ? null : item.label));
            } else if (item.link) {
              navigate(item.link);
            }
          }}
          className={classes.link}
        />

        {hasLinks && (
          <Collapse in={open === item.label}>
            {item?.links?.map((sub) => {
              const subActive = currentLocation === sub.link;
              return (
                <NavLink
                  key={`sub-${item.label}-${sub.label}`}
                  label={sub.label}
                  leftSection={<sub.icon className={classes.linkIcon} stroke={1.5} />}
                  active={subActive}
                  onClick={() => navigate(sub.link)}
                  className={`${classes.link} ${classes.subLink}`}
                />
              );
            })}
          </Collapse>
        )}
      </React.Fragment>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>
            <Button
              component="a"
              href="/dashboard"
              variant="subtle"
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              v3.1.2
            </Button>
          </Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <Button
          component="a"
          href="/"
          variant="subtle"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Button>

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
      </div>
    </nav>
  );
};

export default Sidebar;
