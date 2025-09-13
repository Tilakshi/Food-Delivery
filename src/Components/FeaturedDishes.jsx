import React from "react";
import { Box, Stack, Card, Typography, CardContent } from "@mui/material";
import riceChicken from "../Images/riceAndCurryChicken.png";
import stringHoppers from "../Images/StringHoppers.png";
import chickenKottu from "../Images/chickenKottu.png";

export default function FeaturedDishes() {
  return (
    <div>
      <Box
        sx={{
          width: "94%",
          height: 900,
          borderRadius: 2,
          border: 2,
          marginLeft: "3%",
          marginRight: "3%",
          marginTop: 5,
          bgcolor: "amber",
        }}
      >
        <Stack direction={"column"} spacing={5}>
          <Typography variant="h2" align="center" fontWeight={500} color="white">
            Our Featured Dishes
          </Typography>
          <Stack direction={"row"}>
            <Card
              sx={{
                bgcolor: "secondary.main",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={riceChicken}
                    alt="Chicken Rice and Curry"
                    style={{
                        height:250,
                        maxHeight:'300px',
                      width: "auto",
                      maxWidth: "100%",
                    }}
                  />
                </div>
                <Typography variant="h5" align="center" fontWeight={600} color="white">
                  Rice and Curry Chicken
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                bgcolor: "secondary.main",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{display:'flex', justifyContent:'center'}}>
                <img
                  src={stringHoppers}
                  alt="Chicken Rice and Curry"
                  style={{
                    height:250,
                    maxHeight:"100%",
                    width:'auto',
                    maxWidth:'200%'
                  }}
                />
                </div>
                <Typography variant="h5" align="center" fontWeight={600} color="white">
                  String Hoppers with Kiri Maalu
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                bgcolor: "secondary.main",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{display:'flex', justifyContent:'center'}}>
                <img
                  src={chickenKottu}
                  alt="Chicken Kottu Rotti"
                  style={{
                    height:250,
                    width:'auto',
                    maxWidth:'100%'
                  }}
                />
                </div>
                <Typography variant="h5" align="center" fontWeight={600} color="white">
                  Chicken Kottu Rotti
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          <Stack direction={"row"}>
            <Card
              sx={{
                bgcolor: "secondary.main",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={riceChicken}
                    alt="Chicken Rice and Curry"
                    style={{
                        height:250,
                        maxHeight:'300px',
                      width: "auto",
                      maxWidth: "100%",
                    }}
                  />
                </div>
                <Typography variant="h5" align="center" fontWeight={600} color="white">
                  Rice and Curry Chicken
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                bgcolor: "secondary.main",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{display:'flex', justifyContent:'center'}}>
                <img
                  src={stringHoppers}
                  alt="Chicken Rice and Curry"
                  style={{
                    height:250,
                    maxHeight:"100%",
                    width:'auto',
                    maxWidth:'200%'
                  }}
                />
                </div>
                <Typography variant="h5" align="center" fontWeight={600} color="white">
                  String Hoppers with Kiri Maalu
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                bgcolor: "secondary.main",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{display:'flex', justifyContent:'center'}}>
                <img
                  src={chickenKottu}
                  alt="Chicken Kottu Rotti"
                  style={{
                    height:250,
                    width:'auto',
                    maxWidth:'100%'
                  }}
                />
                </div>
                <Typography variant="h5" align="center" fontWeight={600} color="white">
                  Chicken Kottu Rotti
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
        
      </Box>
    </div>
  );
}
