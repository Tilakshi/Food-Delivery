import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Divider,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import {
  RestaurantMenu,
  ShoppingCart,
  AccountCircle,
} from "@mui/icons-material";
import logo from "../Images/Circuler logo.png";

const drawerWidth = 300;

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                style={{ width: "100px", height: "auto" }}
              />
            </Link>
          </Box>
          <Stack direction={"row"} spacing={3}>
            <Link to="/login">
              <Button color="secondary" size="medium" variant="contained">
                <Typography>Logout</Typography>
              </Button>
            </Link>
            <IconButton
              component={Link}
              to="/sellerDashboard/sellerProfile"
              size="large"
            >
              <AccountCircle />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "90px",
          },
        }}
      >
        <Box p={2} role="presentation">
          <List>
            <ListItemButton
              component={Link}
              to="/sellerDashboard/newOrderSeller"
            >
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">View Sellers</Typography>}
              />
            </ListItemButton>
            <Divider />

            <ListItemButton component={Link} to="/sellerDashboard/pastOrders">
              <ListItemIcon>
                <RestaurantMenu />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Completed Buyers</Typography>}
              />
            </ListItemButton>
            <Divider />
          </List>
        </Box>
      </Drawer>

      {/* Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `10px`, // Push content to the right
          mt: "64px", // Push content down to avoid overlap with navbar
        }}
      >
        <Outlet /> {/* Nested Routes will be rendered here */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
