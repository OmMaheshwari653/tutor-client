import React from "react";
import { Box, Typography, Container, Stack, Divider } from "@mui/material";
import { mattBlack, aliceBlueColor, captionColor } from "../constants/color";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: mattBlack,
        color: "white",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="h6"
            sx={{
              color: aliceBlueColor,
              fontWeight: "bold",
            }}
          >
            Tutor
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: captionColor,
              textAlign: { xs: "center", sm: "right" },
            }}
          >
            © 2025 Tutor App. All rights reserved.
          </Typography>
        </Stack>

        <Divider sx={{ my: 2, borderColor: `${aliceBlueColor}30` }} />

        <Typography
          variant="body2"
          sx={{
            color: captionColor,
            textAlign: "center",
          }}
        >
          Empowering education through technology
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
