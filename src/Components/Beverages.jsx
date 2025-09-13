import React, { useState, useEffect } from "react";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Beverages() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState("");

  function addToCart(itemId, dishName, price, sellerEmail) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === itemId
    );

    if (existingItemIndex !== -1) {
      // If item exists, update its quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Otherwise, add new item
      cart.push({
        id: itemId,
        name: dishName,
        price: price,
        seller: sellerEmail,
        quantity: 1,
      });
    }

    // Save the updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart state
    setCart([...cart]);
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));

    // Fire event to update other components
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${dishName} added to cart!`);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/getBeverages")
      .then((res) => {
        console.log("API Response:", res.data);

        if (res.data.status === "success" && Array.isArray(res.data.data)) {
          setItems(res.data.data);
          setError("");
        } else {
          setItems([]);
          setError("Invalid data format received from server.");
        }
      })
      .catch((err) => {
        console.error(
          "Error fetching items:",
          err.response?.data || err.message
        );
        setError(
          err.response?.data?.message || "Error fetching items from server."
        );
        setItems([]);
      });
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#FFC107",
      }}
    >
      <Typography variant="h4" color="green" mb={3}>
        Beverages
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <Stack spacing={3} sx={{ width: "95%", mx: "auto" }}>
        {items.map((item) => (
          <Card key={item._id} sx={{ minWidth: "30%", padding: "15px" }}>
            <CardContent>
              <Typography variant="h6" color="green" mb={1} noWrap>
                {item.dishName}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                mb={1}
                style={{ wordBreak: "break-word" }}
              >
                {item.description}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                mb={1}
                style={{ wordBreak: "break-word" }}
              >
                <b>Ingredients:</b>
                {item.ingredients}
              </Typography>
              <Typography variant="h6" color="green">
                Rs.{item.price}
              </Typography>
              <CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ alignContent: "end" }}
                  onClick={() =>
                    addToCart(
                      item._id,
                      item.dishName,
                      item.price,
                      item.sellerEmail
                    )
                  }
                >
                  Add to Cart
                </Button>
              </CardContent>
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && (
          <Typography
            variant="h6"
            color="textSecondary"
            mt={3}
            textAlign={"center"}
          >
            No items added yet. Add new items to start selling.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
