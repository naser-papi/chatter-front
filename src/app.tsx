import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import router from "./hoc/router";
import { apolloClient } from "./constants";
import AppLayout from "@/components/template/app-layout";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppLayout>
          <RouterProvider router={router} />
        </AppLayout>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
