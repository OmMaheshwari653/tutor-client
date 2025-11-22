import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Box,
  Stack,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Paper,
  Chip,
  Slider,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  AutoAwesome as AIIcon,
  VideoLibrary as VideoIcon,
  Schedule as ScheduleIcon,
  Language as LanguageIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  aliceBlueColor,
  darkBlueColor,
  blackBoardColor,
  captionColor,
} from "../constants/color";
import { API_ENDPOINTS, apiCall } from "../../utils/api";

// Modern AI-themed styles
const styles = {
  dialog: {
    "& .MuiDialog-paper": {
      background: blackBoardColor,
      color: "white",
      borderRadius: 3,
      border: `1px solid ${aliceBlueColor}30`,
      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5)`,
      maxWidth: "600px",
    },
  },
  dialogTitle: {
    background: `linear-gradient(135deg, ${aliceBlueColor}20 0%, rgba(255, 255, 255, 0.05) 100%)`,
    backdropFilter: "blur(20px)",
    border: `1px solid ${aliceBlueColor}40`,
    borderRadius: 2,
    mb: 3,
    p: 2.5,
    boxShadow: `0 4px 15px ${aliceBlueColor}20`,
  },
  formContainer: {
    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`,
    backdropFilter: "blur(15px)",
    border: `1px solid ${aliceBlueColor}20`,
    borderRadius: 2,
    p: 3,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": {
        borderColor: `${aliceBlueColor}50`,
      },
      "&:hover fieldset": {
        borderColor: `${aliceBlueColor}70`,
      },
      "&.Mui-focused fieldset": {
        borderColor: aliceBlueColor,
      },
    },
    "& .MuiInputLabel-root": {
      color: captionColor,
      "&.Mui-focused": {
        color: aliceBlueColor,
      },
    },
    "& .MuiFormHelperText-root": {
      color: "#ff6b6b",
    },
  },
  submitButton: {
    bgcolor: aliceBlueColor,
    color: darkBlueColor,
    fontWeight: "bold",
    py: 1.5,
    borderRadius: 2,
    boxShadow: `0 4px 15px ${aliceBlueColor}40`,
    "&:hover": {
      bgcolor: "#4fd3b8",
      boxShadow: `0 6px 20px ${aliceBlueColor}60`,
      transform: "translateY(-2px)",
    },
    "&:disabled": {
      bgcolor: `${aliceBlueColor}30`,
      color: `${darkBlueColor}50`,
    },
    transition: "all 0.3s ease",
  },
  closeButton: {
    color: aliceBlueColor,
    "&:hover": {
      bgcolor: `${aliceBlueColor}20`,
    },
  },
  featureChip: {
    bgcolor: `${aliceBlueColor}20`,
    color: aliceBlueColor,
    fontWeight: "bold",
    border: `1px solid ${aliceBlueColor}40`,
  },
};

// Course Generation Configuration
const DIFFICULTY_LEVELS = [
  {
    value: "Beginner",
    label: "Beginner",
    desc: "Basic concepts and fundamentals",
  },
  { value: "Intermediate", label: "Intermediate", desc: "Moderate complexity" },
  { value: "Advanced", label: "Advanced", desc: "Expert-level content" },
];

const LANGUAGES = [
  { value: "English", label: "English", flag: "🇬🇧" },
  { value: "Hindi", label: "Hindi", flag: "🇮🇳" },
  { value: "Hinglish", label: "Hinglish", flag: "🌐" },
];

const CATEGORIES = [
  "Programming",
  "Mathematics",
  "Science",
  "Business",
  "Design",
  "Language",
  "Other",
];

const NewBatch = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form state - simplified for AI course generation
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "Beginner",
    duration: 4,
    includeVideos: true, // Changed from enableVideo to match backend
    language: "English",
    category: "Programming",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.topic.trim()) {
      newErrors.topic = "Topic is required";
    } else if (formData.topic.trim().length < 3) {
      newErrors.topic = "Topic must be at least 3 characters";
    }

    if (formData.duration < 1 || formData.duration > 52) {
      newErrors.duration = "Duration must be between 1-52 weeks";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Generating your AI-powered course...");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first", { id: loadingToast });
        navigate("/login");
        return;
      }

      const data = await apiCall(API_ENDPOINTS.COURSE_GENERATE, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data.success) {
        toast.success(`Course "${data.course.title}" is being generated! 🎉`, {
          id: loadingToast,
          duration: 4000,
        });

        // Reset form
        setFormData({
          topic: "",
          difficulty: "Beginner",
          duration: 4,
          includeVideos: true,
          language: "English",
          category: "Programming",
          description: "",
        });

        // Close dialog
        onClose();

        // Navigate to courses page
        setTimeout(() => {
          navigate("/batch");
        }, 1000);
      }
    } catch (err) {
      toast.error(err.message || "Failed to generate course", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={styles.dialog}
    >
      <DialogTitle>
        <Paper elevation={0} sx={styles.dialogTitle}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <AIIcon sx={{ color: aliceBlueColor, fontSize: 32 }} />
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "white" }}
                >
                  Generate AI Course
                </Typography>
                <Typography variant="caption" sx={{ color: captionColor }}>
                  Powered by Gemini AI & YouTube
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={handleClose}
              sx={styles.closeButton}
              disabled={loading}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>
      </DialogTitle>

      <DialogContent>
        <Paper elevation={0} sx={styles.formContainer}>
          <Stack spacing={3}>
            {/* AI Features Banner */}
            <Alert
              severity="info"
              icon={<AIIcon />}
              sx={{
                bgcolor: `${aliceBlueColor}10`,
                color: "white",
                border: `1px solid ${aliceBlueColor}30`,
                "& .MuiAlert-icon": {
                  color: aliceBlueColor,
                },
              }}
            >
              AI will generate chapters, notes, diagrams, and find relevant
              videos!
            </Alert>

            {/* Topic Input */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                mb={1}
                sx={{ color: aliceBlueColor }}
              >
                Course Topic *
              </Typography>
              <TextField
                placeholder="e.g., React JS Fundamentals, Python for Beginners, Data Structures"
                variant="outlined"
                fullWidth
                value={formData.topic}
                onChange={(e) => handleChange("topic", e.target.value)}
                error={Boolean(errors.topic)}
                helperText={errors.topic || "What do you want to learn?"}
                disabled={loading}
                sx={styles.textField}
              />
            </Box>

            {/* Difficulty Level */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                mb={1}
                sx={{ color: aliceBlueColor }}
              >
                Difficulty Level
              </Typography>
              <TextField
                select
                fullWidth
                value={formData.difficulty}
                onChange={(e) => handleChange("difficulty", e.target.value)}
                disabled={loading}
                sx={styles.textField}
              >
                {DIFFICULTY_LEVELS.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    <Box>
                      <Typography fontWeight="bold">{level.label}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {level.desc}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Duration Slider */}
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ color: aliceBlueColor }}
                >
                  <ScheduleIcon
                    sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
                  />
                  Course Duration
                </Typography>
                <Chip
                  label={`${formData.duration} ${
                    formData.duration === 1 ? "week" : "weeks"
                  }`}
                  size="small"
                  sx={styles.featureChip}
                />
              </Box>
              <Slider
                value={formData.duration}
                onChange={(e, value) => handleChange("duration", value)}
                min={1}
                max={12}
                marks={[
                  { value: 1, label: "1w" },
                  { value: 4, label: "4w" },
                  { value: 8, label: "8w" },
                  { value: 12, label: "12w" },
                ]}
                disabled={loading}
                sx={{
                  color: aliceBlueColor,
                  "& .MuiSlider-markLabel": {
                    color: captionColor,
                  },
                  "& .MuiSlider-mark": {
                    bgcolor: `${aliceBlueColor}50`,
                  },
                }}
              />
              <Typography variant="caption" sx={{ color: captionColor }}>
                AI will generate {formData.duration * 2}-{formData.duration * 3}{" "}
                chapters
              </Typography>
            </Box>

            {/* Enable Video Toggle */}
            <Box>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: formData.includeVideos
                    ? `${aliceBlueColor}15`
                    : "rgba(255, 255, 255, 0.05)",
                  border: `1px solid ${
                    formData.includeVideos
                      ? aliceBlueColor
                      : "rgba(255, 255, 255, 0.1)"
                  }40`,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.includeVideos}
                      onChange={(e) =>
                        handleChange("includeVideos", e.target.checked)
                      }
                      disabled={loading}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: aliceBlueColor,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            bgcolor: aliceBlueColor,
                          },
                      }}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <VideoIcon sx={{ color: aliceBlueColor }} />
                      <Box>
                        <Typography fontWeight="bold" sx={{ color: "white" }}>
                          Include YouTube Videos
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: captionColor }}
                        >
                          AI will find relevant educational videos for each
                          chapter
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </Paper>
            </Box>

            {/* Language Selection */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                mb={1}
                sx={{ color: aliceBlueColor }}
              >
                <LanguageIcon
                  sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
                />
                Content Language
              </Typography>
              <TextField
                select
                fullWidth
                value={formData.language}
                onChange={(e) => handleChange("language", e.target.value)}
                disabled={loading}
                sx={styles.textField}
              >
                {LANGUAGES.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <span>{lang.flag}</span>
                      <Typography>{lang.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Category Selection */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                mb={1}
                sx={{ color: aliceBlueColor }}
              >
                <CategoryIcon
                  sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
                />
                Category
              </Typography>
              <TextField
                select
                fullWidth
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                disabled={loading}
                sx={styles.textField}
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Description (Optional) */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                mb={1}
                sx={{ color: aliceBlueColor }}
              >
                Additional Details (Optional)
              </Typography>
              <TextField
                placeholder="Any specific topics or focus areas you want to cover..."
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                disabled={loading}
                sx={styles.textField}
              />
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              startIcon={<AIIcon />}
              fullWidth
              disabled={loading}
              sx={styles.submitButton}
            >
              {loading ? "Generating Course..." : "Generate AI Course"}
            </Button>

            {/* Info Text */}
            <Typography
              variant="caption"
              textAlign="center"
              sx={{ color: captionColor }}
            >
              🤖 Course generation takes 30-60 seconds. You'll be notified when
              ready!
            </Typography>
          </Stack>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default NewBatch;
