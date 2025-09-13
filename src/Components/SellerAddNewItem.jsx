import React, { useState } from "react";
import {
  Stack,
  Typography,
  Box,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SellerAddNewItem() {
  const [message, setMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const formik = useFormik({
    initialValues: {
      dishName: "",
      description: "",
      price: "",
      category: "",
      ingredients: "",
      portionSize: "",
      customization: "",
      dietaryInfo: "",
      sellerEmail: "",
      sellingType: "",
      
    },
    validationSchema: Yup.object({
      dishName: Yup.string().required("*Required"),
      description: Yup.string().required("*Required"),
      price: Yup.number().integer().required("*Required"),
      category: Yup.string().required("*Required"),
      ingredients: Yup.string().required("*Required"),
      portionSize: Yup.string().required("*Required"),
      customization: Yup.string(),
      dietaryInfo: Yup.string(),
      sellerEmail: Yup.string().required("*Required"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      try {
        // Convert price to a number (if it's sent as a string)
        values.price = parseFloat(values.price);

        // Check if 'ingredients' is a string and is not empty
        if (
          typeof values.ingredients === "string" &&
          values.ingredients.trim()
        ) {
          await axios.post("http://localhost:5000/sellerAddItem", values);
          console.log("Added New Item Successfully");
          setError("");
          setMessage(true);
          navigate("/sellerDashboard/sellerMenu");
        } else {
          throw new Error("Ingredients field cannot be empty.");
        }
      } catch (err) {
        console.log("Failed to add new item", err.response?.data);
        setError(err.response?.data?.message || "Failed to add item");
      }
    },
  });

  return (
    <div>
      <Stack direction="column" spacing={15}>
        <Navbar />
        <Stack direction="column" spacing={5} sx={{ margin: "20px" }}>
          <Typography
            variant="h2"
            align="center"
            fontWeight={500}
            color="secondary"
          >
            Add new Item
          </Typography>
          <Box className="Form-container">
            <CardContent className="form">
              <form onSubmit={formik.handleSubmit}>
                <Stack direction="column" spacing={4}>
                  {[
                    { name: "dishName", label: "Dish Name" },
                    { name: "description", label: "Description" },
                    { name: "price", label: "Price" },

                    { name: "ingredients", label: "Ingredients" },
                    { name: "portionSize", label: "Portion Size" },
                    {
                      name: "customization",
                      label: "Customization (Optional)",
                    },
                    { name: "dietaryInfo", label: "Dietary Info" },
                    { name: "sellerEmail", label: `Seller's Email` },
                  ].map(({ name, label }) => (
                    <div key={name}>
                      <TextField
                        variant="outlined"
                        label={label}
                        color="secondary"
                        name={name}
                        {...formik.getFieldProps(name)}
                      />

                      {formik.touched.sellingType &&
                      formik.errors.sellingType ? (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {formik.errors.sellingType}
                        </Typography>
                      ) : null}
                      {formik.touched[name] && formik.errors[name] ? (
                        <Typography variant="body2" sx={{ color: "red" }}>
                          {formik.errors[name]}
                        </Typography>
                      ) : null}
                    </div>
                  ))}
                  <InputLabel>Select Selling Type:</InputLabel>
                  <Select
                    value={formik.values.sellingType}
                    variant="outlined"
                    {...formik.getFieldProps("sellingType")}
                  >
                    <MenuItem value="">Select a category</MenuItem>
                    <MenuItem value={"Bakery"} sx={{ color: "green" }}>
                      Bakery Items
                    </MenuItem>
                    <MenuItem value={"Confectionery"} sx={{ color: "green" }}>
                      Confectionary
                    </MenuItem>
                    <MenuItem value={"Meal Box"} sx={{ color: "green" }}>
                      Meal Boxes
                    </MenuItem>
                    <MenuItem
                      value={"traditionalDishes"}
                      sx={{ color: "green" }}
                    >
                      Traditional Dishes
                    </MenuItem>
                    <MenuItem value={"Beverages"} sx={{ color: "green" }}>
                      Beverages
                    </MenuItem>
                    <MenuItem
                      value={" Jams, Sauce and Spices"}
                      sx={{ color: "green" }}
                    >
                      Jams, Sauce and Condiments
                    </MenuItem>
                    <MenuItem value={"custom"} sx={{ color: "green" }}>
                      Custom Orders
                    </MenuItem>
                  </Select>
                  <Button variant="contained" color="secondary" type="submit">
                    Add Item
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      variant="filled"
                      sx={{ width: "100%" }}
                    >
                      Added new Item Successfully!
                    </Alert>
                  </Snackbar>
                </Stack>
              </form>
            </CardContent>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
