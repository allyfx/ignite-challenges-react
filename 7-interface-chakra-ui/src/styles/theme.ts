import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    yellow: {
      "500": "#FFBA08",
    },
    gray: {
      "100": "#F5F8FA",
      "200": "#DADADA",
      "400": "#999999",
      "600": "#47585B",
    }
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.600",
      }
    }
  }
});
