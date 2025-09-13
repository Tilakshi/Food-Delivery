import React, { useState } from "react";
import {
  Stack,
  Typography,
  Box,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {
  const [message, setMessage] = useState(false);
  const [open, setOpen] = React.useState(false);
  const[error,setError]=useState('');
  const navigate=useNavigate();
  

  const handleClick = () => {
    
    if(message){
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
      userName: "",
      email: "",
      contactNo: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
    onSubmit: async (values) => {
      try{
        await axios.post('http://localhost:5000/buyerSignup',values);
        console.log('Registration Successful');
        setError('');
        navigate('/login');
      }catch(err){
        console.log('Registration Failed',err.response.data);
        setError(err.response.data.message);
      };
      setMessage(true);
      
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("*Required"),
      userName: Yup.string().required("*Required"),
      email: Yup.string().email("Invalid Email").required("*Required"),
      contactNo: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter a valid 10 digit number")
        .required("*Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()/-])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be 8 characters long, consits with atleast one lowercase,uppercase,numeric and a symbol"
        )
        .required("*Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("*Required"),
      address: Yup.string().required("*Required"),
    }),
  });

  return (
    <div>
      <Stack direction={'column'} spacing={15}>
        
      <Navbar />
      <Stack direction={"column"} spacing={5} sx={{ margin: "20px" }}>
        <Typography
          variant="h2"
          align="center"
          fontWeight={500}
          color="secondary"
        >
          SIGN UP
        </Typography>
        <div>
          <Box className="Form-container">
            <CardContent className="form">
              <form onSubmit={formik.handleSubmit}>
                <Stack direction={"column"} spacing={4}>
                  <TextField
                    variant="outlined"
                    label="Full Name"
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
                    label="User Name"
                    color="secondary"
                    name="userName"
                    {...formik.getFieldProps("userName")}
                  />
                  {formik.touched.userName && formik.errors.userName ? (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.userName}
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
                    label="Home Address"
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

                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    onClick={handleClick}
                  >
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
                      Your Signup is Successful!
                    </Alert>
                  </Snackbar>

                  <Stack direction={"row"} spacing={5}>
                    <Typography variant="h6" align="center" color="secondary">
                      Already Registered?
                    </Typography>
                  <Link to='/login'>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ width: "450px" }}
                    >
                      Log in
                    </Button>
                  </Link>
                    
                  </Stack>
                </Stack>
              </form>
            </CardContent>
          </Box>
        </div>
      </Stack>
      </Stack>
    </div>
  );
}
