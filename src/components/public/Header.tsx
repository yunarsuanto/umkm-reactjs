import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
} from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {isMobile} from 'react-device-detect';
import { setMode } from '@/features/generalSlice';

interface HeaderProps {
  setModeHeader: () => void;
}

export function Header({ setModeHeader } : HeaderProps) {
  const {token, role} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] bg-green-100 p-2 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to={'/'}>
          <div className="w-[100px]">
            <img src="/logo.png" alt="logo" className="h-full w-full object-cover" />
          </div>
        </Link>
        <div>
          <p className='text-orange-600'>Belajar Lebih Asik</p>
        </div>
        <div>
          <button type="button" className="text-white bg-blue-500 p-1 rounded-lg" onClick={() => {
            dispatch(setMode('auth'))
            navigate('/login')
          }}>Login</button>
        </div>
        {/* Desktop menu */}
        {/* <nav className="hidden sm:flex space-x-4">
          <Link to="/" className="text-green-800 px-2 py-1">Beranda</Link>
          <Link to="/#feature" className="text-yellow-800 px-2 py-1">Fitur</Link>
          <Link to="/#about" className="text-blue-800 px-2 py-1">Tentang Kami</Link>
          <Link to="/#contact" className="text-pink-800 px-2 py-1">Kontak</Link>
        </nav> */}

        {/* Mobile burger */}
        {/* <button className="sm:hidden p-2" onClick={toggleMenu}>
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button> */}
      </div>

      {/* Mobile menu */}
      {/* {open && (
        <div className="sm:hidden mt-2 bg-green-50 p-2 flex flex-col space-y-2">
          <Link to="/" className="text-green-800" style={{fontFamily: 'howdybun'}}>Beranda</Link>
          <Link to="/" className="text-yellow-800">Fitur</Link>
          <Link to="/" className="text-blue-800">Tentang Kami</Link>
          <Link to="/" className="text-pink-800">Kontak</Link>
        </div>
      )} */}
    </header>
  );
}
