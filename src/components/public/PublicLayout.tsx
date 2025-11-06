import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box, useMantineTheme } from '@mantine/core';

interface PublicLayoutProps {
  children: ReactNode;
  setMode: () => void;
}

const PublicLayout = ({ children, setMode }: PublicLayoutProps) => {
  const theme = useMantineTheme();
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', backgroundColor: theme.colors.red[1], fontFamily: 'howdybun'}}>
      <Header setModeHeader={setMode} />
        <Box component="main" style={{
          flex: 1,
          overflowY: 'auto',
        }}>
          {children}
        </Box>
      <Footer />
    </Box>
  );
};

export default PublicLayout;
