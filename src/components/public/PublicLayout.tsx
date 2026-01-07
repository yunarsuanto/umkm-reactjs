import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAppSelector } from '@/app/hooks';
import { Player } from '@lottiefiles/react-lottie-player';

interface PublicLayoutProps {
  children: ReactNode;
  setMode: () => void;
}

const PublicLayout = ({ children, setMode }: PublicLayoutProps) => {
  const location = useLocation();
  const { loading } = useAppSelector((state) => state.general)
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => setReady(true), 50);
  }, []);
  return (
    <div className="bg-gray-100" style={{
      touchAction: "none",
      overscrollBehavior: "none"
    }}>
      <Header />
      {loading && ready && (
        <div style={{ height: '100dvh' }} className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
          <Player src="/loading.json" autoplay loop style={{ width: 100, height: 100 }} />
        </div>
      )}
      <main>
        {children}
      </main>
      {(location.pathname === '/' || location.pathname === '/play') && (
        <Footer />
      )}
    </div>
  );
};

export default PublicLayout;
