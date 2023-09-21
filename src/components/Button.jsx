import { Button as MUIButton } from '@mui/material';

export default function Button({ children, ...rest }) {
	return (
		<MUIButton variant='contained' {...rest}>
			{children}
		</MUIButton>
	);
}
