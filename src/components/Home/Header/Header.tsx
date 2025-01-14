import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { clearUserInfo } from "../../../app/features/userSlice";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Срабатывает для устройств меньше ширины "md"

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(clearUserInfo());
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ marginBottom: 3 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}>
          TrueGis
        </Typography>

        {!isMobile ? (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Button
              component={Link}
              to="/"
              color="primary"
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
              }}>
              Главная
            </Button>
            <Button
              component={Link}
              to="/add-user"
              color="secondary"
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#125ea8" },
              }}>
              Создать пользователя
            </Button>
            <Button
              component={Link}
              to="delivery"
              color="primary"
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
              }}>
              Delivery
            </Button>
          </Box>
        ) : (
          // Навигация для мобильных устройств
          <>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleMenuOpen}
              sx={{
                marginLeft: "auto",
              }}>
              <LuMenu />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              keepMounted>
              <MenuItem onClick={handleMenuClose} component={Link} to="/">
                Главная
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/add-user">
                Создать пользователя
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/delivery">
                Delivery
              </MenuItem>
            </Menu>
          </>
        )}

        {/* Кнопка выхода */}
        <Button
          onClick={handleLogout}
          sx={{
            display: "flex",
            alignItems: "center",
            textTransform: "none",
            color: "inherit",
          }}>
          <LuLogOut style={{ marginRight: "0.5rem", fontSize: "1.25rem" }} />
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
