import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          flexDirection={isMobile ? "column" : "row"}
          gap={isMobile ? 1 : 0}
        >
          <Typography variant="h6">
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Case Study
            </NavLink>
          </Typography>

          <Box display="flex" gap={2}>
            <NavLink
              to="/accounts"
              style={({ isActive }) => ({
                color: "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
                borderBottom: isActive ? "2px solid white" : "none",
              })}
            >
              Accounts
            </NavLink>
            <NavLink
              to="/payments"
              style={({ isActive }) => ({
                color: "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
                borderBottom: isActive ? "2px solid white" : "none",
              })}
            >
              Payments
            </NavLink>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

