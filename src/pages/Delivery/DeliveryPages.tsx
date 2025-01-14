import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const DeliveryPages = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#ffffff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: "16px",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}>
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Navigation
      </Typography>
      <Divider sx={{ marginBottom: "16px" }} />
      <List sx={{ padding: "0 8px" }}>
        {[
          { label: "Company", path: "company" },
          { label: "Admin", path: "admin" },
          { label: "Comments", path: "comments" },
        ].map((item) => (
          <ListItem
            key={item.path}
            component="button"
            onClick={() => {
              navigate(item.path);
              setDrawerOpen(false);
            }}
            sx={{
              padding: "12px 16px",
              marginBottom: "8px",
              border: "0.5px solid #f7f7f7",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}>
            <ListItemText
              primary={item.label}
              sx={{
                textAlign: "left",
                color: "#333",
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "#ffffff",
          color: "#333",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, marginRight: 2 }}>
            Delivery App
          </Typography>

          <Button
            component={Link}
            to="/"
            color="primary"
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
            }}>
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            minWidth: 150,
            width: "50%",
            overflowY: "auto",
          },
        }}>
        {drawerContent}
      </Drawer>

      <Box sx={{ flexGrow: 1, paddingTop: 2, backgroundColor: "#f9f9f9" }}>
        <Container sx={{ marginTop: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default DeliveryPages;
