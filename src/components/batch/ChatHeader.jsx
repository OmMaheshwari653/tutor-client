import React, { memo } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { Chat as ChatIcon, Close as CloseIcon } from "@mui/icons-material";

/**
 * Chat header component
 */
const ChatHeader = memo(({ isDarkMode, isMobile, themeStyles, onClose }) => {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        borderBottom: `1px solid ${
          isDarkMode ? "rgba(100, 255, 218, 0.2)" : "rgba(0, 0, 0, 0.1)"
        }`,
        background: isDarkMode
          ? "rgba(15, 23, 42, 0.6)"
          : "rgba(248, 250, 252, 0.8)",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          sx={{
            bgcolor: "#22c55e",
            color: "white",
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
          }}
        >
          <ChatIcon />
        </Avatar>
        <Box flex={1}>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              ...themeStyles.primaryText,
              fontWeight: 600,
            }}
          >
            AI Teacher Chat
          </Typography>
          <Typography
            variant="body2"
            sx={{
              ...themeStyles.secondaryText,
              fontSize: { xs: "0.85rem", md: "0.95rem" },
            }}
          >
            Ask doubts • Get explanations • Practice together
          </Typography>
        </Box>
        {isMobile && onClose && (
          <IconButton onClick={onClose} sx={{ color: "#64ffda" }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
});

ChatHeader.displayName = "ChatHeader";

export default ChatHeader;
