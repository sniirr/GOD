import { createTheme } from '@mui/material/styles';
import { blue, orange } from '@mui/material/colors';

export { };

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  status: {
    danger: blue[500],
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '2rem',
          color:'#ffffff',
          backgroundColor: orange[500],
          '&:hover':{ 
            backgroundColor: orange[600],
          },
          borderRadius:'30px'
          
        },
      },
    },
  },
});