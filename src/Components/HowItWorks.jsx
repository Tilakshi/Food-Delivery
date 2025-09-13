import React from 'react';
import { Stack, Box, Typography, Card, CardContent } from "@mui/material";
import { ArrowForwardIos, DeliveryDining, Restaurant, ShoppingCart} from "@mui/icons-material";

export default function HowItWorks() {
  return (
    <div>
      <Box
          sx={{
            width: "94%",
            height: 'auto',
            borderRadius: 2,
            border: 2,
            marginLeft: "3%",
            marginRight: "3%",
            marginTop: 5,
          }}
        >
          <Typography align="center" variant="h2" sx={{ fontWeight: 500, marginBottom:2 }} color='white'>
            How it works
          </Typography>
          <Stack direction={"row"} spacing={10}>
            <Card sx={{ bgcolor: "#ffc400", height:200, margin:5,boxShadow:'none'}} raised={false}>
              <CardContent>
                <Stack direction={"column"} spacing={4}>
                  <div style={{marginRight:'50%',marginLeft:'50%'}}>
                    <ShoppingCart />
                  </div>
                  <Typography align="center" color='white'>
                    Choose what you are craving and place the order
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: "#ffc400", height:200,boxShadow:'none',width:100 }} raised={false}>
              <CardContent>
                <ArrowForwardIos/>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: "#ffc400", height:200,boxShadow:'none' }} raised={false}>
              <CardContent>
                <Stack direction={"column"} spacing={2}>
                  <div style={{marginRight:'50%',marginLeft:'50%'}}>
                    <Restaurant color='white'/>
                  </div>
                  <Typography align="center" color='white'>
                    Our restaurents will prepare your orders
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: "#ffc400", height:200,boxShadow:'none',width:100 }} raised={false}>
              <CardContent>
                <ArrowForwardIos/>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: "#ffc400", height:200, boxShadow:'none' }} raised={false}>
              <CardContent>
                <Stack direction={"column"} spacing={2}>
                  <div style={{marginRight:'50%',marginLeft:'50%'}}>
                    <DeliveryDining color='white'/>
                  </div>
                  <Typography align="center" color='white'>
                    Your food is delivered hot and fresh
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
    </div>
  )
}
