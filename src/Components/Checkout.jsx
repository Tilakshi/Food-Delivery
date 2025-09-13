import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const calculatedTotal = storedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, []);

  const handlePlaceOrder = async () => {
    if (!buyerName || !shippingAddress) {
      alert("Please enter buyer name and shipping address.");
      return;
    }

    const items = cart.map((item) => ({
      item: item._id || item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      buyer: {
        name: buyerName,
        email: buyerEmail,
        phone: buyerPhone,
      },
      items,
      deliveryAddress: shippingAddress,
      specialInstructions: "",
    };

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/orders/", orderData);
      if (response.status === 201) {
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Order placed successfully!");
        navigate("/buyerDashboard");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert(`Failed to place order: ${error.response?.data?.message || "Server Error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      {cart.length > 0 ? (
        <>
          <List disablePadding>
            {cart.map((item) => (
              <ListItem key={item._id || item.id} sx={{ py: 1, justifyContent: "space-between" }}>
                <ListItemText
                  primary={item.name}
                  secondary={`Rs.${item.price} x ${item.quantity}`}
                />
                <Typography variant="body2">
                  Rs.{item.price * item.quantity}
                </Typography>
              </ListItem>
            ))}
            <ListItem sx={{ py: 1, justifyContent: "space-between" }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Rs.{total}
              </Typography>
            </ListItem>
          </List>
          <Divider sx={{ my: 2 }} />

          {/* Buyer Info */}
          <TextField
            label="Buyer Name"
            fullWidth
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Buyer Email"
            fullWidth
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Buyer Phone"
            fullWidth
            value={buyerPhone}
            onChange={(e) => setBuyerPhone(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Shipping Address"
            multiline
            rows={3}
            fullWidth
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            margin="normal"
            required
          />

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handlePlaceOrder}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Place Order (COD)"}
          </Button>
        </>
      ) : (
        <Typography variant="body1">
          Your cart is empty. Please add items to proceed.
        </Typography>
      )}
    </Box>
  );
};

export default Checkout;
