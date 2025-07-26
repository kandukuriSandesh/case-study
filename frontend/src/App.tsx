import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Container, CssBaseline } from "@mui/material";
import NavBar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ToastContainer />
      <NavBar />
      <Container sx={{ mt: 4 }}>
        <AppRoutes />
      </Container>
    </BrowserRouter>
  );
}

export default App;
