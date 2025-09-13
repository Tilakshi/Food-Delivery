import React from "react";
import Navbar from "./Navbar";
import logo from "./../Images/LandingPageImage.png";
import { Stack } from "@mui/material";
import FeaturedDishes from "./FeaturedDishes";
import HowItWorks from "./HowItWorks";
import PopularStores from "./PopularStores";
import BottomNav from "./BottomNav";

export default function Index() {
  return (
    <div>
      <Stack direction={"column"} spacing={5}>
        <Navbar />
        <div>
          <img
            src={logo}
            alt="landingImage"
            style={{ height: "600px", width: "80%", marginLeft: "10%", marginTop:"3%" }}
          />
        </div>
        <HowItWorks/>
        
        <div>
          <FeaturedDishes/>
        </div>
        <PopularStores/>
        <BottomNav/>
          
      </Stack>
    </div>
  );
}
