import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
