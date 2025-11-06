import { ReactNode } from 'react';
import { HeaderUser } from '@/components/user/HeaderUser';
import { FooterUser } from '@/components/user/FooterUser';
import { Box, useMantineTheme } from '@mantine/core';

interface UserLayoutProps {
  children: ReactNode;
  setMode: () => void;
}

const UserLayout = ({ children, setMode }: UserLayoutProps) => {
  const theme = useMantineTheme();
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', backgroundColor: theme.colors.red[1], fontFamily: 'howdybun'}}>
      <HeaderUser setModeHeaderUser={setMode} />
      <Box component="main" style={{
        flex: 1,
        overflowY: 'auto',
      }}>
        {children}
      </Box>
      <FooterUser />
    </Box>
  );
};

export default UserLayout;
