import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: green[900], 
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightRegular: 500,
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: green[900], 
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: green[900],
        },
      },
    },
  },
});

export default theme;
