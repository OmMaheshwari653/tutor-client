import React, { memo } from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { Person as StudentIcon, SmartToy as AIIcon } from "@mui/icons-material";
import { formatMessageTime } from "../../utils/batch/chatUtils";

/**
 * Chat message component
 */
const ChatMessage = memo(({ message, isDarkMode, isMobile, themeStyles }) => {
  return (
    <Box sx={{ mb: { xs: 1.5, md: 2 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: message.sender === "student" ? "row-reverse" : "row",
          alignItems: "flex-start",
          gap: { xs: 1, md: 2 },
        }}
      >
        <Avatar
          sx={{
            bgcolor: message.sender === "student" ? "#64ffda" : "#22c55e",
            color: message.sender === "student" ? "#0f172a" : "white",
            width: { xs: 32, md: 40 },
            height: { xs: 32, md: 40 },
            fontSize: { xs: "1rem", md: "1.2rem" },
          }}
        >
          {message.sender === "student" ? <StudentIcon /> : <AIIcon />}
        </Avatar>
        <Card
          sx={{
            maxWidth: { xs: "85%", md: "75%" },
            bgcolor:
              message.sender === "student"
                ? isDarkMode
                  ? "rgba(100, 255, 218, 0.15)"
                  : "rgba(100, 255, 218, 0.1)"
                : isDarkMode
                ? "rgba(34, 197, 94, 0.15)"
                : "rgba(34, 197, 94, 0.1)",
            border: `1px solid ${
              message.sender === "student"
                ? isDarkMode
                  ? "rgba(100, 255, 218, 0.3)"
                  : "rgba(100, 255, 218, 0.2)"
                : isDarkMode
                ? "rgba(34, 197, 94, 0.3)"
                : "rgba(34, 197, 94, 0.2)"
            }`,
            borderRadius: 3,
            boxShadow: isDarkMode
              ? "0 4px 15px rgba(0, 0, 0, 0.3)"
              : "0 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 1.5, md: 2.5 },
              "&:last-child": { pb: { xs: 1.5, md: 2.5 } },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                ...themeStyles.primaryText,
                mb: 1,
                fontSize: { xs: "0.9rem", md: "1rem" },
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
              }}
            >
              {message.message}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                ...themeStyles.secondaryText,
                fontSize: { xs: "0.75rem", md: "0.8rem" },
              }}
            >
              {formatMessageTime(message.timestamp)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
