'use client';

import { useRouter } from 'next/navigation';
import { Box, Container, AppBar, Toolbar, CssBaseline, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { Input, Text, Button } from '@/components';
import { useAuth, useSchema, useUserSystemStore } from '@/hooks';
import { users } from '@/mockups';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';

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

const BackgroundContainer = styled('div')(({ theme }) => ({
	backgroundImage: `url("https://magazine.vitality.co.uk/wp-content/uploads/2017/03/shutterstock_285854987.jpg")`,
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundAttachment: 'scroll',
	minHeight: '100vh',
	minWidth: '100vw',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}));



const loginSchema = yup.object({
	code: yup.string().required('El codigo del usuario es requerido'),
	password: yup.string().required('la contraseña es requerida')
});

export default function Login() {
	const { isAuth } = useAuth();
	const router = useRouter();
	const [buttonLabel, setButtonLabel] = useState('Conócenos');
	const resolver = useSchema(loginSchema);

	const { handleSubmit, control, register } = useForm({
		reValidateMode: 'onBlur',
		resolver
	});

	const handleButtonClick = () => {
		if (buttonLabel === 'Conócenos') {
			setButtonLabel('Volver');
		} else {
			setButtonLabel('Conócenos');
		}
	};

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
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '2em',
			}}
		>
			<CssBaseline />
			{/* Barra de navegacion */}
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#20528E' }}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<RestaurantMenuIcon sx={{ marginRight: '8px' }} />
					<Typography variant="h6" sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px black', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
						SISTEMA ASAP
					</Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						<ThemeProvider theme={theme}>
							<Button color='primary' variant='text' onClick={handleButtonClick}>{buttonLabel}</Button>
						</ThemeProvider>
					</Box>
				</Toolbar>
			</AppBar>

			{buttonLabel === 'Volver' ? (
				<BackgroundContainer>
					<Card sx={{ maxWidth: 400, textAlign: 'justify' }} variant="outlined">
						<CardContent>
							<Typography variant='h4' color="#20528E" sx={{ textAlign: 'center' }}>
								¿Quiénes somos?
							</Typography>
							<Typography variant="caption">
								Abroad es una "Dark kitchen" (Cocina fantasma)  que surge de traer la necesidad de incluir en la gastronomía local de Barquisimeto un platillo a cada cada comensal una experiencia única al tener contacto con diferentes partes
								del mundo a través de nuestros platos. ¿Nuestra misión?
							</Typography>
							<Card  sx={{ marginTop: '1em' }}>
								<CardContent>
									<Typography variant="caption">
										{'“Convertirnos en la forma más económica de viajar por el mundo sin salir de casa”'}
									</Typography>
								</CardContent>
							</Card>
						</CardContent>
						<CardActions>
							<ThemeProvider theme={theme}>
								<Button size="small">Ubicación</Button>
								<Button size="small">Contáctanos</Button>
							</ThemeProvider>
						</CardActions>
					</Card>
				</BackgroundContainer>
			) : (
				<Box>
					<Typography
						variant='h1'
						sx={{
							fontSize: '3em'
						}}
					>
						ASAP
					</Typography>
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
				</Box>
			)}
		</Container>
	);
}
