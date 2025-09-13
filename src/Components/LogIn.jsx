import React, { useState } from "react";
import {
  Stack,
  Typography,
  Box,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function LogIn() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("*Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("*Required"),
    }),
    onSubmit: async (values) => {
      console.log("Form data", values);
      try {
        const res = await axios.post("http://localhost:5000/Login", values);

        if (!res.data.token) {
          throw new Error("No token received from server.");
        }

        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("token", token);

        console.log("API Response:", res);

        localStorage.setItem("token", res.data.token);

        const decodedToken = jwtDecode(res.data.token);
        console.log("Decoded Token:", decodedToken);
        const userRole = decodedToken.role;

        setError("");
        setSuccess(true);

        switch (userRole) {
          case "admin":
            navigate("/getAll");
            break;
          case "buyer":
            navigate("/buyerDashboard");
            break;
          case "seller":
            navigate("/sellerDashboard");
            break;
          default:
            console.error("Unknown role");
            setError("Invalid role detected. Please contact support.");
        }
      } catch (err) {
        console.error("Login failed", err.response?.data || err.message);
        setError(
          err.response?.data?.message || "Login failed! Please try again."
        );
        setSuccess(false);
      }
    },
  });

  return (
    <div>
      <Stack direction={"column"} spacing={15}>
        <Navbar />
        <Stack direction={"column"} spacing={5} sx={{ margin: "20px" }}>
          <Typography
            variant="h2"
            align="center"
            fontWeight={500}
            color="secondary"
          >
            LOGIN
          </Typography>
          <Box className="Form-container">
            <CardContent className="form">
              <form onSubmit={formik.handleSubmit}>
                <Stack direction={"column"} spacing={4}>
                  <TextField
                    variant="outlined"
                    label="Email"
                    color="secondary"
                    name="email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.email}
                    </Typography>
                  )}

                  <TextField
                    variant="outlined"
                    label="Password"
                    color="secondary"
                    type="password"
                    name="password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {formik.errors.password}
                    </Typography>
                  )}

                  <Button variant="contained" color="secondary" type="submit">
                    Login
                  </Button>

                  <Stack direction={"row"} spacing={2}>
                    <Typography variant="h6" color="green">
                      New User?
                    </Typography>
                    <Link to="/signup">
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: "550px" }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </Stack>
                </Stack>
              </form>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </CardContent>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
