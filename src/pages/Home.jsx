import React, { Suspense, useCallback, lazy } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  School as SchoolIcon,
  PlayArrow as PlayIcon,
} from "@mui/icons-material";
import HomeItems from "../components/shared/HomeItems";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import {
  blackBoardColor,
  aliceBlueColor,
  darkBlueColor,
  captionColor,
} from "../components/constants/color";
const PageLoader = lazy(() => import("../components/layouts/Loaders"));

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Navigation handlers
  const handleGetStarted = useCallback(() => {
    if (isLoggedIn) {
      // Open NewBatch dialog or navigate to profile
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  const handleDemo = useCallback(() => {
    const howItWorksSection = document.getElementById("how-it-works");
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Box sx={{ background: blackBoardColor, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          background: blackBoardColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 20% 80%, ${aliceBlueColor}20 0%, transparent 50%), 
                         radial-gradient(circle at 80% 20%, ${aliceBlueColor}15 0%, transparent 50%)`,
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <Box sx={{ mb: 4 }}>
            <img
              src="/vite.svg"
              alt="Tutor Logo"
              style={{
                width: 150,
                height: 150,
                filter: `brightness(0) saturate(100%) invert(84%) sepia(84%) saturate(6558%) hue-rotate(142deg) brightness(101%) contrast(101%)`,
              }}
            />
          </Box>

          {/* Main Headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
              fontWeight: "bold",
              background: `linear-gradient(135deg, white 0%, ${aliceBlueColor} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 30px ${aliceBlueColor}30`,
              mb: 2,
              letterSpacing: "-0.02em",
            }}
          >
            Your Personal Path to Progress
          </Typography>

          {/* Sub-headline */}
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: captionColor,
              mb: 4,
              maxWidth: "600px",
              lineHeight: 1.6,
              mx: "auto",
            }}
          >
            Transform your topics into interactive, AI-powered study batches
            with notes, diagrams, and a personal voice tutor.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Suspense fallback={PageLoader}>
              <Button
                sx={{
                  bgcolor: aliceBlueColor,
                  color: darkBlueColor,
                  fontWeight: "bold",
                  px: 4,
                  py: 2,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  boxShadow: `0 8px 25px ${aliceBlueColor}40`,
                  "&:hover": {
                    bgcolor: "#4fd3b8",
                    boxShadow: `0 12px 35px ${aliceBlueColor}60`,
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={handleGetStarted}
              >
                <PlayIcon sx={{ mr: 1 }} />
                {isLoggedIn ? "Go to Dashboard" : "Get Started for Free"}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  fontWeight: "bold",
                  px: 4,
                  py: 2,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  borderWidth: 2,
                  "&:hover": {
                    borderColor: aliceBlueColor,
                    color: aliceBlueColor,
                    bgcolor: `${aliceBlueColor}10`,
                    borderWidth: 2,
                    boxShadow: `0 8px 25px ${aliceBlueColor}30`,
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={handleDemo}
              >
                See a Demo
              </Button>
            </Suspense>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <HomeItems />

      {/* Final CTA Section */}
      <Container
        maxWidth="md"
        sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}
      >
        <Card
          sx={{
            py: { xs: 4, sm: 6, md: 10 },
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`,
            backdropFilter: "blur(15px)",
            textAlign: "center",
            border: `1px solid ${aliceBlueColor}20`,
            borderRadius: 4,
            margin: { xs: 0, sm: "0 10px", md: "0 20px" },
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 6 } }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.8rem",
                  md: "2.2rem",
                  lg: "2.5rem",
                },
                fontWeight: "bold",
                color: "white",
                mb: { xs: 2, md: 3 },
                textShadow: `0 0 20px ${aliceBlueColor}30`,
                lineHeight: 1.2,
              }}
            >
              Ready to Revolutionize Your Learning?
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
                color: captionColor,
                mb: { xs: 3, md: 4 },
                maxWidth: { xs: "100%", sm: "500px", md: "600px" },
                mx: "auto",
                lineHeight: 1.6,
                px: { xs: 1, sm: 0 },
              }}
            >
              Stop spending hours creating study guides. Let "Tutor" build your
              personal learning path, so you can focus on what truly matters:
              understanding and mastering new skills.
            </Typography>

            <Divider
              sx={{
                bgcolor: `${aliceBlueColor}30`,
                mb: { xs: 3, md: 4 },
                width: { xs: "60%", sm: "50%" },
                mx: "auto",
              }}
            />

            <Button
              size="large"
              sx={{
                bgcolor: aliceBlueColor,
                color: darkBlueColor,
                fontWeight: "bold",
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                  lg: "1.3rem",
                },
                px: { xs: 3, sm: 4, md: 6 },
                py: { xs: 1.5, sm: 2, md: 2.5 },
                borderRadius: 3,
                boxShadow: `0 8px 25px ${aliceBlueColor}40`,
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: "100%", sm: "400px" },
                "&:hover": {
                  bgcolor: "#4fd3b8",
                  boxShadow: `0 12px 35px ${aliceBlueColor}60`,
                  transform: "translateY(-3px)",
                },
                transition: "all 0.3s ease",
              }}
              onClick={handleGetStarted}
            >
              <SchoolIcon sx={{ mr: { xs: 1, sm: 2 } }} />
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                Sign Up and Create Your First Batch Now
              </Box>
              <Box
                component="span"
                sx={{ display: { xs: "inline", sm: "none" } }}
              >
                Get Started Now
              </Box>
            </Button>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: `${aliceBlueColor}80`,
                mt: { xs: 1.5, md: 2 },
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.9rem" },
                px: { xs: 1, sm: 0 },
              }}
            >
              🎓 Join thousands of learners already on their path to progress
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AppLayout()(Home);
