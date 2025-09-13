import React, { useState } from "react";
import {
  Stack,
  Typography,
  Box,
  CardContent,
  TextField,
  Button,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [message, setMessage] = useState(false);
  const [open, setOpen] = React.useState(false);
  const[error,setError]=useState('');
  const navigate=useNavigate();

  const handleClick = () => {
    if (message) {
      setOpen(true);
    }
  };

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
      fullName: "",
      brandName: "",
      email: "",
      contactNo: "",
      password: "",
      confirmPassword: "",
      address: "",
      sellingType: "",
    },
    onSubmit: async (values) => {
      console.log("Form data", values);
      try{
        await axios.post('http://localhost:5000/becomeAChef',values);
        console.log('Registration Successful');
        setError('');
        navigate('/login');
    }catch(err){
      console.log('Registratioin Failed',err.response.data);
      setError(err.response.data);
    }

      setMessage(true);
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("*Required"),
      brandName: Yup.string().required("*Required"),
      email: Yup.string().email("Invalid Email").required("*Required"),
      contactNo: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10 digit number")
        .required("*Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be 8 characters long, consits with atleast one lowercase,uppercase,numeric and a symbol"
        )
        .required("*Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("*Required"),
      address: Yup.string().required("*Required"),
    }),
    sellingType: Yup.string().required("*Required"),
  });

  return (
    <div >
      <Navbar />
      <Stack direction={"column"} spacing={5} sx={{ margin: "100px" }}>
        <Typography
          variant="h2"
          align="center"
          fontWeight={500}
          color="secondary"
        >
          SIGN UP
        </Typography>
        <Typography
          variant="h3"
          align="center"
          fontWeight={400}
          color="secondary"
        >
          Seller Registration
        </Typography>
        <div>
          <Box className="Form-container">
            <CardContent className="form">
              <form onSubmit={formik.handleSubmit}>
                <Stack direction={"column"} spacing={4}>
                  <TextField
                    variant="outlined"
                    label="Full Name of owner"
                    color="secondary"
                    name="fullName"
                    {...formik.getFieldProps("fullName")}
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.fullName}
                    </Typography>
                  ) : null}
                  <TextField
                    variant="outlined"
                    label="Email"
                    color="secondary"
                    type="email"
                    name="email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.email}
                    </Typography>
                  ) : null}
                  <TextField
                    variant="outlined"
                    label="Brand Name"
                    color="secondary"
                    name="brandName"
                    {...formik.getFieldProps("brandName")}
                  />
                  {formik.touched.brandName && formik.errors.brandName ? (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.brandName}
                    </Typography>
                  ) : null}
                  <TextField
                    variant="outlined"
                    label="Password"
                    color="secondary"
                    type="password"
                    name="password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.password}
                    </Typography>
                  ) : null}
                  <TextField
                    variant="outlined"
                    label="Confirm Password"
                    color="secondary"
                    type="password"
                    name="confirmPassword"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.confirmPassword}
                    </Typography>
                  ) : null}
                  <TextField
                    variant="outlined"
                    label="Sellers Address"
                    color="secondary"
                    name="address"
                    {...formik.getFieldProps("address")}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.address}
                    </Typography>
                  ) : null}
                  <TextField
                    variant="outlined"
                    label="Contact No"
                    color="secondary"
                    name="contactNo"
                    {...formik.getFieldProps("contactNo")}
                  />
                  {formik.touched.contactNo && formik.errors.contactNo ? (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.contactNo}
                    </Typography>
                  ) : null}
                  {/* <InputLabel>Slect the selling food type</InputLabel> */}
                  <InputLabel>Select Selling Type:</InputLabel>
                  <Select
                    value={formik.sellingType}
                    variant="outlined"
                    {...formik.getFieldProps("sellingType")}
                  >
                    <MenuItem value={"bakery"} sx={{ color: "green" }}>
                      Bakery Items
                    </MenuItem>
                    <MenuItem value={"confectionary"} sx={{ color: "green" }}>
                      Confectionary
                    </MenuItem>
                    <MenuItem value={"mealBoxes"} sx={{ color: "green" }}>
                      Meal Boxes
                    </MenuItem>
                    <MenuItem
                      value={"traditionalDishes"}
                      sx={{ color: "green" }}
                    >
                      Traditional Dishes
                    </MenuItem>
                    <MenuItem value={"beverages"} sx={{ color: "green" }}>
                      Beverages
                    </MenuItem>
                    <MenuItem value={"jams"} sx={{ color: "green" }}>
                      Jams, Sauce and Condiments
                    </MenuItem>
                    <MenuItem value={"custom"} sx={{ color: "green" }}>
                      Custom Orders
                    </MenuItem>
                  </Select>
                  {formik.touched.sellingType && formik.errors.sellingType ? (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.sellingType}
                    </Typography>
                  ) : null}

                  <Button variant="contained" color="secondary" type="submit" onClick={handleClick}>
                    Sign Up
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
                      
                    </Alert>
                  </Snackbar>
                  <Stack direction={"row"} spacing={5}>
                    <Typography variant="h6" align="center" color="secondary">
                      Already Registered?
                    </Typography>

                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ width: "450px" }}
                    >
                      Log in
                    </Button>

                    
                  </Stack>
                </Stack>
              </form>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </CardContent>
          </Box>
        </div>
      </Stack>
    </div>
  );
}
