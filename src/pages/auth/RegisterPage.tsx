import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '../../schemas/login.schema';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { setMode } from '../../features/generalSlice';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '', platform: 'web'},
  });

  const onSubmit = async (data: LoginSchema) => {
    const resultAction = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(resultAction)) {
      dispatch(setMode('admin'));
      navigate('/admin')
    } else {
      console.error('Login gagal:', resultAction);
    }
  };

  return (
    <>
      asdasd
    </>
    // <Container size="xs" style={{ marginTop: 100 }}>
    //   <Card shadow="sm" p="lg">
    //     <Title order={2} style={{ textAlign: 'center', marginBottom: 20 }}>Register</Title>
    //     {error && (
    //       <Alert color="red" title="Login Gagal" mb="md">
    //         {error}
    //       </Alert>
    //     )}
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <Controller
    //         name="username"
    //         control={control}
    //         render={({ field }) => (
    //           <TextInput
    //             {...field}
    //             label="Email"
    //             placeholder="Masukkan email Anda"
    //             error={errors.username?.message}
    //             mb="sm"
    //           />
    //         )}
    //       />
    //       <Controller
    //         name="password"
    //         control={control}
    //         render={({ field }) => (
    //           <TextInput
    //             {...field}
    //             label="Password"
    //             type="password"
    //             placeholder="Masukkan password Anda"
    //             error={errors.password?.message}
    //             mb="md"
    //           />
    //         )}
    //       />
    //       <Group justify="flex-end">
    //         <Button type="submit" loading={loading === 'pending'}>
    //           Login
    //         </Button>
    //       </Group>
    //     </form>
    //   </Card>
    // </Container>
  );
};

export default RegisterPage;
