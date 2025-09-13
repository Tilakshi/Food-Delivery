import { Box, Stack, Divider, Typography } from "@mui/material";
import logo from "../Images/Circuler logo.png";
import React from "react";


export default function BottomNav() {
  return (
    <div style={{backgroundColor:"white", margin:"0.1"}}>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ py: 2, textAlign: "center", mx: 2, my: 1, bgcolor: "white" }}>
        <Stack direction="row" spacing={20}>
          <div style={{ margin: "10" }}>
            <img src={logo} alt="logo" style={{ width: 150, height: 150 }} />
          </div>

          <Stack direction={'column'} spacing={5}>
            <Typography variant="h5">About Us</Typography>
            <Typography variant="h5">Contact Us</Typography>
          </Stack>

          <Stack direction={'column'} spacing={5}>
            <Typography variant="h5">Sell on Homely Bites</Typography>
            <Typography variant="h5">Complaints</Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
