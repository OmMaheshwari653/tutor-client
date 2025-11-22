import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Paper,
  Grid,
  Tab,
  Tabs,
  Badge,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Divider,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import {
  MenuBook as NotesIcon,
  Chat as ChatIcon,
  ExpandMore as ExpandMoreIcon,
  PlayCircleOutline as VideoIcon,
  Description as TopicIcon,
  CheckCircle as CheckIcon,
  Schedule as TimeIcon,
  School as CourseIcon,
  QuestionAnswer as DoubtIcon,
} from "@mui/icons-material";
import AppLayout from "../components/layouts/AppLayout";
import ModernChatDialog from "../components/specific/ModernChatDialog";
import HomeworkSection from "../components/specific/HomeworkSection";
import toast from "react-hot-toast";
import {
  aliceBlueColor,
  darkBlueColor,
  blackBoardColor,
  captionColor,
} from "../components/constants/color";
import { API_ENDPOINTS, apiCall } from "../utils/api";
import { openChat } from "../redux/slices/chatSlice";

const Batch = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Listen for doubt saves
  const lastSavedDoubtChapterId = useSelector(
    (state) => state.chat.lastSavedDoubtChapterId
  );

  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [courseData, setCourseData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [chapterDoubts, setChapterDoubts] = useState({});
  const [chapterProgress, setChapterProgress] = useState({}); // Track homework progress

  // Fetch course details on mount
  useEffect(() => {
    fetchCourseDetails();
  }, [batchId]);

  // Refresh doubts when a new doubt is saved
  useEffect(() => {
    if (lastSavedDoubtChapterId) {
      // Force refresh by clearing cache and refetching
      fetchChapterDoubts(lastSavedDoubtChapterId, true);
    }
  }, [lastSavedDoubtChapterId]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const data = await apiCall(API_ENDPOINTS.COURSE_DETAIL(batchId));

      if (data.success && data.course) {
        setCourseData(data.course);

        // Initialize chapter progress from course data
        const initialProgress = {};
        data.course.chapters?.forEach((chapter) => {
          if (chapter.homeworkProgress) {
            initialProgress[chapter.id] = chapter.homeworkProgress;
          }
        });
        setChapterProgress(initialProgress);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err.message || "Failed to load course details");
      toast.error(err.message || "Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = useCallback(() => {
    navigate("/batch");
  }, [navigate]);

  const handleTabChange = useCallback((event, newValue) => {
    setActiveTab(newValue);
  }, []);

  const handleChapterToggle = useCallback(
    (chapterId) => {
      const newExpanded = expandedChapter === chapterId ? null : chapterId;
      setExpandedChapter(newExpanded);

      // Fetch doubts when chapter is expanded
      if (newExpanded) {
        fetchChapterDoubts(newExpanded);
      }
    },
    [expandedChapter]
  );

  // Callback to update homework progress from HomeworkSection
  const handleProgressUpdate = useCallback((chapterId, progressData) => {
    setChapterProgress((prev) => ({
      ...prev,
      [chapterId]: progressData,
    }));
  }, []);

  const fetchChapterDoubts = async (chapterId, forceRefresh = false) => {
    // Skip if already fetched (unless forcing refresh)
    if (!forceRefresh && chapterDoubts[chapterId]) return;

    try {
      console.log(
        "📚 Fetching doubts for chapter:",
        chapterId,
        forceRefresh ? "(forced)" : ""
      );
      const data = await apiCall(API_ENDPOINTS.CHAPTER_DOUBTS(chapterId));

      if (data.success) {
        setChapterDoubts((prev) => ({
          ...prev,
          [chapterId]: data.doubts || [],
        }));
      }
    } catch (err) {
      // Set empty array on error to prevent re-fetching
      setChapterDoubts((prev) => ({
        ...prev,
        [chapterId]: [],
      }));
    }
  };

  // Handle Ask Doubt - using Redux
  const handleAskDoubt = useCallback(
    (chapter) => {
      dispatch(openChat(chapter));
    },
    [dispatch]
  );

  // Styles
  const styles = {
    container: {
      minHeight: "100vh",
      background: blackBoardColor,
      py: 3,
    },
    headerCard: {
      p: 3,
      mb: 3,
      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)`,
      backdropFilter: "blur(20px)",
      border: `1px solid ${aliceBlueColor}30`,
      borderRadius: 3,
      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
    },
    chapterCard: {
      mb: 2,
      bgcolor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      border: `1px solid ${aliceBlueColor}20`,
      borderRadius: 2,
      "&:before": {
        display: "none",
      },
    },
    notesCard: {
      p: 3,
      bgcolor: "rgba(255, 255, 255, 0.08)",
      border: `1px solid ${aliceBlueColor}20`,
      borderRadius: 2,
      mb: 2,
    },
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={styles.container}>
        <Container maxWidth="lg">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="60vh"
          >
            <CircularProgress size={60} sx={{ color: aliceBlueColor, mb: 2 }} />
            <Typography variant="h6" sx={{ color: "white" }}>
              Loading course details...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  // Error state
  if (error || !courseData) {
    return (
      <Box sx={styles.container}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || "Course not found"}
          </Alert>
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{ bgcolor: aliceBlueColor }}
          >
            Go Back
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Paper elevation={6} sx={styles.headerCard}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{
                color: aliceBlueColor,
                borderColor: aliceBlueColor,
                "&:hover": {
                  borderColor: aliceBlueColor,
                  bgcolor: `${aliceBlueColor}20`,
                },
              }}
            >
              ← Back
            </Button>
            <CourseIcon sx={{ color: aliceBlueColor, fontSize: 40 }} />
            <Box flex={1}>
              <Typography
                variant="h4"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {courseData.title}
              </Typography>
              <Typography variant="body1" sx={{ color: captionColor, mt: 1 }}>
                {courseData.topic} • {courseData.difficulty} Level •{" "}
                {courseData.duration} weeks
              </Typography>
            </Box>
          </Box>

          {/* Course Stats */}
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Chip
              icon={<CourseIcon />}
              label={`${courseData.chapters?.length || 0} Chapters`}
              sx={{
                bgcolor: `${aliceBlueColor}20`,
                color: aliceBlueColor,
                fontWeight: "bold",
              }}
            />
            <Chip
              icon={<TimeIcon />}
              label={courseData.language || "English"}
              sx={{
                bgcolor: `${aliceBlueColor}20`,
                color: aliceBlueColor,
                fontWeight: "bold",
              }}
            />
            <Chip
              label={`Status: ${courseData.status}`}
              sx={{
                bgcolor:
                  courseData.status === "ready"
                    ? "rgba(76, 175, 80, 0.8)"
                    : "rgba(255, 152, 0, 0.8)",
                color: "white",
                fontWeight: "bold",
              }}
            />
          </Stack>

          {/* Progress Bar - Based on Homework Completion */}
          {courseData.overallProgress && (
            <Box mt={3}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Overall Progress (Homework Completion)
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: aliceBlueColor, fontWeight: "bold" }}
                >
                  {courseData.overallProgress.completedChapters}/
                  {courseData.overallProgress.totalChapters} Chapters (
                  {courseData.overallProgress.completionPercentage}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={courseData.overallProgress.completionPercentage || 0}
                sx={{
                  height: 10,
                  borderRadius: 4,
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: courseData.overallProgress.isCompleted
                      ? "#4caf50"
                      : aliceBlueColor,
                    borderRadius: 4,
                  },
                }}
              />
              {courseData.overallProgress.isCompleted && (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
                >
                  <EmojiEvents sx={{ color: "#ffd700", fontSize: 28 }} />
                  <Typography
                    variant="h6"
                    sx={{ color: "#4caf50", fontWeight: "bold" }}
                  >
                    🎉 Course Completed! All homework done!
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Paper>

        {/* Course Description */}
        {courseData.description && (
          <Paper elevation={6} sx={{ ...styles.headerCard, mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: aliceBlueColor, fontWeight: "bold", mb: 2 }}
            >
              Course Description
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "white", lineHeight: 1.8 }}
            >
              {courseData.description}
            </Typography>
          </Paper>
        )}

        {/* Chapters Section */}
        <Paper elevation={6} sx={styles.headerCard}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <NotesIcon sx={{ color: aliceBlueColor, fontSize: 32 }} />
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Course Chapters
            </Typography>
          </Box>

          {/* Empty State */}
          {(!courseData.chapters || courseData.chapters.length === 0) && (
            <Alert severity="info">
              No chapters available yet. The course is being generated.
            </Alert>
          )}

          {/* Chapters List */}
          {courseData.chapters?.map((chapter, index) => (
            <Accordion
              key={chapter.id}
              expanded={expandedChapter === chapter.id}
              onChange={() => handleChapterToggle(chapter.id)}
              sx={styles.chapterCard}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: aliceBlueColor }} />}
              >
                <Box display="flex" alignItems="center" gap={2} width="100%">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: `${aliceBlueColor}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: aliceBlueColor,
                    }}
                  >
                    {chapter.chapter_number}
                  </Box>
                  <Box flex={1}>
                    <Typography
                      variant="h6"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {chapter.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: captionColor }}>
                      {chapter.description || "No description available"}
                    </Typography>
                    {chapterProgress[chapter.id] && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: aliceBlueColor }}
                        >
                          📝 Homework:{" "}
                          {chapterProgress[chapter.id].solvedProblems || 0}/
                          {chapterProgress[chapter.id].totalProblems || 0}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={
                            chapterProgress[chapter.id].completionPercentage ||
                            0
                          }
                          sx={{
                            width: 80,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: `${aliceBlueColor}30`,
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: chapterProgress[chapter.id]
                                .isCompleted
                                ? "#4caf50"
                                : "#667eea",
                            },
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: aliceBlueColor }}
                        >
                          {chapterProgress[chapter.id].completionPercentage ||
                            0}
                          %
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  {(chapter.userProgress?.completed ||
                    chapterProgress[chapter.id]?.isCompleted) && (
                    <Tooltip title="Chapter Completed">
                      <CheckIcon sx={{ color: "#4caf50", fontSize: 32 }} />
                    </Tooltip>
                  )}
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Divider sx={{ mb: 3, borderColor: `${aliceBlueColor}20` }} />

                {/* Homework Section - TOP PRIORITY */}
                <HomeworkSection
                  chapterId={chapter.id}
                  onProgressUpdate={handleProgressUpdate}
                />

                {/* Ask Doubt Button - MODERN DESIGN */}
                <Box mb={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<DoubtIcon />}
                    onClick={() => handleAskDoubt(chapter)}
                    sx={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      py: 2,
                      borderRadius: 3,
                      boxShadow: "0 8px 30px rgba(102, 126, 234, 0.4)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                        transition: "left 0.5s",
                      },
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                        boxShadow: "0 12px 40px rgba(102, 126, 234, 0.6)",
                        transform: "translateY(-4px) scale(1.02)",
                        "&::before": {
                          left: "100%",
                        },
                      },
                      "&:active": {
                        transform: "translateY(-2px) scale(1)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    💬 Ask Your Doubts About This Chapter
                  </Button>
                </Box>

                {/* Videos - NOW AT TOP */}
                {chapter.videos && chapter.videos.length > 0 && (
                  <Box mb={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: aliceBlueColor, fontWeight: "bold", mb: 2 }}
                    >
                      🎥 Recommended Videos
                    </Typography>
                    <Grid container spacing={2}>
                      {chapter.videos.map((video) => (
                        <Grid item xs={12} md={6} key={video.id}>
                          <Card
                            sx={{
                              ...styles.notesCard,
                              cursor: "pointer",
                              transition: "all 0.3s",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: `0 8px 20px ${aliceBlueColor}30`,
                              },
                            }}
                            onClick={() =>
                              window.open(
                                `https://www.youtube.com/watch?v=${video.videoId}`,
                                "_blank"
                              )
                            }
                          >
                            <Box display="flex" gap={2}>
                              <img
                                src={video.thumbnailUrl}
                                alt={video.title}
                                style={{
                                  width: 120,
                                  height: 90,
                                  borderRadius: 8,
                                  objectFit: "cover",
                                }}
                              />
                              <Box flex={1}>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                    mb: 1,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {video.title}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: captionColor }}
                                >
                                  {video.channelName}
                                </Typography>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* AI Generated Notes - NOW BELOW VIDEOS */}
                {chapter.ai_generated_notes && (
                  <Card sx={styles.notesCard}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: aliceBlueColor, fontWeight: "bold", mb: 2 }}
                    >
                      📝 AI Generated Study Notes
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {chapter.ai_generated_notes}
                    </Typography>
                  </Card>
                )}

                {/* Previous Doubts Section */}
                <Card sx={{ ...styles.notesCard, mb: 3 }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: aliceBlueColor, fontWeight: "bold" }}
                    >
                      🤔 Previous Doubts & Questions
                    </Typography>
                    <Chip
                      label={`${
                        chapterDoubts[chapter.id]?.length || 0
                      } Questions`}
                      size="small"
                      sx={{
                        bgcolor: "rgba(102, 126, 234, 0.2)",
                        color: aliceBlueColor,
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {/* Real Doubts from Database */}
                    {chapterDoubts[chapter.id] &&
                    chapterDoubts[chapter.id].length > 0 ? (
                      chapterDoubts[chapter.id].map((doubt, idx) => (
                        <Paper
                          key={doubt.id}
                          elevation={2}
                          sx={{
                            p: 2.5,
                            bgcolor: "rgba(102, 126, 234, 0.08)",
                            border: "1px solid rgba(102, 126, 234, 0.2)",
                            borderRadius: 2,
                            transition: "all 0.3s",
                            "&:hover": {
                              bgcolor: "rgba(102, 126, 234, 0.12)",
                              borderColor: "rgba(102, 126, 234, 0.4)",
                              boxShadow: "0 4px 20px rgba(102, 126, 234, 0.2)",
                            },
                          }}
                        >
                          {/* Question */}
                          <Box
                            display="flex"
                            alignItems="flex-start"
                            gap={1.5}
                            mb={2}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: "rgba(102, 126, 234, 0.9)",
                                minWidth: "24px",
                                fontWeight: "bold",
                              }}
                            >
                              Q{idx + 1}
                            </Typography>
                            <Box flex={1}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "white",
                                  lineHeight: 1.6,
                                  fontWeight: "500",
                                }}
                              >
                                {doubt.question}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: captionColor,
                                  display: "block",
                                  mt: 0.5,
                                }}
                              >
                                {new Date(
                                  doubt.created_at
                                ).toLocaleDateString()}{" "}
                                •{" "}
                                {new Date(
                                  doubt.created_at
                                ).toLocaleTimeString()}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Answer */}
                          <Box
                            sx={{
                              pl: 5,
                              pt: 2,
                              borderTop: "1px solid rgba(100, 255, 218, 0.2)",
                            }}
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1}
                              mb={1}
                            >
                              <Chip
                                label="✨ AI Answer"
                                size="small"
                                sx={{
                                  bgcolor: "rgba(100, 255, 218, 0.15)",
                                  color: aliceBlueColor,
                                  fontSize: "0.65rem",
                                  height: "20px",
                                  fontWeight: "bold",
                                }}
                              />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "rgba(255, 255, 255, 0.9)",
                                lineHeight: 1.7,
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {doubt.answer}
                            </Typography>
                          </Box>
                        </Paper>
                      ))
                    ) : (
                      <Box
                        sx={{
                          p: 3,
                          textAlign: "center",
                          bgcolor: "rgba(102, 126, 234, 0.05)",
                          borderRadius: 2,
                          border: "1px dashed rgba(102, 126, 234, 0.3)",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: captionColor, mb: 1 }}
                        >
                          📚 No doubts yet for this chapter
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: captionColor }}
                        >
                          Be the first to ask a question!
                        </Typography>
                      </Box>
                    )}

                    <Box
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "rgba(102, 126, 234, 0.05)",
                        borderRadius: 2,
                        border: "1px dashed rgba(102, 126, 234, 0.3)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: captionColor, mb: 1 }}
                      >
                        💬 Have a question about this chapter?
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAskDoubt(chapter)}
                        sx={{
                          color: aliceBlueColor,
                          borderColor: aliceBlueColor,
                          "&:hover": {
                            borderColor: aliceBlueColor,
                            bgcolor: "rgba(102, 126, 234, 0.1)",
                          },
                        }}
                      >
                        Ask AI Tutor
                      </Button>
                    </Box>
                  </Box>
                </Card>

                {/* Topics */}
                {chapter.topics && chapter.topics.length > 0 && (
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: aliceBlueColor, fontWeight: "bold", mb: 2 }}
                    >
                      📚 Topics Covered
                    </Typography>
                    {chapter.topics.map((topic, idx) => (
                      <Card
                        key={topic.id || idx}
                        sx={{ ...styles.notesCard, mb: 2 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ color: "white", fontWeight: "bold", mb: 2 }}
                        >
                          {topic.topicName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "white", lineHeight: 1.8, mb: 2 }}
                        >
                          {topic.explanation}
                        </Typography>

                        {/* Examples */}
                        {topic.examples && topic.examples.length > 0 && (
                          <Box mt={2}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: aliceBlueColor,
                                fontWeight: "bold",
                                mb: 1,
                              }}
                            >
                              💡 Examples:
                            </Typography>
                            {topic.examples.map((example, exIdx) => (
                              <Box
                                key={exIdx}
                                sx={{
                                  p: 2,
                                  bgcolor: "rgba(0, 0, 0, 0.3)",
                                  borderRadius: 2,
                                  mb: 1,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ color: "white" }}
                                >
                                  <strong>Problem:</strong> {example.problem}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "white", mt: 1 }}
                                >
                                  <strong>Solution:</strong> {example.solution}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )}

                        {/* Practice Questions */}
                        {topic.practiceQuestions &&
                          topic.practiceQuestions.length > 0 && (
                            <Box mt={2}>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  color: aliceBlueColor,
                                  fontWeight: "bold",
                                  mb: 1,
                                }}
                              >
                                ✍️ Practice Questions:
                              </Typography>
                              {topic.practiceQuestions.map((q, qIdx) => (
                                <Box
                                  key={qIdx}
                                  sx={{
                                    p: 2,
                                    bgcolor: "rgba(0, 0, 0, 0.3)",
                                    borderRadius: 2,
                                    mb: 1,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "white" }}
                                  >
                                    <strong>Q{qIdx + 1}:</strong> {q.question}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: captionColor, mt: 1 }}
                                  >
                                    💡 Hint: {q.hint}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          )}
                      </Card>
                    ))}
                  </Box>
                )}

                {/* Chapter Duration */}
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  <TimeIcon sx={{ color: captionColor, fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: captionColor }}>
                    Duration: {chapter.duration_minutes || 45} minutes
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>

        {/* Modern Chat Dialog */}
        <ModernChatDialog />
      </Container>
    </Box>
  );
};

export default AppLayout()(Batch);
