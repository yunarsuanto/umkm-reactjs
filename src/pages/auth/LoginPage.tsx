import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '../../schemas/login.schema';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser, loginUserWithGoogle } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { setMode } from '../../features/generalSlice';
import { GoogleLogin, CredentialResponse, useGoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { GooglePayload } from '../../types/general/AuthTypes';
import { LoginWithGoogleSchema } from '../../schemas/login_with_google.schema';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '', platform: 'web'},
  });

  // Check if Google library is loaded
  useEffect(() => {
    const checkGoogleLib = setInterval(() => {
      if ((window as any).google) {
        console.log('Google library found!');
        setGoogleLoaded(true);
        clearInterval(checkGoogleLib);
      }
    }, 500);
    
    // Timeout setelah 15 detik - force show anyway
    const timeout = setTimeout(() => {
      clearInterval(checkGoogleLib);
      setGoogleLoaded(true);
    }, 15000);
    
    return () => {
      clearInterval(checkGoogleLib);
      clearTimeout(timeout);
    };
  }, []);

  const onSubmit = async (data: LoginSchema) => {
    const resultAction = await dispatch(loginUser(data)).unwrap();
    switch (resultAction.data.role) {
      case 'admin':
        dispatch(setMode('admin'));
        navigate('/admin');
        break;
      case 'superadmin':
        dispatch(setMode('admin'));
        navigate('/admin');
        break;
      case 'user':
        dispatch(setMode('user'));
        navigate('/user');
        break;
      default:
        dispatch(setMode('public'));
        navigate('/')
        break;
    }
  };

  const googleHandleSuccess = async (credentialResponse: CredentialResponse) => {
    if(credentialResponse.credential){
      const decoded = jwtDecode<GooglePayload>(credentialResponse.credential);
      if(decoded){
        const data:LoginWithGoogleSchema = {
          token: credentialResponse.credential,
          platform: 'web'
        }
        const resultAction = await dispatch(loginUserWithGoogle(data)).unwrap();
        switch (resultAction.data.role) {
          case 'admin':
            // dispatch(setMode('admin'));
            navigate('/admin');
            break;
          case 'superadmin':
            // dispatch(setMode('admin'));
            navigate('/admin');
            break;
          case 'user':
            // dispatch(setMode('user'));
            navigate('/user');
            break;
          default:
            // dispatch(setMode('public'));
            navigate('/')
            break;
        }
      }
    }
  };
  const googleHandleError = () => {
    console.log('googleHandleError')
  }
  const { token, role } = useAppSelector((state) => state.auth)

  // Use useGoogleLogin hook instead
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse: any) => {
      try {
        console.log('✅ Google login success:', codeResponse);
        console.log('Access token:', codeResponse.access_token);
        
        if (codeResponse.access_token) {
          const data: LoginWithGoogleSchema = {
            token: codeResponse.access_token,
            platform: 'web'
          }
          console.log('Sending to backend:', data);
          const resultAction = await dispatch(loginUserWithGoogle(data)).unwrap();
          console.log('Backend response:', resultAction);
          handlePostLogin(resultAction.data.role);
        } else {
          console.warn('❌ No access_token in response');
        }
      } catch (error) {
        console.error('❌ Google login error:', error);
      }
    },
    onError: (error) => {
      console.error('❌ Google login failed:', error)
    },
    flow: 'implicit'
  });

  const handlePostLogin = (role: string) => {
    switch (role) {
      case 'admin':
      case 'superadmin':
        navigate('/admin');
        break;
      case 'user':
        navigate('/user');
        break;
      default:
        navigate('/')
        break;
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm/6 font-medium text-gray-500">Username</label>
            <div className="mt-2">
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input 
                    {...field}
                    type="text" 
                    className="block w-full rounded-md border-[1px] border-gray-300 p-2" 
                  />
                )}
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm/6 font-medium text-gray-500">Password</label>
            </div>
            <div className="mt-2">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input 
                    {...field}
                    type="password" 
                    className="block w-full rounded-md border-[1px] border-gray-300 p-2" 
                  />
                )}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
          </div>
          <div>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
          </div>

          <div className="flex justify-center mt-6 pt-6 border-t border-gray-600">
            <button
              type="button"
              onClick={() => googleLogin()}
              className="flex items-center justify-center gap-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Don't have an account?{' '}
          <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
