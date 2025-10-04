const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#2b6777',
            light: '#52ab98',
            dark: '#1e4b55',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#52ab98',
            light: '#c8d8e4',
            dark: '#3a7b6d',
            contrastText: '#ffffff',
          },
          background: {
            default: '#f2f2f2',
            paper: '#ffffff',
          },
          text: {
            primary: '#191b1bff', // Changed to a dark color for contrast
            secondary: '#191b1bff',
          },
        }
      : {
          primary: {
            main: '#52ab98',
            light: '#6dbf9b',
            dark: '#3a7b6d',
            contrastText: '#1e1e1e', // Ensures text on primary buttons is visible
          },
          secondary: {
            main: '#c8d8e4',
            light: '#e0eaf3',
            dark: '#aab6c3',
            contrastText: '#1e1e1e', // Ensures text on secondary buttons is visible
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#e0e0e0',
            secondary: '#a0a0a0',
          },
        }),
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      color: '#dce3e4ff', // Updated for visibility in dark mode
    },
    h2: {
      fontWeight: 600,
      color: '#dce3e4ff', // Updated for visibility in dark mode
    },
    h3: {
      fontWeight: 600,
      color: '#dce3e4ff', // Updated for visibility in dark mode
    },
    h4: {
      fontWeight: 600,
      color: '#dce3e4ff', // Updated for visibility in dark mode
    },
    h5: {
      fontWeight: 600,
      color: '#dce3e4ff', // Updated for visibility in dark mode
    },
    h6: {
      fontWeight: 600,
      color: '#dce3e4ff', // Updated for visibility in dark mode
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #52ab98 30%, #2b6777 90%)', // Adjusted for better contrast
          '&:hover': {
            background: 'linear-gradient(45deg, #3a7b6d 30%, #1e4b55 90%)', // Adjusted for better contrast
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(theme.palette.mode === 'dark' && {
            background: theme.palette.primary.main, // Use a solid dark color for the AppBar
          }),
        }),
      },
    },
  },
});

export default getDesignTokens;