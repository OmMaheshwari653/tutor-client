import React, { memo } from "react";
import { Box, TextField, IconButton, Chip } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { getQuickSuggestions } from "../../utils/batch/chatUtils";
import { getThemedButtonStyles } from "../../utils/batch/uiUtils";

/**
 * Message input component for chat
 */
const MessageInput = memo(
  ({
    newMessage,
    setNewMessage,
    onSendMessage,
    isDarkMode,
    isMobile,
    themeStyles,
  }) => {
    const suggestions = getQuickSuggestions();

    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSendMessage();
      }
    };

    return (
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          borderTop: `1px solid ${
            isDarkMode ? "rgba(100, 255, 218, 0.2)" : "rgba(0, 0, 0, 0.1)"
          }`,
          background: isDarkMode
            ? "rgba(15, 23, 42, 0.6)"
            : "rgba(248, 250, 252, 0.8)",
        }}
      >
        <Box display="flex" gap={{ xs: 1, md: 2 }} alignItems="flex-end">
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Apna doubt yahan type karo... (Hindi/English/Hinglish)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              ...themeStyles.messageInput,
              "& .MuiInputBase-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
              },
            }}
            size={isMobile ? "small" : "medium"}
          />
          <IconButton
            onClick={onSendMessage}
            disabled={!newMessage.trim()}
            sx={{
              ...getThemedButtonStyles(isDarkMode, "#64ffda"),
              p: { xs: 1, md: 1.5 },
            }}
          >
            <SendIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>

        {/* Quick Suggestions */}
        <Box mt={2} display="flex" gap={1} flexWrap="wrap">
          {suggestions.map((suggestion, index) => (
            <Chip
              key={index}
              label={suggestion}
              onClick={() => setNewMessage(suggestion)}
              sx={{
                bgcolor: isDarkMode
                  ? "rgba(100, 255, 218, 0.1)"
                  : "rgba(100, 255, 218, 0.05)",
                color: "#64ffda",
                border: `1px solid rgba(100, 255, 218, 0.3)`,
                fontSize: { xs: "0.75rem", md: "0.8rem" },
                height: { xs: 28, md: 32 },
                "&:hover": {
                  bgcolor: isDarkMode
                    ? "rgba(100, 255, 218, 0.2)"
                    : "rgba(100, 255, 218, 0.1)",
                  transform: "scale(1.02)",
                },
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      </Box>
    );
  }
);

MessageInput.displayName = "MessageInput";

export default MessageInput;
