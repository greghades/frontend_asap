import { Typography } from '@mui/material';

export default function Text({ children, ...rest }) {
  return (
    <Typography {...rest}>
      {children}
    </Typography>
  )
}
