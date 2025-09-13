import React from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Stack } from "@mui/material";

export default function Profile() {
  return (
    <div>
      <Navbar />
      <Box sx={{backgroundColor:'white', height:'auto',width:'auto'}}>
        <Stack direction={'column'} spacing={10}> 
        <FontAwesomeIcon icon="fa-solid fa-user" />
        </Stack>
      </Box>
    </div>
  );
}
