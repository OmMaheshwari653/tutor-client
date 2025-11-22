import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import {
  LibraryBooks as LibraryIcon,
  Chat as ChatIcon,
  Create as CreateIcon,
  Psychology as BrainIcon,
} from "@mui/icons-material";
import BatchItem from "./BatchItem";
import { aliceBlueColor, captionColor } from "../constants/color";

const HomeItems = () => {
  // Steps data
  const steps = [
    {
      number: 1,
      icon: <CreateIcon />,
      title: "Create Your Batch",
      description:
        "Simply fill out the 'New Batch' form with your desired subject or topic. Tell our AI what you want to learn, and it does the rest.",
      features: ["Custom Topics", "Flexible Duration", "Your Preferences"],
    },
    {
      number: 2,
      icon: <BrainIcon />,
      title: "Instant AI Generation",
      description:
        "Our powerful AI analyzes your request and automatically generates a complete learning module, including comprehensive notes, clarifying diagrams, and audio explanations.",
      features: ["Smart Notes", "Visual Diagrams", "Audio Content"],
    },
    {
      number: 3,
      icon: <LibraryIcon />,
      title: "Browse Your Batches",
      description:
        "All your custom-generated batches are neatly organized on your dashboard. Think of it as your personal library of knowledge, ready whenever you are.",
      features: ["Organized Dashboard", "Progress Tracking", "Easy Access"],
    },
    {
      number: 4,
      icon: <ChatIcon />,
      title: "Engage with Your AI Tutor",
      description:
        "Dive into your notes. When you're ready, click 'Continue' to launch an interactive session with your AI tutor, who will guide you through the material with voice explanations.",
      features: ["Voice Guidance", "Interactive Learning", "Personalized Help"],
    },
  ];

  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 6, sm: 7, md: 8 },
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)`,
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            mb: { xs: 1, md: 2 },
            textShadow: `0 0 20px ${aliceBlueColor}30`,
          }}
        >
          Create. Learn. Master.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem", lg: "1.3rem" },
            color: captionColor,
            textAlign: "center",
            mb: { xs: 4, sm: 5, md: 6 },
            maxWidth: { xs: "90%", sm: "80%", md: "800px" },
            mx: "auto",
            lineHeight: 1.5,
          }}
        >
          In Just a Few Clicks
        </Typography>

        <Grid
          container
          spacing={{ xs: 3, sm: 3, md: 4 }}
          sx={{
            width: { xs: "100%", lg: "100vw" },
            maxWidth: { xs: "100%", lg: "none" },
            marginLeft: { lg: "calc(-50vw + 50%)" },
            marginRight: { lg: "calc(-50vw + 50%)" },
            px: { xs: 2, sm: 3, lg: 4 },
          }}
        >
          {steps.map((step) => (
            <Grid
              size={{ xs: 12, sm: 6, lg: 3 }}
              key={step.number}
              sx={{ display: "flex" }}
            >
              <BatchItem
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
                features={step.features}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeItems;
