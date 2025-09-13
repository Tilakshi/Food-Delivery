import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Divider,
  Popper,
  Fade,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  BakeryDining,
  Cake,
  ExpandLess,
  FoodBank,
  RiceBowl,
  SoupKitchen,
  TakeoutDining,
  WineBar,
  ExpandMore,
  Flatware,
  RestaurantMenu,
  SupportAgent,
  LiveHelp,
  LocalShipping,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../Images/Circuler logo.png";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";

const Categories = [
  { text: "Bakery Items", icon: <BakeryDining />, path: "/Bakery" },
  { text: "Confectionary", icon: <Cake />, path: "/Confectionary" },
  { text: "Meal Boxes", icon: <TakeoutDining />, path: "/mealBoxes" },
  { text: "Traditional Dishes", icon: <RiceBowl />, path: "/traditional" },
  { text: "Beverages", icon: <WineBar />, path: "/beverages" },
  { text: "Jams, Sauce and Spices", icon: <SoupKitchen />, path: "/jams" },
  { text: "Custom Orders", icon: <FoodBank />, path: "/customOrders" },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(false);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ padding: "theme.spacing(10)" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "theme.spacing(10)",
            }}
          >
            <IconButton
              size="large"
              color="secondary"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            >
              <Box p={2} width="310px" role="presentation">
                <List>
                  <ListItem>
                    <IconButton
                      onClick={() => setExpandedCategory(!expandedCategory)}
                    >
                      {expandedCategory ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    <ListItemText>
                      <Typography variant="h5">Shop by Categories</Typography>
                    </ListItemText>
                  </ListItem>
                  <Divider component="li" />

                  <Collapse in={expandedCategory} timeout="auto" unmountOnExit>
                    <List>
                      {Categories.map((category, index) => (
                        <div key={index}>
                          <ListItem disablePadding>
                            <ListItemButton component={Link} to={category.path}>
                              <ListItemIcon>{category.icon}</ListItemIcon>
                              <ListItemText primary={category.text} />
                            </ListItemButton>
                          </ListItem>
                          <Divider component="li" />
                        </div>
                      ))}
                    </List>
                  </Collapse>

                  <ListItem>
                    <ListItemButton component={Link} to="/ShopByKitchen">
                      <ListItemIcon>
                        <Flatware />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="h5">
                          Shop By Home Kitchens
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />

                  <ListItem>
                    <ListItemButton component={Link} to="/becomeAChef">
                      <ListItemIcon>
                        <RestaurantMenu />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="h5">Become A Home Chef</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />

                  <ListItem>
                    <ListItemButton component={Link} to="/help">
                      <ListItemIcon>
                        <SupportAgent />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="h5">
                          We are Here to Help
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />

                  <ListItem>
                    <ListItemButton component={Link} to="/faq">
                      <ListItemIcon>
                        <LiveHelp />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="h5">More Questions??</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />

                  <ListItem>
                    <ListItemButton component={Link} to="/delivary">
                      <ListItemIcon>
                        <LocalShipping />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="h5">
                          Delivery And Timeliness
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider component="li" />
                </List>
              </Box>
            </Drawer>

            <div>
              <Link to="/">
                <img
                  className="logoNavbar"
                  src={logo}
                  alt="logo"
                  style={{ width: "100px", height: "auto" }}
                />
              </Link>
            </div>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Stack direction={"row"} spacing={2} alignContent={"flex-end"}>
              <PopupState variant="popper">
                {(popupState) => (
                  <div>
                    <Button
                      color="secondary"
                      size="medium"
                      variant="contained"
                      {...bindToggle(popupState)}
                    >
                      <Typography>Sign Up</Typography>
                    </Button>

                    <Popper
                      {...bindPopper(popupState)}
                      transition
                      sx={{ zIndex: 1300 }}
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper sx={{ height: 100, width: 120, padding: 2 }}>
                            <Stack direction="column" spacing={2}>
                              <Link to="/signup">
                                <Button variant="contained" color="secondary">
                                  As a Buyer
                                </Button>
                              </Link>
                              <Link to="/becomeAChef">
                                <Button variant="contained" color="secondary">
                                  As a Seller
                                </Button>
                              </Link>
                            </Stack>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </div>
                )}
              </PopupState>

              <Link to="/login">
                <Button color="secondary" size="medium" variant="contained">
                  <Typography>Login</Typography>
                </Button>
              </Link>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
