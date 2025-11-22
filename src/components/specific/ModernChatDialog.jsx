import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Zoom,
  Fade,
  Slide,
  Chip,
} from "@mui/material";
import {
  Send as SendIcon,
  Close as CloseIcon,
  SmartToy as AIIcon,
  Person as PersonIcon,
  AutoAwesome as SparkleIcon,
} from "@mui/icons-material";
import {
  closeChat,
  addMessage,
  setTyping,
  doubtSaved,
} from "../../redux/slices/chatSlice";
import { useSendChatMessageMutation } from "../../redux/api/chatApi";
import {
  aliceBlueColor,
  darkBlueColor,
  blackBoardColor,
  captionColor,
  glassBackground,
  glassBorder,
  chatInputBackground,
  userBubbleGradient,
  aiBubbleGradient,
} from "../constants/color";
import toast from "react-hot-toast";

const ModernChatDialog = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedChapter, messages, isTyping } = useSelector(
    (state) => state.chat
  );
  const [sendMessage, { isLoading }] = useSendChatMessageMutation();
  const [userMessage, setUserMessage] = React.useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeChat());
    setUserMessage("");
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim() || isLoading) return;

    const newUserMessage = {
      role: "user",
      content: userMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(newUserMessage));
    setUserMessage("");
    dispatch(setTyping(true));

    try {
      const payload = {
        message: newUserMessage.content,
        chapterTitle: selectedChapter.title,
        chapterNotes: selectedChapter.ai_generated_notes,
        chapterId: selectedChapter.id,
        conversationHistory: messages.slice(-6),
      };

      const response = await sendMessage(payload).unwrap();

      if (response.success) {
        const aiMessage = {
          role: "assistant",
          content: response.response,
          timestamp: response.timestamp,
        };
        dispatch(addMessage(aiMessage));

        // Notify that a doubt was saved (trigger refresh in parent)
        if (selectedChapter?.id) {
          dispatch(doubtSaved(selectedChapter.id));
        }
      }
    } catch (err) {
      toast.error(err?.data?.error || "Failed to send message");
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again. 😔",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(errorMessage));
    } finally {
      dispatch(setTyping(false));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Zoom}
      PaperProps={{
        sx: {
          background:
            "linear-gradient(135deg, #2d1b4e 0%, #1a1a3e 50%, #0f2847 100%)",
          backgroundImage: "none",
          border: `2px solid ${aliceBlueColor}60`,
          borderRadius: 4,
          maxHeight: "85vh",
          overflow: "hidden",
          boxShadow: `0 20px 60px rgba(102, 126, 234, 0.4), 0 0 40px ${aliceBlueColor}30`,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #4a3473 0%, #2d1b4e 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: `2px solid ${aliceBlueColor}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2.5,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${aliceBlueColor}, transparent)`,
            animation: "shimmer 2s infinite",
          },
          "@keyframes shimmer": {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(100%)" },
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              bgcolor: `${aliceBlueColor}20`,
              border: `2px solid ${aliceBlueColor}`,
              boxShadow: `0 0 20px ${aliceBlueColor}40`,
            }}
          >
            <AIIcon sx={{ color: aliceBlueColor, fontSize: 28 }} />
          </Avatar>
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                AI Tutor
                <SparkleIcon
                  sx={{
                    color: aliceBlueColor,
                    fontSize: 20,
                    animation: "pulse 2s infinite",
                  }}
                />
              </Typography>
              <Chip
                label="Online"
                size="small"
                sx={{
                  bgcolor: "#4caf50",
                  color: "white",
                  fontWeight: "bold",
                  height: 20,
                  fontSize: "0.7rem",
                  animation: "pulse 2s infinite",
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: captionColor,
                display: "block",
                maxWidth: 400,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              📚 {selectedChapter?.title}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: aliceBlueColor,
            transition: "all 0.3s",
            "&:hover": {
              transform: "rotate(90deg)",
              bgcolor: `${aliceBlueColor}20`,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Messages */}
      <DialogContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minHeight: 450,
          maxHeight: "calc(85vh - 200px)",
          overflowY: "auto",
          background: "linear-gradient(180deg, #1a1a3e 0%, #0f2847 100%)",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: `${aliceBlueColor}40`,
            borderRadius: "10px",
            "&:hover": {
              background: `${aliceBlueColor}60`,
            },
          },
        }}
      >
        {messages.map((msg, index) => (
          <Fade key={index} in timeout={500}>
            <Box
              sx={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-start",
                gap: 1.5,
                animation: "slideIn 0.3s ease-out",
                "@keyframes slideIn": {
                  from: {
                    opacity: 0,
                    transform:
                      msg.role === "user"
                        ? "translateX(20px)"
                        : "translateX(-20px)",
                  },
                  to: { opacity: 1, transform: "translateX(0)" },
                },
              }}
            >
              {msg.role === "assistant" && (
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: `${aliceBlueColor}20`,
                    border: `2px solid ${aliceBlueColor}40`,
                    boxShadow: `0 0 15px ${aliceBlueColor}30`,
                  }}
                >
                  <AIIcon sx={{ color: aliceBlueColor, fontSize: 20 }} />
                </Avatar>
              )}

              <Paper
                elevation={8}
                sx={{
                  p: 2,
                  maxWidth: "75%",
                  background:
                    msg.role === "user"
                      ? userBubbleGradient
                      : `linear-gradient(135deg, ${glassBackground} 0%, rgba(255, 255, 255, 0.02) 100%)`,
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    msg.role === "user"
                      ? "rgba(102, 126, 234, 0.5)"
                      : glassBorder
                  }`,
                  borderRadius:
                    msg.role === "user"
                      ? "20px 20px 4px 20px"
                      : "20px 20px 20px 4px",
                  boxShadow:
                    msg.role === "user"
                      ? "0 8px 32px rgba(102, 126, 234, 0.3)"
                      : "0 8px 32px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow:
                      msg.role === "user"
                        ? "0 12px 40px rgba(102, 126, 234, 0.4)"
                        : "0 12px 40px rgba(0, 0, 0, 0.3)",
                  },
                  "&::before": msg.role === "assistant" && {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${aliceBlueColor}40, transparent)`,
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontWeight: msg.role === "user" ? 500 : 400,
                  }}
                >
                  {msg.content}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color:
                      msg.role === "user"
                        ? "rgba(255,255,255,0.8)"
                        : captionColor,
                    mt: 1,
                    display: "block",
                    fontSize: "0.7rem",
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Paper>

              {msg.role === "user" && (
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: userBubbleGradient,
                    border: "2px solid rgba(102, 126, 234, 0.5)",
                    boxShadow: "0 0 15px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <PersonIcon sx={{ color: "white", fontSize: 20 }} />
                </Avatar>
              )}
            </Box>
          </Fade>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <Fade in timeout={300}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: `${aliceBlueColor}20`,
                  border: `2px solid ${aliceBlueColor}40`,
                }}
              >
                <AIIcon sx={{ color: aliceBlueColor, fontSize: 20 }} />
              </Avatar>
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  bgcolor: glassBackground,
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${glassBorder}`,
                  borderRadius: "20px 20px 20px 4px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CircularProgress size={16} sx={{ color: aliceBlueColor }} />
                <Typography variant="body2" sx={{ color: captionColor }}>
                  AI is thinking...
                </Typography>
              </Paper>
            </Box>
          </Fade>
        )}

        <div ref={messagesEndRef} />
      </DialogContent>

      {/* Input Area */}
      <DialogActions
        sx={{
          p: 2.5,
          borderTop: `2px solid ${aliceBlueColor}30`,
          background: "linear-gradient(135deg, #2d1b4e 0%, #1a1a3e 100%)",
          backdropFilter: "blur(20px)",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={3}
          placeholder="Type your question here... (Press Enter to send)"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          inputRef={inputRef}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 3,
              transition: "all 0.3s",
              "& fieldset": {
                borderColor: `${aliceBlueColor}30`,
                borderWidth: "2px",
              },
              "&:hover fieldset": {
                borderColor: `${aliceBlueColor}50`,
              },
              "&.Mui-focused fieldset": {
                borderColor: aliceBlueColor,
                boxShadow: `0 0 20px ${aliceBlueColor}30`,
              },
              "&.Mui-focused": {
                bgcolor: "rgba(255, 255, 255, 0.08)",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: captionColor,
              opacity: 1,
            },
          }}
        />
        <IconButton
          onClick={handleSendMessage}
          disabled={!userMessage.trim() || isLoading}
          sx={{
            background: userBubbleGradient,
            color: "white",
            width: 52,
            height: 52,
            boxShadow: `0 4px 20px rgba(102, 126, 234, 0.4)`,
            transition: "all 0.3s",
            "&:hover": {
              background: userBubbleGradient,
              transform: "scale(1.1) rotate(15deg)",
              boxShadow: `0 6px 30px rgba(102, 126, 234, 0.6)`,
            },
            "&:disabled": {
              background: "rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.3)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </DialogActions>

      {/* Pulse Animation for Online Status */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
    </Dialog>
  );
};

export default ModernChatDialog;
