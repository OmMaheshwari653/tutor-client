import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import {
  aliceBlueColor,
  darkBlueColor,
  captionColor,
} from "../constants/color";

const styles = {
  stepCard: {
    height: "100%",
    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)`,
    backdropFilter: "blur(20px)",
    border: `1px solid ${aliceBlueColor}30`,
    borderRadius: 3,
    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    position: "relative",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: `0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${aliceBlueColor}20`,
    },
  },
  stepIcon: {
    width: { xs: 60, sm: 70, md: 80 },
    height: { xs: 60, sm: 70, md: 80 },
    bgcolor: aliceBlueColor,
    color: darkBlueColor,
    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
    mb: { xs: 2, sm: 2.5, md: 3 },
    boxShadow: `0 8px 25px ${aliceBlueColor}40`,
  },
  stepNumber: {
    position: "absolute",
    top: { xs: -8, sm: -9, md: -10 },
    right: { xs: -8, sm: -9, md: -10 },
    width: { xs: 32, sm: 36, md: 40 },
    height: { xs: 32, sm: 36, md: 40 },
    bgcolor: aliceBlueColor,
    color: darkBlueColor,
    fontWeight: "bold",
    fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.2rem" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    boxShadow: `0 4px 15px ${aliceBlueColor}50`,
  },
};

const BatchItem = ({ number, icon, title, description, features }) => (
  <Card sx={styles.stepCard}>
    <CardContent
      sx={{
        p: { xs: 2.5, sm: 3, md: 4 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Box sx={styles.stepNumber}>{number}</Box>
      <Avatar sx={styles.stepIcon}>{icon}</Avatar>
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          mb: { xs: 1.5, sm: 2 },
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: captionColor,
          mb: { xs: 2, sm: 2.5, md: 3 },
          lineHeight: 1.6,
          flexGrow: 1,
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.95rem" },
        }}
      >
        {description}
      </Typography>
      <Box sx={{ width: "100%" }}>
        {features.map((feature, idx) => (
          <Chip
            key={idx}
            label={feature}
            size="small"
            sx={{
              bgcolor: `${aliceBlueColor}20`,
              color: aliceBlueColor,
              border: `1px solid ${aliceBlueColor}40`,
              mb: { xs: 0.3, sm: 0.4, md: 0.5 },
              mr: { xs: 0.3, sm: 0.4, md: 0.5 },
              fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
              height: { xs: "22px", sm: "24px", md: "26px" },
              "&:hover": {
                bgcolor: `${aliceBlueColor}30`,
              },
            }}
          />
        ))}
      </Box>
    </CardContent>
  </Card>
);

export default BatchItem;
