import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Fade,
} from "@mui/material";
import { School as SchoolIcon } from "@mui/icons-material";
import {
  aliceBlueColor,
  blackBoardColor,
  captionColor,
} from "../constants/color";

// Main App Loader
export const AppLoader = () => (
  <Fade in={true} timeout={300}>
    <Box
      sx={{
        minHeight: "100vh",
        background: blackBoardColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 3,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          size={80}
          thickness={4}
          sx={{
            color: aliceBlueColor,
            position: "absolute",
            animation: "spin 2s linear infinite",
            "@keyframes spin": {
              "0%": {
                transform: "rotate(0deg)",
              },
              "100%": {
                transform: "rotate(360deg)",
              },
            },
          }}
        />
        <SchoolIcon
          sx={{
            fontSize: 40,
            color: "white",
            zIndex: 1,
          }}
        />
      </Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          color: "white",
          textAlign: "center",
          textShadow: `0 0 10px ${aliceBlueColor}50`,
          animation: "pulse 2s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": {
              opacity: 1,
            },
            "50%": {
              opacity: 0.7,
            },
          },
        }}
      >
        Loading Your Learning Journey...
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: captionColor,
          textAlign: "center",
          maxWidth: 400,
          lineHeight: 1.6,
        }}
      >
        Please wait while we prepare your personalized AI-powered learning
        experience
      </Typography>

      {/* Loading dots */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 2,
        }}
      >
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: aliceBlueColor,
              animation: `bounce 1.4s ease-in-out ${
                index * 0.16
              }s infinite both`,
              "@keyframes bounce": {
                "0%, 80%, 100%": {
                  transform: "scale(0)",
                },
                "40%": {
                  transform: "scale(1.0)",
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  </Fade>
);

// AllBatch Specific Loader
export const AllBatchLoader = () => (
  <Fade in={true} timeout={300}>
    <Box
      sx={{
        minHeight: "100vh",
        background: blackBoardColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)`,
            backdropFilter: "blur(20px)",
            border: `1px solid ${aliceBlueColor}30`,
            borderRadius: 3,
            p: 6,
            textAlign: "center",
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px ${aliceBlueColor}20`,
          }}
        >
          {/* Animated Icon */}
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <CircularProgress
              size={100}
              thickness={3}
              sx={{
                color: aliceBlueColor,
                position: "absolute",
                animation: "spin 2s linear infinite",
                "@keyframes spin": {
                  "0%": {
                    transform: "rotate(0deg)",
                  },
                  "100%": {
                    transform: "rotate(360deg)",
                  },
                },
              }}
            />
            <SchoolIcon
              sx={{
                fontSize: 50,
                color: "white",
                zIndex: 1,
                animation: "bounce 2s ease-in-out infinite",
                "@keyframes bounce": {
                  "0%, 20%, 50%, 80%, 100%": {
                    transform: "translateY(0)",
                  },
                  "40%": {
                    transform: "translateY(-10px)",
                  },
                  "60%": {
                    transform: "translateY(-5px)",
                  },
                },
              }}
            />
          </Box>

          {/* Loading Text */}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "white",
              mb: 2,
              textShadow: `0 0 15px ${aliceBlueColor}50`,
              animation: "glow 2s ease-in-out infinite alternate",
              "@keyframes glow": {
                "0%": {
                  textShadow: `0 0 15px ${aliceBlueColor}50`,
                },
                "100%": {
                  textShadow: `0 0 25px ${aliceBlueColor}80`,
                },
              },
            }}
          >
            Loading Your Batches
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: captionColor,
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Preparing your personalized learning dashboard with AI-powered
            courses
          </Typography>

          {/* Progress Dots */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mb: 3,
            }}
          >
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: aliceBlueColor,
                  opacity: 0.3,
                  animation: `pulse 1.5s ease-in-out ${index * 0.2}s infinite`,
                  "@keyframes pulse": {
                    "0%, 100%": {
                      opacity: 0.3,
                      transform: "scale(1)",
                    },
                    "50%": {
                      opacity: 1,
                      transform: "scale(1.2)",
                    },
                  },
                }}
              />
            ))}
          </Box>

          {/* Loading Steps */}
          <Box sx={{ textAlign: "left", maxWidth: 300, margin: "0 auto" }}>
            {[
              "Fetching your courses...",
              "Calculating progress...",
              "Preparing AI tutors...",
            ].map((step, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  color: "#e0e0e0",
                  mb: 1,
                  opacity: 0.8,
                  fontSize: "0.9rem",
                  animation: `fadeIn 0.5s ease-in ${index * 0.3}s both`,
                  "@keyframes fadeIn": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(10px)",
                    },
                    "100%": {
                      opacity: 0.8,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                • {step}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  </Fade>
);

// Simple Page Loader
export const PageLoader = ({ message = "Loading..." }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "200px",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <CircularProgress
      size={60}
      sx={{
        color: aliceBlueColor,
      }}
    />
    <Typography
      variant="h6"
      sx={{
        color: "white",
        textAlign: "center",
      }}
    >
      {message}
    </Typography>
  </Box>
);

export default AppLoader;
