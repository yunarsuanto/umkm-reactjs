import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { setMode } from '@/features/generalSlice';
import { useEffect } from 'react';

export function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { token, role } = useAppSelector((state) => state.auth)
  return (
    <header className="fixed top-0 left-0 w-full z-[1000] bg-green-100 p-2 shadow-md">
      <div className="flex items-center justify-between">
        <Link to={'/'}>
          <div className="w-[100px]">
            <img src="/logo.png" alt="logo" className="h-full w-full object-cover" />
          </div>
        </Link>
        <div>
          <p className='text-orange-600'>Belajar Lebih Asik</p>
        </div>
        <div className='flex'>
          {(() => {
            if(token){
              if(role === 'admin'){
                return(
                  <button type="button" onClick={() => {
                    dispatch(setMode('admin'))
                    navigate('/admin')
                  }}>
                    <img src="/profile.svg" alt="" width={40} />
                  </button>
                )
              }else{
                return(
                  <button type="button" onClick={() => {
                    dispatch(setMode('user'))
                    navigate('/user')
                  }}>
                    <img src="/profile.svg" alt="" width={40} />
                  </button>
                )
              }
            }else{
              return(
                <button type="button" onClick={() => {
                  dispatch(setMode('auth'))
                  navigate('/login')
                }}>
                  <img src="/login.svg" alt="" width={40} />
                </button>
              )
            }
          })()}
        </div>
      </div>
    </header>
  );
}
