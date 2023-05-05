import { Box, BoxProps } from '@mui/material';
// TODO Override theme
const BottomBar = (props: BoxProps) => {
  return (
    <Box
      component="footer"
      className="BottomBar"
      {...props}
      sx={[
        {
          m: 1,
          p: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          position: 'sticky',
          top: '100%',
          left: '5%',
          // zIndex: 1100,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
};

export default BottomBar;
