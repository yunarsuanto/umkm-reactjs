import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface PublicLayoutProps {
  children: ReactNode;
  setMode: () => void;
}

const PublicLayout = ({ children, setMode }: PublicLayoutProps) => {
  return (
    <div>
      <Header setModeHeader={setMode} />
        <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
