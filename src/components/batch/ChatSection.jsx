import React, { memo, useEffect, useRef } from "react";
import { Box, Paper } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import { getScrollbarStyles } from "../../utils/batch/uiUtils";

/**
 * Complete chat section component
 */
const ChatSection = memo(
  ({
    chatMessages,
    newMessage,
    setNewMessage,
    onSendMessage,
    isDarkMode,
    isMobile,
    themeStyles,
    onClose,
  }) => {
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [chatMessages]);

    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minHeight: 0, // Important for flex containers
        }}
      >
        {/* Chat Header */}
        <Box sx={{ flexShrink: 0 }}>
          <ChatHeader
            isDarkMode={isDarkMode}
            isMobile={isMobile}
            themeStyles={themeStyles}
            onClose={onClose}
          />
        </Box>

        {/* Chat Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            p: { xs: 1, md: 2 },
            minHeight: 0, // Critical for scrolling in flex child
            ...getScrollbarStyles(isDarkMode),
          }}
        >
          {chatMessages && chatMessages.length > 0 ? (
            <>
              {chatMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isDarkMode={isDarkMode}
                  isMobile={isMobile}
                  themeStyles={themeStyles}
                />
              ))}
              {/* Invisible div to scroll to */}
              <div ref={messagesEndRef} />
            </>
          ) : (
            // Empty state when no messages
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                color: isDarkMode ? "#94a3b8" : "#64748b",
              }}
            >
              <Box>
                <Box sx={{ fontSize: "2rem", mb: 1 }}>🤖</Box>
                <Box sx={{ fontWeight: 600, mb: 0.5 }}>AI Teacher Ready!</Box>
                <Box sx={{ fontSize: "0.9rem", opacity: 0.8 }}>
                  Start conversation or click explain buttons
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* Message Input */}
        <Box sx={{ flexShrink: 0 }}>
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSendMessage={onSendMessage}
            isDarkMode={isDarkMode}
            isMobile={isMobile}
            themeStyles={themeStyles}
          />
        </Box>
      </Box>
    );
  }
);

ChatSection.displayName = "ChatSection";

export default ChatSection;
