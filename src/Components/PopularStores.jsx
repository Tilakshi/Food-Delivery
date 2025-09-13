import React from "react";
import {
  Box,
  Stack,
  Card,
  Typography,
  CardContent,
  Button,
} from "@mui/material";

export default function PopularStores() {
  return (
    <div>
      <Box
        sx={{
          width: "94%",
          height: 400,
          borderRadius: 2,
          border: 2,
          marginLeft: "3%",
          marginRight: "3%",
          marginTop: 5,
        }}
      >
        <Stack direction={"column"} spacing={5}>
          <Typography variant="h2" align="center" fontWeight={500} color="white">
            Most Popular Stores
          </Typography>
          <Stack direction={"row"}>
            <Card
              sx={{
                bgcolor: "#ffc400",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button>
                    <Typography variant="h5" align="center" fontWeight={600}>
                      Rice and Curry Chicken
                    </Typography>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card
              sx={{
                bgcolor: "#ffc400",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button>
                    <Typography variant="h5" align="center" fontWeight={600}>
                      String Hoppers with Kiri Maalu
                    </Typography>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              sx={{
                bgcolor: "#ffc400",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button>
                    <Typography variant="h5" align="center" fontWeight={600}>
                      Chicken Kottu Rotti
                    </Typography>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Stack>

          <Stack direction={"row"}>
            <Card
              sx={{
                bgcolor: "#ffc400",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button>
                    <Typography variant="h5" align="center" fontWeight={600}>
                      Rice and Curry Chicken
                    </Typography>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card
              sx={{
                bgcolor: "#ffc400",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button>
                    <Typography variant="h5" align="center" fontWeight={600}>
                      String Hoppers with Kiri Maalu
                    </Typography>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card
              sx={{
                bgcolor: "#ffc400",
                height: "auto",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <CardContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button>
                    <Typography variant="h5" align="center" fontWeight={600}>
                      Chicken Kottu Rotti
                    </Typography>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
