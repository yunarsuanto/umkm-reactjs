import { useState } from 'react';
import { Group, Code, Button, Collapse } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconChevronRight,
  IconUserHexagon,
} from '@tabler/icons-react';
import classes from '../../index.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  const data = [
    { link: '', label: 'Notifications', icon: IconBellRinging },
    {
      label: 'Billing',
      icon: IconReceipt2,
      links: [
        { label: 'Overview', link: '/', icon: IconFingerprint },
        { label: 'Forecasts', link: '/', icon: IconKey },
        { label: 'Outlook', link: '/', icon: IconDatabaseImport },
        { label: 'Real time', link: '/', icon: Icon2fa },
      ],
    },
    { link: '', label: 'Security', icon: IconFingerprint },
    { link: '', label: 'SSH Keys', icon: IconKey },
    { link: '', label: 'Databases', icon: IconDatabaseImport },
    { link: '/admin/authentication', label: 'Authentication', icon: Icon2fa },
    { label: 'Settings', icon: IconSettings, links: [
      { label: 'Permission', link: '/admin/permissions', icon: IconFingerprint },
      { label: 'Role', link: '/admin/roles', icon: IconUserHexagon },
    ]},
  ];
  const [opened, setOpened] = useState<string | null>(null);
  const links = data.map((item) => {
    const hasLinks = Array.isArray(item.links);
    return (
      <React.Fragment key={`main-${item.label}`}>
        <a
          className={classes.link}
          href={item.link}
          onClick={(e) => {
            e.preventDefault();
            if (hasLinks) {
              setOpened(opened === item.label ? null : item.label);
            }
            navigate(item.link!)
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              style={{
                transform: opened === item.label ? 'rotate(90deg)' : 'none',
                transition: 'transform 200ms ease',
              }}
            />
          )}
        </a>
        {hasLinks && (
          <Collapse in={opened === item.label}>
            {item?.links?.map((itm) => (
              <a
                key={`sub-${item.label}-${itm.label}`}
                href={itm.link}
                className={`${classes.link} ${classes.subLink}`}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(itm.link)
                }}
              >
                <itm.icon className={classes.linkIcon} stroke={1.5} /> 
                {itm.label}
              </a>
            ))}
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
            {/* <Anchor href='/admin/dashboard' variant='subtle' className={classes.link}> */}
            {/* </Anchor> */}
            <Button component='a' href='/dashboard' variant='subtle' className={classes.link} onClick={(event) => event.preventDefault()}>
              v3.1.2
            
            </Button>
          </Code>
        </Group>
        {links}
      </div>
      <div className={classes.footer}>
        <Button component='a' href='/wadaw' variant='subtle' className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Button>
        <Button component='a' href='/wadaw' variant='subtle' className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
}

export default Sidebar;
