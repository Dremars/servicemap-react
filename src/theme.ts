import { createMuiTheme } from "@material-ui/core";
import { purple, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
      primary: { 
        main: '#1964e6',

      }
    },
    spacing: {
      unit: 8,
    },
    typography: {
      fontSize: 16,
      htmlFontSize: 14,
    },
  });

export { theme }