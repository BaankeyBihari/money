import { red } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body {
          height: 100%;
        }
        body {
          display: flex;
          flex-direction: column;
        }
        .content {
          flex: 1 0 auto;
        }
        .footer {
          flex-shrink: 0;
        }
      `,
    },
  },
})

export default theme
