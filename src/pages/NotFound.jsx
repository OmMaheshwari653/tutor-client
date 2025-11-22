import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import {
  SearchOff as SearchOffIcon,
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import {
  aliceBlueColor,
  darkBlueColor,
  blackBoardColor,
  captionColor,
} from "../components/constants/color";

const NotFound = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100%",
      background: blackBoardColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      py: 8,
    },
    card: {
      p: 6,
      textAlign: "center",
      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)`,
      backdropFilter: "blur(20px)",
      border: `1px solid ${aliceBlueColor}30`,
      borderRadius: 3,
      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px ${aliceBlueColor}20`,
      maxWidth: 500,
    },
    errorCode: {
      fontSize: { xs: "6rem", md: "8rem" },
      fontWeight: "bold",
      color: aliceBlueColor,
      lineHeight: 1,
      mb: 2,
      textShadow: `0 0 20px ${aliceBlueColor}50`,
    },
    title: {
      color: "white",
      fontWeight: "bold",
      mb: 2,
      textShadow: `0 0 10px ${aliceBlueColor}50`,
    },
    subtitle: {
      color: captionColor,
      mb: 4,
      lineHeight: 1.6,
    },
    button: {
      bgcolor: aliceBlueColor,
      color: darkBlueColor,
      fontWeight: "bold",
      px: 3,
      py: 1,
      borderRadius: 2,
      boxShadow: `0 4px 15px ${aliceBlueColor}40`,
      "&:hover": {
        bgcolor: "#4fd3b8",
        boxShadow: `0 6px 20px ${aliceBlueColor}60`,
        transform: "translateY(-2px)",
      },
      transition: "all 0.3s ease",
    },
    secondaryButton: {
      borderColor: "white",
      color: "white",
      fontWeight: "bold",
      px: 3,
      py: 1,
      borderRadius: 2,
      "&:hover": {
        borderColor: aliceBlueColor,
        color: aliceBlueColor,
        bgcolor: `${aliceBlueColor}10`,
      },
      transition: "all 0.3s ease",
    },
  };

  return (
    <Box sx={styles.container}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={styles.card}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 3,
              bgcolor: `${aliceBlueColor}20`,
              border: `2px solid ${aliceBlueColor}`,
            }}
          >
            <SearchOffIcon sx={{ fontSize: 50, color: aliceBlueColor }} />
          </Avatar>

          <Typography variant="h1" sx={styles.errorCode}>
            404
          </Typography>

          <Typography variant="h4" sx={styles.title}>
            Page Not Found
          </Typography>

          <Typography variant="h6" sx={styles.subtitle}>
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              sx={styles.button}
            >
              Go Home
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={styles.secondaryButton}
            >
              Go Back
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default AppLayout()(NotFound);
