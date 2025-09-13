import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Divider,
  Typography,
  Stack,
  IconButton,
  Collapse,
  Badge,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import {
  ShoppingCart,
  AccountCircle,
  ExpandLess,
  ExpandMore,
  BakeryDining,
  Cake,
  TakeoutDining,
  RiceBowl,
  WineBar,
  SoupKitchen,
  FoodBank,
  Flatware,
  SupportAgent,
  LiveHelp,
  LocalShipping,
  Close,
} from "@mui/icons-material";
import logo from "../Images/Circuler logo.png";
import { useState, useEffect } from "react";

const drawerWidth = 300;

const Categories = [
  { text: "Bakery Items", icon: <BakeryDining />, path: "Bakery" },
  { text: "Confectionary", icon: <Cake />, path: "Confectionary" },
  { text: "Meal Boxes", icon: <TakeoutDining />, path: "mealBoxes" },
  { text: "Traditional Dishes", icon: <RiceBowl />, path: "traditional" },
  { text: "Beverages", icon: <WineBar />, path: "beverages" },
  { text: "Jams, Sauce and Spices", icon: <SoupKitchen />, path: "jams" },
  { text: "Custom Orders", icon: <FoodBank />, path: "customOrders" },
];

export default function BuyerDashboard() {
  const [expandedCategory, setExpandedCategory] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const updateCartFromLocalStorage = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const validCart = Array.isArray(storedCart) ? storedCart : [];
        setCart([...validCart]); // 🔄 Force re-render

        const totalQuantity = validCart.reduce(
          (acc, item) => acc + (item.quantity || 0),
          0
        );
        setCartCount(totalQuantity);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setCart([]);
        setCartCount(0);
      }
    };

    // Initial load
    updateCartFromLocalStorage();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCartFromLocalStorage);

    return () => {
      window.removeEventListener("cartUpdated", updateCartFromLocalStorage);
    };
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  function clearCart() {
    const token = localStorage.getItem("authToken");
    // Clear cart from localStorage
    localStorage.removeItem("cart");

    // Update state if you are using setCart and setCartCount
    setCart([]);
    setCartCount(0);

    // Notify other components that cart has changed
    window.dispatchEvent(new Event("cartUpdated"));
  }

  return (
    <div>
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
            <Stack direction={"row"} spacing={2}>
              <Link to="/login">
                <Button
                  color="secondary"
                  size="medium"
                  variant="contained"
                  onClick={() => {
                    localStorage.clear();
                    window.dispatchEvent(new Event("cartUpdated"));
                    window.location.href = "/login";
                  }}
                >
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

              {/* Shopping Cart with Badge */}
              <IconButton size="large" onClick={toggleDrawer(true)}>
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box sx={{ width: 300, p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">Shopping Cart</Typography>
                    <IconButton onClick={toggleDrawer(false)}>
                      <Close />
                    </IconButton>
                  </Box>
                  <Divider sx={{ my: 2 }} />

                  {/* Cart Items List */}
                  <List>
                    {cart.length > 0 ? (
                      cart.map((item, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ListItemText
                            primary={item.name}
                            secondary={`Rs.${item.price}`}
                          />
                          <Typography variant="body1">
                            x{item.quantity}
                          </Typography>
                        </ListItem>
                      ))
                    ) : (
                      <Typography sx={{ textAlign: "center", mt: 2 }}>
                        Your cart is empty
                      </Typography>
                    )}
                  </List>

                  <Divider sx={{ my: 2 }} />
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    component={Link}
                    to="/buyerDashboard/checkout"
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={clearCart}
                    sx={{ mt: 1 }}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Drawer>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
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
          <Box p={2} width="340px" role="presentation">
            <List>
              <ListItem>
                <IconButton
                  onClick={() => setExpandedCategory(!expandedCategory)}
                >
                  {expandedCategory ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <ListItemText>
                  <Typography variant="h6">Shop by Categories</Typography>
                </ListItemText>
              </ListItem>
              <Divider component="li" />

              <Collapse in={expandedCategory} timeout="auto" unmountOnExit>
                <List>
                  {Categories.map((category, index) => (
                    <div key={index}>
                      <ListItem disablePadding>
                        <ListItemButton
                          component={Link}
                          to={`/buyerDashboard/${category.path}`}
                        >
                          <ListItemIcon>{category.icon}</ListItemIcon>
                          <ListItemText primary={category.text} />
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />
                    </div>
                  ))}
                </List>
              </Collapse>
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
    </div>
  );
}
