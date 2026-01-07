import { ReactNode, useEffect, useState } from 'react';
import { HeaderUser } from '@/components/user/HeaderUser';
import { FooterUser } from '@/components/user/FooterUser';
import { useAppSelector } from '@/app/hooks';
import { Player } from '@lottiefiles/react-lottie-player';
import { useLocation } from 'react-router-dom';

interface UserLayoutProps {
  children: ReactNode;
}

const HIDE_FOOTER_ROUTES = [
  /^\/user\/lesson\/[^/]+\/[^/]+$/, // /user/lesson/:id/:type
];

const UserLayout = ({ children }: UserLayoutProps) => {
  const location = useLocation()

  const shouldHideFooter = /^\/user\/lesson\/[^/]+\/[^/]+$/.test(location.pathname);
  
  const { loading } = useAppSelector((state) => state.general)
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => setReady(true), 50);
  }, []);
  
  useEffect(() => {
    console.log(location.pathname)
  }, [location.pathname]);

  return (
    <div className="bg-gray-100" style={{
        touchAction: "none",
        overscrollBehavior: "none"
    }}>
      <HeaderUser />
      {loading && ready && (
        <div style={{ height: '100dvh' }} className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
          <Player src="/loading.json" autoplay loop style={{ width: 100, height: 100 }} />
        </div>
      )}
      <main>
        {children}
      </main>
      {!shouldHideFooter && <FooterUser />}
    </div>
  );
};

export default UserLayout;
