import { Input, Text } from '../../components';
import { Box, Container } from '@mui/material';

export default function Login() {
	return (
		<Container
			fixed
			sx={{
				height: '85vh',
				display: 'flex',
        flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
      <h2 variant='h1'> 
        Iniciar Sesion en ASAP
      </h2>
			<Box
				component='form'
				noValidate
				autoComplete='off'
				sx={{ 
          display: 'flex', 
          flexDirection: 'column' , 
          gap: '1.5em'
        }}
			>
				<Input label='Correo Electronico' fullWidth />
				<Input label='Contraseña' fullWidth />
			</Box>
		</Container>
	);
}
