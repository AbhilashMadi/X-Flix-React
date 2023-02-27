import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Archivo", "sans-serif"].join(","),
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#EE1520",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f2f2f2",
      contrastText: "#222",
    },
    lightGray: {
      main: "#2F2F2F",
    },
  },
});

export default theme;
