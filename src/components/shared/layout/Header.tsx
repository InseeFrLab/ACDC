import { Box, BoxProps } from '@mui/material';

const HeaderComponent = (props: BoxProps) => {
  return (
    <Box
      component="header"
      className="Header"
      {...props}
      sx={[
        {
          paddingBottom: '0.5rem',
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          borderBottom: '1px solid',
          borderColor: 'divider',
          top: 0,
          zIndex: 1100,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
};

export default HeaderComponent;
