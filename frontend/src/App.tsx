import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Container, CssBaseline } from "@mui/material";
import NavBar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
      <Container sx={{ mt: 4 }}>
        <AppRoutes />
      </Container>
    </BrowserRouter>
  );
}

export default App;
