import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '../../schemas/login.schema';
import { TextInput, Button, Card, Container, Title, Group, Alert } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser, loginUserWithGoogle } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { setMode } from '../../features/generalSlice';
import { useEffect } from 'react';
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { GooglePayload } from '../../types/general/AuthTypes';
import { LoginWithGoogleSchema } from '../../schemas/login_with_google.schema';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, googlePayload } = useAppSelector((state) => state.auth);
  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '', platform: 'web'},
  });

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
      }
    }
  };

  const googleHandleError = () => {
    console.log('googleHandleError')
  }
  const { token, role } = useAppSelector((state) => state.auth)

  useEffect(() => {
    console.log('------------role')
    console.log(token)
    console.log(role)
    console.log('------------role')
  }, [token, role])
  return (
    <Container size="xs" style={{ marginTop: 100 }}>
      <Card shadow="sm" p="lg">
        <Title order={2} style={{ textAlign: 'center', marginBottom: 20 }}>Login Admin</Title>
        {error && (
          <Alert color="red" title="Login Gagal" mb="md">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Email"
                placeholder="Masukkan email Anda"
                error={errors.username?.message}
                mb="sm"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Password"
                type="password"
                placeholder="Masukkan password Anda"
                error={errors.password?.message}
                mb="md"
              />
            )}
          />
          <Group justify="flex-end">
            <GoogleLogin onSuccess={googleHandleSuccess} onError={googleHandleError} useOneTap />
            <Button type="submit" loading={loading === 'pending'}>
              Login
            </Button>
          </Group>
        </form>
      </Card>
    </Container>
  );
};

export default LoginPage;
