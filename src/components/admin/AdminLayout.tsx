import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useLocation, NavLink } from 'react-router-dom';


interface AdminLayoutProps {
  children: ReactNode;
}


const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  return (
    <div>
      <div className='relative'>
        <Sidebar currentLocation={location.pathname} />
      </div>
      <div className='relative ml-[250px] p-5'>
        {children}
      </div>
    </div>
    // <AppShell
    //   navbar={{ width: 300, breakpoint: 'sm' }}
    //   padding="md"
    // >
    //   <AppShell.Navbar p="md">
    //     <Sidebar currentLocation={location.pathname} />
    //   </AppShell.Navbar>

    //   <AppShell.Main>{children}</AppShell.Main>
    // </AppShell>
  );
};

export default AdminLayout;
