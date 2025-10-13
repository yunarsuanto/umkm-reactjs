import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '../../schemas/login.schema';
import { TextInput, Button, Card, Container, Title, Group, Alert } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, type } = useAppSelector((state) => state.auth);

  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (data: LoginSchema) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      // if(type === 'student'){
      //   navigate('/user/home');
      // }
      // if(type === 'admin'){
      //   navigate('/admin/dashboard');
      // }
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate, type]);

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
