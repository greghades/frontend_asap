'use client';

import { useRouter } from 'next/navigation';
import { Box, Container, AppBar, Toolbar, CssBaseline, ButtonGroup } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { Input, Text, Button } from '@/components';
import { useAuth, useSchema, useUserSystemStore } from '@/hooks';
import { users } from '@/mockups';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#DDEFFF',
			contrastText: '20528E',
		},
		secondary: {
			main: '#20528E',
			contrastText: '#DDEFFF',
		},
	},
	components: {
		MuiButton: {
		  styleOverrides: {
			root: {
			  textTransform: 'capitalize',
			},
		  },
		},
	  },
});

const loginSchema = yup.object({
	code: yup.string().required('El codigo del usuario es requerido'),
	password: yup.string().required('la contraseña es requerida')
});

const navItems = ['Home', 'About', 'Contact'];

export default function Login() {
	const { isAuth } = useAuth();
	const router = useRouter();

	const resolver = useSchema(loginSchema);

	const { handleSubmit, control, register } = useForm({
		reValidateMode: 'onBlur',
		resolver
	});

	const login = useUserSystemStore.getState().login;

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
			<CssBaseline />
			{/* Barra de navegacion */}
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#20528E' }}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<RestaurantMenuIcon sx={{ marginRight: '8px' }} />
					<Text variant="h6" sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px black', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
						SISTEMA ASAP
					</Text>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						<ThemeProvider theme={theme}>
							<Button color='primary' variant='text'>¿Quiénes somos?</Button>
							<Button variant='text'>Contáctanos</Button>
							<Button variant='text'>Ubicación</Button>
						</ThemeProvider>
					</Box>
				</Toolbar>
			</AppBar>
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
				<ThemeProvider theme={theme}>
					<Button color='secondary' type='submit'>Iniciar Sesion</Button>
				</ThemeProvider>
			</Box>
		</Container>
	);
}
