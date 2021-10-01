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
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            textTransform: 'uppercase',
            borderRadius:100
          },
        }
      ]
    },
  },
});