import { Typography } from '@mui/material';

export default function Text({ value, ...rest }) {
  return (
    <Typography {...rest}>
      {value}
    </Typography>
  )
}
