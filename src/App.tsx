import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import router from "./hoc/router";
import { apolloClient } from "./constants";

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
        <Container>
          <RouterProvider router={router} />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
