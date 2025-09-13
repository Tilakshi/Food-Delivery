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
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SellerMenu() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated. Please log in again.");
      return;
    }

    console.log("Token being sent:", token); // Debugging token issue

    axios
      .get("http://localhost:5000/getSellerItem", {
        headers: { Authorization: `Bearer ${token}` },
      })
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
        console.error("Error fetching items:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Error fetching items from server.");
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
        Your Items
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <Card
        sx={{
          width: isSmallScreen ? "95%" : 350,
          p: 3,
          textAlign: "center",
          mb: 4,
        }}
      >
        <CardContent>
          <Typography variant="h5" color="green">
            Add New Item
          </Typography>
          <IconButton
            component={Link}
            to="/sellerDashboard/addNewItem"
            color="secondary"
            sx={{ mt: 2 }}
          >
            <AddCircle sx={{ fontSize: 60 }} />
          </IconButton>
        </CardContent>
      </Card>

      <Stack spacing={3} sx={{ width: "95%", mx: "auto" }}>
        {items.map((item) => (
          <Card key={item._id} sx={{ minWidth: "30%", padding: "15px" }}>
            <CardContent>
              <Typography variant="h6" color="green" mb={1} noWrap>
                {item.dishName}
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={1} style={{ wordBreak: "break-word" }}>
                {item.description}
              </Typography>
              <Typography variant="h6" color="green">
                Rs.{item.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && (
          <Typography variant="h6" color="textSecondary" mt={3} textAlign={"center"}>
            No items added yet. Add new items to start selling.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
