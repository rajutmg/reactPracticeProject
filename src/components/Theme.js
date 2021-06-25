import { createMuiTheme, ThemeProvider } from "@material-ui/core";
const primaryColor = "#22982f";
const secondaryColor = "#755600";
export default createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },

    secondary: {
      main: secondaryColor,
    },
  },
  typography: {
    h1: {
      fontSize: "4rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
  },
  overrides: {
    textField: {
      padding: 0,
    },
  },
});
