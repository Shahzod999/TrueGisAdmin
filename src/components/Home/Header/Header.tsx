import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Collapse,
} from "@mui/material";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { clearUserInfo } from "../../../app/features/userSlice";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { IoMdArrowRoundBack } from "react-icons/io";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleDeliveryToggle = () => {
    setIsDeliveryOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(clearUserInfo());
    navigate("/");
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
            mr: 5,
          }}
          onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </Typography>

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

        <IconButton
          edge="start"
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{
            marginLeft: "auto",
          }}>
          <LuMenu />
        </IconButton>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            ".MuiDrawer-paper": {
              width: "250px",
              height: "100%",
            },
          }}>
          <Box
            sx={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: 2,
            }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 2,
              }}>
              Меню
            </Typography>
            <List>
              <ListItemButton
                component={Link}
                to="/"
                onClick={handleDrawerToggle}>
                <ListItemText primary="Пользователи" />
              </ListItemButton>

              <ListItemButton onClick={handleDeliveryToggle}>
                <ListItemText primary="Delivery" />
                {isDeliveryOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={isDeliveryOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    to="/delivery-company"
                    onClick={handleDrawerToggle}>
                    <ListItemText primary="Company" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    to="/delivery-admin"
                    onClick={handleDrawerToggle}>
                    <ListItemText primary="Admin" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    to="/delivery-comments"
                    onClick={handleDrawerToggle}>
                    <ListItemText primary="Comments" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    to="/delivery-types"
                    onClick={handleDrawerToggle}>
                    <ListItemText primary="Types" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    component={Link}
                    to="/delivery-user"
                    onClick={handleDrawerToggle}>
                    <ListItemText primary="User" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton
                onClick={() => {
                  handleDrawerToggle();
                  handleLogout();
                }}>
                <ListItemText primary="Выйти" />
                <LuLogOut
                  style={{ marginLeft: "0.5rem", fontSize: "1.25rem" }}
                />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
