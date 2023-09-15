import { TextField } from '@mui/material';

export default function Input({ label, ...rest }) {
	return <TextField variant='outlined' label={label} {...rest} />;
}
