'use client';

import { useRouter } from 'next/navigation';

import { Box, Container } from '@mui/material';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';

import { Input, Text, Button } from '@/components';
import { useAuth, useSchema, useUserSystemStore } from '@/hooks';
import { users } from '@/mockups';

const loginSchema = yup.object({
	code: yup.string().required('El codigo del usuario es requerido'),
	password: yup.string().required('la contraseña es requerida')
});

export default function Login() {
	const { isAuth } = useAuth();
	const router = useRouter();

	const resolver = useSchema(loginSchema);

	const { handleSubmit, control, register } = useForm({
		reValidateMode: 'onBlur',
		resolver
	});

	const login = useUserSystemStore((state) => state.login);

	function onSubmit(data) {
		const userLogin = users.filter(
			({ password, code }) =>
				code === data.code && password === data.password
		)[0];

		if (!userLogin) {
			return alert(
				'codigo o contraseña incorrectos, intente nuevamente'
			);
		}

		login(userLogin);
		router.push('/')
	}

	if (isAuth) {
		return router.push('/');
	}

	return (
		<Container
			fixed
			sx={{
				height: '85vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '2em'
			}}
		>
			<Text
				variant='h1'
				sx={{
					fontSize: '3em'
				}}
			>
				ASAP
			</Text>
			<Box
				component='form'
				noValidate
				autoComplete='off'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1.5em'
				}}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					control={control}
					defaultValue=''
					name='code'
					render={({ field }) => (
						<Input
							{...field}
							label='Codigo'
							fullWidth
							refs={register('code')}
						/>
					)}
				/>
				<Controller
					control={control}
					defaultValue=''
					name='password'
					render={({ field }) => (
						<Input
							{...field}
							label='Contraseña'
							type='password'
							fullWidth
							refs={register('password')}
						/>
					)}
				/>
				<Button type='submit'>Iniciar Sesion</Button>
			</Box>
		</Container>
	);
}
