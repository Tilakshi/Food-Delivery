import React from "react";
import logo from "./../Images/LandingPageImage.png";
import { Stack } from "@mui/material";
import FeaturedDishes from "./FeaturedDishes";
import HowItWorks from "./HowItWorks";
import PopularStores from "./PopularStores";
import BottomNav from "./BottomNav";
import NavbarAfter from "./SellerDashboard";


export default function IndexAfter() {
  return (
    <div>
        <Stack direction={"column"} spacing={5}>
        <NavbarAfter />
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
  )
}
