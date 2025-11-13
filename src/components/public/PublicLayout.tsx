import { ReactNode, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box, useMantineTheme } from '@mantine/core';
import { useLocation } from 'react-router-dom';

interface PublicLayoutProps {
  children: ReactNode;
  setMode: () => void;
}


const PublicLayout = ({ children, setMode }: PublicLayoutProps) => {
  const theme = useMantineTheme();
  const location = useLocation();
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', fontFamily: 'howdybun'}}>
      <Header setModeHeader={setMode} />
        <Box component="main" style={{
          flex: 1,
          overflowY: 'auto',
        }}>
          {children}
        </Box>
      {location.pathname !== '/play' && (
        <Footer />
      )}
    </Box>
  );
};

export default PublicLayout;
