import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconLogout,
  IconDiamond,
  IconIdBadge,
  IconMoonStars,
  IconCarambola,
} from '@tabler/icons-react';
import classes from '@/components/user/HeaderUser.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setMode } from '../../features/generalSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { clearToken } from '@/features/authSlice';

export function HeaderUser() {
  const queryClient = useQueryClient();
  const {token, role} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] bg-green-100 p-2 shadow-md">
      <div className="flex items-center justify-between">
        <Link to={'/'}>
          <div className="w-[100px]">
            <img src="/logo.png" alt="logo" className="h-full w-full object-cover" />
          </div>
        </Link>
        <div className='bg-white p-2 rounded-full flex justify-between gap-2'>
          <div>
            <IconCarambola width={30} className='text-amber-400' />
          </div>
          <div>2</div>
          <div>
            <IconDiamond width={30} className='text-amber-400' />
          </div>
          <div>1200</div>
        </div>
      </div>
    </header>
  );
}
