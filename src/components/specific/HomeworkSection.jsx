import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  LinearProgress,
  Alert,
  Collapse,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  ButtonGroup,
} from "@mui/material";
import {
  Assignment,
  ExpandMore,
  CheckCircle,
  HelpOutline,
  Send,
  EmojiEvents,
  TrendingUp,
  CameraAlt,
  Image as ImageIcon,
  Close,
  Edit,
} from "@mui/icons-material";
import { apiCall, API_ENDPOINTS } from "../../utils/api";

const HomeworkSection = ({ chapterId, onProgressUpdate }) => {
  const [problems, setProblems] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [solutions, setSolutions] = useState({});
  const [solutionImages, setSolutionImages] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [feedback, setFeedback] = useState({});
  const [hints, setHints] = useState({});
  const [shownHints, setShownHints] = useState({});
  const fileInputRefs = useRef({});

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(`homework_${chapterId}`);
    if (savedState) {
      try {
        const {
          solutions: savedSolutions,
          feedback: savedFeedback,
          hints: savedHints,
          shownHints: savedShownHints,
        } = JSON.parse(savedState);
        setSolutions(savedSolutions || {});
        setFeedback(savedFeedback || {});
        setHints(savedHints || {});
        setShownHints(savedShownHints || {});
      } catch (e) {
        // Failed to load homework state
      }
    }
  }, [chapterId]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(solutions).length > 0 || Object.keys(feedback).length > 0) {
      localStorage.setItem(
        `homework_${chapterId}`,
        JSON.stringify({ solutions, feedback, hints, shownHints })
      );
    }
  }, [solutions, feedback, hints, shownHints, chapterId]);

  useEffect(() => {
    fetchHomework();
  }, [chapterId]);

  const fetchHomework = async () => {
    try {
      setLoading(true);
      const data = await apiCall(API_ENDPOINTS.HOMEWORK(chapterId), {
        method: "GET",
      });

      if (data.success) {
        setProblems(data.problems);
        setProgress(data.progress);

        // Update parent component with progress
        if (data.progress && onProgressUpdate) {
          onProgressUpdate(chapterId, {
            totalProblems: data.progress.total_problems,
            solvedProblems: data.progress.solved_problems,
            completionPercentage: data.progress.completion_percentage,
            isCompleted: data.progress.is_completed,
          });
        }

        // If no problems, generate them
        if (data.problems.length === 0) {
          await generateHomework();
        }
      }
    } catch (error) {
      // Failed to fetch homework
    } finally {
      setLoading(false);
    }
  };

  const generateHomework = async () => {
    try {
      setGenerating(true);

      const data = await apiCall(API_ENDPOINTS.GENERATE_HOMEWORK(chapterId), {
        method: "POST",
      });

      if (data.success) {
        // Refresh to fetch the newly generated problems
        await fetchHomework();
      }
    } catch (error) {
      // Failed to generate homework
    } finally {
      setGenerating(false);
    }
  };

  const handleGetHint = async (problemId) => {
    // First show hints from problem data if available
    const problem = problems.find((p) => p.id === problemId);
    if (problem?.hints && Array.isArray(problem.hints)) {
      const currentHintIndex = shownHints[problemId] || 0;

      if (currentHintIndex < problem.hints.length) {
        setShownHints({
          ...shownHints,
          [problemId]: currentHintIndex + 1,
        });

        const currentHints = problem.hints.slice(0, currentHintIndex + 1);
        setHints({
          ...hints,
          [problemId]: currentHints,
        });
        return;
      }
    }

    // If all hints shown or no hints, generate new one from AI
    try {
      setSubmitting({ ...submitting, [problemId]: true });

      const data = await apiCall(API_ENDPOINTS.HOMEWORK(chapterId), {
        method: "POST",
        body: JSON.stringify({
          problemId,
          solution: "hint request",
          requestHint: true,
        }),
      });

      if (data.success) {
        const existingHints = hints[problemId] || [];
        setHints({
          ...hints,
          [problemId]: [...existingHints, data.hint],
        });
      }
    } catch (error) {
      // Failed to get hint
    } finally {
      setSubmitting({ ...submitting, [problemId]: false });
    }
  };

  const handleImageUpload = (problemId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSolutionImages({
        ...solutionImages,
        [problemId]: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (problemId) => {
    setSolutionImages({
      ...solutionImages,
      [problemId]: null,
    });
  };

  const handleSubmit = async (problemId) => {
    const solution = solutions[problemId];
    const solutionImage = solutionImages[problemId];

    if (!solution?.trim() && !solutionImage) {
      alert("Please provide a solution (text or image)");
      return;
    }

    try {
      setSubmitting({ ...submitting, [problemId]: true });
      setFeedback({ ...feedback, [problemId]: null });

      const data = await apiCall(API_ENDPOINTS.HOMEWORK(chapterId), {
        method: "POST",
        body: JSON.stringify({
          problemId,
          solution: solution || "",
          solutionImage: solutionImage || null,
        }),
      });

      if (data.success) {
        setFeedback({
          ...feedback,
          [problemId]: {
            isCorrect: data.isCorrect,
            feedback: data.feedback,
            score: data.score,
            suggestions: data.suggestions,
            attempts: data.attempts,
          },
        });

        // Refresh problems to update solved status (without await to prevent scroll)
        if (data.isCorrect) {
          fetchHomework();
        }
      }
    } catch (error) {
      setFeedback({
        ...feedback,
        [problemId]: {
          isCorrect: false,
          feedback: `Failed to submit solution: ${
            error.message || "Please try again."
          }`,
        },
      });
    } finally {
      setSubmitting({ ...submitting, [problemId]: false });
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "#4caf50",
      medium: "#ff9800",
      hard: "#f44336",
    };
    return colors[difficulty?.toLowerCase()] || colors.medium;
  };

  if (loading || generating) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
          borderRadius: 3,
          mb: 3,
        }}
      >
        <CircularProgress sx={{ color: "#667eea" }} />
        {generating && (
          <Typography
            variant="body2"
            sx={{ mt: 2, color: "#667eea", fontWeight: "bold" }}
          >
            🤖 AI is generating personalized homework for this chapter...
          </Typography>
        )}
        {loading && !generating && (
          <Typography variant="body2" sx={{ mt: 2, color: "#667eea" }}>
            Loading problems...
          </Typography>
        )}
      </Box>
    );
  }

  if (problems.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header with Progress - IMPROVED */}
      <Paper
        elevation={4}
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          mb: 3,
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent)",
            pointerEvents: "none",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Assignment sx={{ fontSize: 36, mr: 2 }} />
            <Box flex={1}>
              <Typography variant="h5" fontWeight="bold">
                📚 Practice & Homework
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                Solve problems to master this chapter
              </Typography>
            </Box>
          </Box>

          {progress && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  Progress: {progress.solved_problems || 0} /{" "}
                  {progress.total_problems} solved
                </Typography>
                <Chip
                  label={`${progress.completion_percentage || 0}%`}
                  sx={{
                    background: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                />
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress.completion_percentage || 0}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  "& .MuiLinearProgress-bar": {
                    background:
                      "linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)",
                    borderRadius: 5,
                  },
                }}
              />
              {progress.is_completed && (
                <Box
                  sx={{ display: "flex", alignItems: "center", mt: 2, gap: 1 }}
                >
                  <EmojiEvents sx={{ fontSize: 28, color: "#ffd700" }} />
                  <Typography variant="h6" fontWeight="bold">
                    Chapter Mastered! All problems solved! 🎉
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Paper>

      {/* Problems List */}
      {problems.map((problem) => (
        <Accordion
          key={problem.id}
          expanded={expandedProblem === problem.id}
          onChange={() =>
            setExpandedProblem(
              expandedProblem === problem.id ? null : problem.id
            )
          }
          sx={{
            mb: 2,
            borderLeft: problem.is_solved
              ? "4px solid #4caf50"
              : "4px solid #ccc",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 2,
              }}
            >
              {problem.is_solved && (
                <CheckCircle sx={{ color: "#4caf50", fontSize: 24 }} />
              )}
              <Typography variant="h6" sx={{ flex: 1 }}>
                {problem.problem_number}. {problem.title}
              </Typography>
              <Chip
                label={problem.difficulty || "Medium"}
                size="small"
                sx={{
                  backgroundColor: getDifficultyColor(problem.difficulty),
                  color: "white",
                  fontWeight: "bold",
                }}
              />
              {problem.user_attempts > 0 && !problem.is_solved && (
                <Chip
                  label={`${problem.user_attempts} attempts`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            {/* Problem Description */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-wrap", mb: 2 }}
              >
                {problem.description}
              </Typography>
            </Box>

            {/* Hint Section */}
            {hints[problem.id] && hints[problem.id].length > 0 && (
              <Box sx={{ mb: 2 }}>
                {hints[problem.id].map((hint, index) => (
                  <Alert
                    key={index}
                    severity="info"
                    sx={{ mb: 1 }}
                    icon={<HelpOutline />}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      gutterBottom
                    >
                      💡 Hint {index + 1}:
                    </Typography>
                    <Typography variant="body2">{hint}</Typography>
                  </Alert>
                ))}
              </Box>
            )}

            {/* Solution Input */}
            {!problem.is_solved && (
              <Box sx={{ mb: 2 }}>
                {/* Image Upload Preview */}
                {solutionImages[problem.id] && (
                  <Box sx={{ mb: 2, position: "relative" }}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        background:
                          "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                        position: "relative",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => removeImage(problem.id)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "rgba(244, 67, 54, 0.9)",
                          color: "white",
                          "&:hover": { bgcolor: "rgba(244, 67, 54, 1)" },
                        }}
                      >
                        <Close />
                      </IconButton>
                      <img
                        src={solutionImages[problem.id]}
                        alt="Solution"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "400px",
                          borderRadius: "8px",
                          display: "block",
                        }}
                      />
                    </Paper>
                  </Box>
                )}

                {/* Text Solution Input */}
                {!solutionImages[problem.id] && (
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Write your solution here or upload an image..."
                    value={solutions[problem.id] || ""}
                    onChange={(e) =>
                      setSolutions({
                        ...solutions,
                        [problem.id]: e.target.value,
                      })
                    }
                    disabled={submitting[problem.id]}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        fontFamily: "monospace",
                      },
                    }}
                  />
                )}

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    startIcon={<Send />}
                    onClick={() => handleSubmit(problem.id)}
                    disabled={
                      (!solutions[problem.id]?.trim() &&
                        !solutionImages[problem.id]) ||
                      submitting[problem.id]
                    }
                    sx={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5568d3 0%, #6a4093 100%)",
                      },
                    }}
                  >
                    {submitting[problem.id] ? "Checking..." : "Submit Solution"}
                  </Button>

                  {/* Image Upload Button */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={(el) => (fileInputRefs.current[problem.id] = el)}
                    onChange={(e) => handleImageUpload(problem.id, e)}
                    style={{ display: "none" }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={
                      solutionImages[problem.id] ? <Edit /> : <ImageIcon />
                    }
                    onClick={() => fileInputRefs.current[problem.id]?.click()}
                    disabled={submitting[problem.id]}
                    sx={{
                      borderColor: "#4caf50",
                      color: "#4caf50",
                      "&:hover": {
                        borderColor: "#45a049",
                        backgroundColor: "rgba(76, 175, 80, 0.1)",
                      },
                    }}
                  >
                    {solutionImages[problem.id]
                      ? "Change Image"
                      : "Upload Image"}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<HelpOutline />}
                    onClick={() => handleGetHint(problem.id)}
                    disabled={submitting[problem.id]}
                    sx={{
                      borderColor: "#667eea",
                      color: "#667eea",
                      "&:hover": {
                        borderColor: "#5568d3",
                        backgroundColor: "rgba(102, 126, 234, 0.1)",
                      },
                    }}
                  >
                    {hints[problem.id] && hints[problem.id].length > 0
                      ? `Show Next Hint (${hints[problem.id].length})`
                      : "Get Help"}
                  </Button>
                </Box>
              </Box>
            )}

            {/* Feedback */}
            <Collapse in={!!feedback[problem.id]}>
              {feedback[problem.id] && (
                <Alert
                  severity={
                    feedback[problem.id].isCorrect ? "success" : "warning"
                  }
                  sx={{ mt: 2 }}
                  icon={
                    feedback[problem.id].isCorrect ? (
                      <CheckCircle />
                    ) : (
                      <TrendingUp />
                    )
                  }
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {feedback[problem.id].isCorrect
                      ? "✅ Correct!"
                      : "Not quite right..."}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {feedback[problem.id].feedback}
                  </Typography>
                  {feedback[problem.id].suggestions && (
                    <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                      💡 {feedback[problem.id].suggestions}
                    </Typography>
                  )}
                  {feedback[problem.id].attempts && (
                    <Typography
                      variant="caption"
                      sx={{ mt: 1, display: "block" }}
                    >
                      Attempt #{feedback[problem.id].attempts}
                    </Typography>
                  )}
                </Alert>
              )}
            </Collapse>

            {/* Solved State */}
            {problem.is_solved && (
              <Alert severity="success" icon={<CheckCircle />}>
                <Typography variant="body2">
                  ✨ You've successfully solved this problem!
                </Typography>
              </Alert>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default HomeworkSection;
