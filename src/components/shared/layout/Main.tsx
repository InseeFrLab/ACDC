import { Box, BoxProps } from '@mui/material';

const Main = (props: BoxProps) => {
  return (
    <Box
      component="main"
      className="Main"
      {...props}
      sx={[
        { minHeight: '85vh' },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
};
export default Main;
