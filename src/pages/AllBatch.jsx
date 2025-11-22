import React, { useMemo, useCallback, useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  LinearProgress,
  Stack,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Schedule as ScheduleIcon,
  Star as StarIcon,
  PlayArrow as PlayIcon,
  SmartToy as AIIcon,
  MenuBook as ChapterIcon,
  TrendingUp as ProgressIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import toast from "react-hot-toast";
import {
  aliceBlueColor,
  darkBlueColor,
  blackBoardColor,
  captionColor,
} from "../components/constants/color";
import { API_ENDPOINTS, apiCall } from "../utils/api";

const AllBatch = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const data = await apiCall(API_ENDPOINTS.COURSE_LIST);

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  // Styles matching Profile theme
  const styles = {
    container: {
      minHeight: "100%",
      background: blackBoardColor,
      py: 4,
    },
    headerCard: {
      p: 4,
      mb: 4,
      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)`,
      backdropFilter: "blur(20px)",
      border: `1px solid ${aliceBlueColor}30`,
      borderRadius: 3,
      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px ${aliceBlueColor}20`,
    },
    batchCard: {
      height: "100%",
      position: "relative",
      overflow: "hidden",
      borderRadius: 3,
      transition: "all 0.3s ease-in-out",
      cursor: "pointer",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: `0 12px 28px rgba(0, 0, 0, 0.4)`,
      },
    },
    cardBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.9,
    },
    cardOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 100%)`,
    },
    cardContent: {
      position: "relative",
      zIndex: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      p: 3,
      color: "white",
    },
    title: {
      color: "white",
      fontWeight: "bold",
      mb: 2,
      textShadow: `0 2px 4px rgba(0, 0, 0, 0.5)`,
    },
    subtitle: {
      color: "#e0e0e0",
      mb: 2,
      lineHeight: 1.5,
      textShadow: `0 1px 2px rgba(0, 0, 0, 0.5)`,
    },
    chip: {
      bgcolor: `${aliceBlueColor}20`,
      color: aliceBlueColor,
      fontWeight: "bold",
      backdropFilter: "blur(10px)",
      border: `1px solid ${aliceBlueColor}40`,
    },
    statusChip: (isCompleted) => ({
      bgcolor: isCompleted
        ? "rgba(76, 175, 80, 0.8)"
        : "rgba(255, 152, 0, 0.8)",
      color: "white",
      fontWeight: "bold",
      backdropFilter: "blur(10px)",
    }),
    button: {
      bgcolor: aliceBlueColor,
      color: darkBlueColor,
      fontWeight: "bold",
      borderRadius: 2,
      boxShadow: `0 4px 15px ${aliceBlueColor}40`,
      "&:hover": {
        bgcolor: "#4fd3b8",
        boxShadow: `0 6px 20px ${aliceBlueColor}60`,
        transform: "translateY(-1px)",
      },
      transition: "all 0.3s ease",
    },
    sectionTitle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      mb: 2,
      textShadow: `0 0 10px ${aliceBlueColor}50`,
    },
    statsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: 4,
      mb: 4,
    },
    statItem: {
      textAlign: "center",
      color: "white",
    },
  };

  // Memoized stats calculation
  const batchStats = useMemo(() => {
    const totalBatches = courses.length;
    const completedBatches = courses.filter(
      (batch) => batch.isCompleted
    ).length;
    const totalProgress = courses.reduce(
      (sum, batch) => sum + (batch.progress || 0),
      0
    );
    const avgProgress =
      totalBatches > 0 ? Math.round(totalProgress / totalBatches) : 0;

    return { totalBatches, completedBatches, avgProgress };
  }, [courses]);

  // Navigate to batch details
  const handleBatchClick = useCallback(
    (batchId) => {
      navigate(`/batch/${batchId}`);
    },
    [navigate]
  );

  // Batch card component
  const BatchCard = ({ batch }) => {
    const bgGradient =
      {
        Beginner: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        Intermediate: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        Advanced: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      }[batch.difficulty] ||
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";

    const statusText =
      {
        generating: "Generating...",
        ready: batch.isCompleted ? "Completed" : "In Progress",
        failed: "Failed",
      }[batch.status] || "Unknown";

    const statusColor =
      {
        generating: "rgba(255, 152, 0, 0.8)",
        ready: batch.isCompleted
          ? "rgba(76, 175, 80, 0.8)"
          : "rgba(33, 150, 243, 0.8)",
        failed: "rgba(244, 67, 54, 0.8)",
      }[batch.status] || "rgba(158, 158, 158, 0.8)";

    return (
      <Card
        elevation={6}
        sx={styles.batchCard}
        onClick={() => handleBatchClick(batch.id)}
      >
        {/* Background Gradient */}
        <Box sx={{ ...styles.cardBackground, background: bgGradient }} />

        {/* Dark Overlay */}
        <Box sx={styles.cardOverlay} />

        {/* Content */}
        <CardContent sx={styles.cardContent}>
          {/* Header with Status */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Chip
              label={batch.category || "Course"}
              size="small"
              sx={styles.chip}
            />
            <Chip
              label={statusText}
              size="small"
              sx={{
                ...styles.statusChip(batch.isCompleted),
                bgcolor: statusColor,
              }}
            />
          </Box>

          {/* Course Title */}
          <Typography variant="h5" sx={styles.title}>
            {batch.title}
          </Typography>

          {/* Topic & Difficulty */}
          <Typography variant="body1" sx={styles.subtitle}>
            {batch.topic} • {batch.difficulty} Level
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              ...styles.subtitle,
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 2,
            }}
          >
            {batch.description || "AI-powered course with interactive content"}
          </Typography>

          {/* Progress Bar */}
          <Box mb={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography
                variant="caption"
                sx={{ color: "#e0e0e0", fontWeight: "bold" }}
              >
                Progress
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: aliceBlueColor, fontWeight: "bold" }}
              >
                {batch.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={batch.progress || 0}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: "rgba(255, 255, 255, 0.2)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: aliceBlueColor,
                  borderRadius: 3,
                },
              }}
            />
          </Box>

          {/* Stats Row */}
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <ChapterIcon sx={{ fontSize: 16, color: aliceBlueColor }} />
              <Typography variant="caption" sx={{ color: "#e0e0e0" }}>
                {batch.totalChapters || 0} Chapters
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <ScheduleIcon sx={{ fontSize: 16, color: aliceBlueColor }} />
              <Typography variant="caption" sx={{ color: "#e0e0e0" }}>
                {batch.duration} weeks
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <AIIcon sx={{ fontSize: 16, color: aliceBlueColor }} />
              <Typography variant="caption" sx={{ color: "#e0e0e0" }}>
                {batch.language || "English"}
              </Typography>
            </Box>
          </Stack>

          {/* Action Button */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<PlayIcon />}
            sx={styles.button}
            disabled={
              batch.status === "generating" || batch.status === "failed"
            }
          >
            {batch.status === "generating"
              ? "Generating Course..."
              : batch.status === "failed"
              ? "Generation Failed"
              : batch.isCompleted
              ? "Review Course"
              : "Continue Learning"}
          </Button>
        </CardContent>
      </Card>
    );
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
              Loading your courses...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Paper elevation={6} sx={styles.headerCard}>
          <Typography variant="h3" sx={styles.sectionTitle}>
            My Learning Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: captionColor,
              textAlign: "center",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Track your personalized learning journey with AI-powered tutoring
          </Typography>

          {/* Stats Section */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={4}
            sx={styles.statsContainer}
          >
            <Box sx={styles.statItem}>
              <Typography
                variant="h3"
                sx={{ color: aliceBlueColor, fontWeight: "bold" }}
              >
                {batchStats.totalBatches}
              </Typography>
              <Typography variant="body2" sx={{ color: captionColor }}>
                Total Courses
              </Typography>
            </Box>
            <Box sx={styles.statItem}>
              <Typography
                variant="h3"
                sx={{ color: aliceBlueColor, fontWeight: "bold" }}
              >
                {batchStats.completedBatches}
              </Typography>
              <Typography variant="body2" sx={{ color: captionColor }}>
                Completed Courses
              </Typography>
            </Box>
            <Box sx={styles.statItem}>
              <Typography
                variant="h3"
                sx={{ color: aliceBlueColor, fontWeight: "bold" }}
              >
                {batchStats.avgProgress}%
              </Typography>
              <Typography variant="body2" sx={{ color: captionColor }}>
                Avg Progress
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Empty State */}
        {courses.length === 0 && !loading && (
          <Box textAlign="center" py={8}>
            <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
              No courses yet
            </Typography>
            <Typography variant="body1" sx={{ color: captionColor, mb: 3 }}>
              Create your first AI-powered course to get started!
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
              sx={styles.button}
            >
              Generate Course
            </Button>
          </Box>
        )}

        {/* Batches Grid */}
        <Grid container spacing={4}>
          {courses.map((batch) => (
            <Grid item xs={12} md={6} key={batch.id}>
              <BatchCard batch={batch} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AppLayout()(AllBatch);
