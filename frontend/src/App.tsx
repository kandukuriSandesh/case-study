import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <AppRoutes />
      </Container>
    </BrowserRouter>
  );
}

export default App;
