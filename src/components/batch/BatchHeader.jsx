import React, { memo } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Paper,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";

/**
 * Header component for batch page
 */
const BatchHeader = memo(
  ({
    batchData,
    batchNotes,
    isDarkMode,
    isMobile,
    themeStyles,
    chatMessagesCount,
    onBack,
    onToggleTheme,
    onOpenChat,
  }) => {
    return (
      <Paper elevation={6} sx={themeStyles.topBar}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              display="flex"
              alignItems="center"
              gap={{ xs: 1.5, md: 3 }}
              flexWrap="wrap"
            >
              <IconButton
                onClick={onBack}
                sx={{
                  color: "#64ffda",
                  bgcolor: "rgba(100, 255, 218, 0.15)",
                  "&:hover": {
                    bgcolor: "rgba(100, 255, 218, 0.25)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Avatar
                sx={{
                  bgcolor: "#64ffda",
                  color: "#0f172a",
                  width: { xs: 40, md: 56 },
                  height: { xs: 40, md: 56 },
                  boxShadow: "0 4px 15px rgba(100, 255, 218, 0.3)",
                }}
              >
                <SchoolIcon fontSize={isMobile ? "medium" : "large"} />
              </Avatar>
              <Box flex={1}>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  sx={{
                    ...themeStyles.primaryText,
                    fontWeight: 600,
                  }}
                >
                  {batchData.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    ...themeStyles.secondaryText,
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                >
                  {batchNotes.currentChapter} • {batchData.instructor}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mt={1}
                  flexWrap="wrap"
                >
                  <Chip
                    label={`${batchData.progress} Complete`}
                    size="small"
                    sx={{
                      bgcolor: "#64ffda",
                      color: "#0f172a",
                      fontWeight: 600,
                      fontSize: { xs: "0.75rem", md: "0.85rem" },
                    }}
                  />
                  <Chip
                    label={batchData.level}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: "#64ffda",
                      color: "#64ffda",
                      fontWeight: 600,
                      fontSize: { xs: "0.75rem", md: "0.85rem" },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
              gap={2}
              mt={{ xs: 2, md: 0 }}
            >
              <Tooltip title="Toggle Theme">
                <IconButton
                  onClick={onToggleTheme}
                  sx={{
                    color: "#64ffda",
                    bgcolor: "rgba(100, 255, 218, 0.15)",
                    "&:hover": {
                      bgcolor: "rgba(100, 255, 218, 0.25)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>
              {isMobile && (
                <Tooltip title="Open Chat">
                  <IconButton
                    onClick={onOpenChat}
                    sx={{
                      color: "#64ffda",
                      bgcolor: "rgba(100, 255, 218, 0.15)",
                      "&:hover": {
                        bgcolor: "rgba(100, 255, 218, 0.25)",
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Badge badgeContent={chatMessagesCount} color="primary">
                      <ChatIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  }
);

BatchHeader.displayName = "BatchHeader";

export default BatchHeader;
