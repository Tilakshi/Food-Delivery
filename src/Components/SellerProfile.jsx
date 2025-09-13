import {
  Stack,
  Typography,
  Paper,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import React, { use, useEffect, useState } from "react";
import profilePic from "../Images/profilePic.png";
import axios from "axios";

export default function SellerProfile() {
  const [seller, setSeller] = useState({
    fullName: "",
    brandName: "",
    email: "",
    contactNo: "",
    address: "",
    sellingType: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

 
  const handleChange = (e) => {
    setSeller({ ...seller, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("/api/sellers/profile", seller, { withCredentials: true })
        .then(response => setSeller(response.data))
        .catch(error => console.error("Error updating profile", error));
};

if (loading) return <Typography>Loading...</Typography>;


  return (
    <div style={{ marginTop: 10 }}>
      <Paper sx={{ bgcolor: "#ffc400" }}>
        <Stack direction={"column"} spacing={2}>
          <img
            src={profilePic}
            alt="profile"
            style={{
              width: 120,
              height: 120,
              marginTop: 10,
              marginLeft: "50%",
              marginRight: "50%,",
            }}
          />
          <Paper className="Form-container">
            <FormControl onSubmit={handleSubmit}>
              <Stack direction={"column"} spacing={5}>
                <TextField label="Full Name" color="secondary" value={seller.fullName} onChange={handleChange}/>
                <TextField label="Brand Name" color="secondary" value={seller.brandName} onChange={handleChange} />
                <TextField label="Email" color="secondary" value={seller.email} onChange={handleChange} />
                <TextField label="Contact Number" color="secondary" value={seller.contactNo} onChange={handleChange}/>
                <TextField label="Address" color="secondary" value={seller.address} onChange={handleChange} />
                <TextField label="Selling Type" color="secondary" value={seller.sellingType} onChange={handleChange}/>
                <Button color="secondary" size="large" variant="contained">
                  Save Changes
                </Button>
              </Stack>
            </FormControl>
          </Paper>
        </Stack>
      </Paper>
    </div>
  );
}
