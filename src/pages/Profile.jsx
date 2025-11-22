import React, { lazy, useState, useMemo, useCallback, useEffect } from "react";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Paper,
  IconButton,
  Stack,
  Button,
  LinearProgress,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Edit as EditIcon,
  School as SchoolIcon,
  CheckCircle as CompletedIcon,
  RadioButtonUnchecked as PendingIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import AppLayout from "../components/layouts/AppLayout";
import { apiCall, API_ENDPOINTS } from "../utils/api";
import {
  aliceBlueColor,
  mattBlack,
  captionColor,
  darkBlueColor,
  blackBoardColor,
} from "../components/constants/color";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Lazy loaded components
const NewBatch = lazy(() => import("../components/specific/NewBatch"));

// Reusable style objects
const styles = {
  mainContainer: {
    minHeight: "100%",
    background: blackBoardColor,
  },
  profileCard: {
    p: 4,
    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)`,
    backdropFilter: "blur(20px)",
    border: `1px solid ${aliceBlueColor}30`,
    color: "white",
    borderRadius: 3,
    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px ${aliceBlueColor}20`,
  },
  avatar: {
    width: { xs: 120, md: 150 },
    height: { xs: 120, md: 150 },
    border: `4px solid ${aliceBlueColor}`,
    boxShadow: `0 0 20px ${aliceBlueColor}40`,
  },
  chip: {
    fontWeight: "bold",
    height: "4rem",
  },
  quickActionsCard: {
    p: 4,
    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`,
    backdropFilter: "blur(20px)",
    border: `1px solid ${aliceBlueColor}40`,
    borderRadius: 3,
    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3)`,
  },
  sectionTitle: {
    color: "white",
    textShadow: `0 0 10px ${aliceBlueColor}50`,
  },
  primaryButton: {
    bgcolor: aliceBlueColor,
    color: darkBlueColor,
    fontWeight: "bold",
    px: 4,
    py: 1.5,
    borderRadius: 2,
    boxShadow: `0 4px 15px ${aliceBlueColor}40`,
    "&:hover": {
      bgcolor: "#4fd3b8",
      boxShadow: `0 6px 20px ${aliceBlueColor}60`,
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },
  secondaryButton: {
    borderColor: "white",
    color: "white",
    fontWeight: "bold",
    px: 4,
    py: 1.5,
    borderRadius: 2,
    borderWidth: 2,
    "&:hover": {
      borderColor: aliceBlueColor,
      color: aliceBlueColor,
      bgcolor: `${aliceBlueColor}10`,
      borderWidth: 2,
      boxShadow: `0 4px 15px ${aliceBlueColor}30`,
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },
};

// Reusable components
const StatCard = ({ value, label, bgColor, borderColor }) => (
  <Card
    elevation={4}
    sx={{
      textAlign: "center",
      p: 3,
      background: bgColor,
      backdropFilter: "blur(10px)",
      border: `1px solid ${borderColor}`,
      color: "white",
      borderRadius: 2,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: `0 8px 25px ${borderColor.replace("0.3", "0.4")}`,
      },
    }}
  >
    <Typography variant="h2" fontWeight="bold">
      {value}
    </Typography>
    <Typography variant="h6">{label}</Typography>
  </Card>
);

const BatchCard = ({ course, onViewCourse }) => (
  <Card
    elevation={6}
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)`,
      backdropFilter: "blur(15px)",
      border: `1px solid ${
        course.isCompleted ? "rgba(76, 175, 80, 0.4)" : "rgba(255, 152, 0, 0.4)"
      }`,
      borderRadius: 2,
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: course.isCompleted
          ? `0 12px 28px rgba(76, 175, 80, 0.3)`
          : `0 12px 28px rgba(255, 152, 0, 0.3)`,
      },
      borderTop: `4px solid ${course.isCompleted ? "#4caf50" : "#ff9800"}`,
      cursor: "pointer",
    }}
    onClick={() => onViewCourse(course.id)}
  >
    <CardContent sx={{ flexGrow: 1, p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
          {course.title}
        </Typography>
        {course.isCompleted ? (
          <CompletedIcon sx={{ color: "#4caf50" }} />
        ) : (
          <PendingIcon sx={{ color: "#ff9800" }} />
        )}
      </Box>

      <Typography
        variant="body2"
        sx={{ color: aliceBlueColor, mb: 1, fontWeight: "bold" }}
      >
        {course.topic} • {course.difficulty} Level
      </Typography>

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
            {course.progress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={course.progress || 0}
          sx={{
            height: 6,
            borderRadius: 2,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            "& .MuiLinearProgress-bar": {
              bgcolor: course.isCompleted ? "#4caf50" : aliceBlueColor,
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <Typography
        variant="caption"
        sx={{ color: "#e0e0e0", mb: 2, display: "block" }}
      >
        Chapters: {course.completedChapters || 0}/{course.totalChapters || 0}
      </Typography>

      <Chip
        label={
          course.isCompleted
            ? "Completed"
            : course.status === "ready"
            ? "In Progress"
            : "Generating..."
        }
        size="small"
        sx={{
          bgcolor: course.isCompleted
            ? "rgba(76, 175, 80, 0.8)"
            : course.status === "ready"
            ? "rgba(255, 152, 0, 0.8)"
            : "rgba(33, 150, 243, 0.8)",
          color: "white",
          fontWeight: "bold",
          backdropFilter: "blur(10px)",
        }}
      />
    </CardContent>

    <Box sx={{ p: 2, pt: 0 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={(e) => {
          e.stopPropagation();
          onViewCourse(course.id);
        }}
        sx={{
          borderColor: aliceBlueColor,
          color: aliceBlueColor,
          fontWeight: "bold",
          "&:hover": {
            borderColor: aliceBlueColor,
            bgcolor: `${aliceBlueColor}15`,
            boxShadow: `0 0 15px ${aliceBlueColor}40`,
          },
        }}
      >
        {course.isCompleted ? "Review Course" : "Continue Learning"}
      </Button>
    </Box>
  </Card>
);

const Profile = () => {
  const [newBatch, setIsNewBatch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const data = await apiCall(API_ENDPOINTS.USER_PROFILE);

      if (data.success) {
        setProfileData(data);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError(err.message || "Failed to load profile");
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  // Memoized calculations
  const batchStats = useMemo(() => {
    if (!profileData) return { completed: [], pending: [], total: 0 };

    const completed = profileData.courses.filter(
      (course) => course.isCompleted
    );
    const pending = profileData.courses.filter((course) => !course.isCompleted);
    return {
      completed,
      pending,
      total: profileData.courses.length,
    };
  }, [profileData]);

  // Memoized chip data
  const chipData = useMemo(
    () => [
      {
        icon: <SchoolIcon />,
        label: `${batchStats.total} Total Batches`,
        bgcolor: aliceBlueColor,
        color: mattBlack,
      },
      {
        icon: <CompletedIcon />,
        label: `${batchStats.completed.length} Completed`,
        bgcolor: "#4caf50",
        color: "white",
      },
      {
        icon: <PendingIcon />,
        label: `${batchStats.pending.length} In Progress`,
        bgcolor: "#ff9800",
        color: "white",
      },
    ],
    [batchStats]
  );

  // Memoized stat cards data
  const statCards = useMemo(
    () => [
      {
        value: batchStats.completed.length,
        label: "Completed Batches",
        bgColor: `linear-gradient(135deg, rgba(76, 175, 80, 0.9) 0%, rgba(69, 160, 73, 0.9) 100%)`,
        borderColor: "rgba(76, 175, 80, 0.3)",
      },
      {
        value: batchStats.pending.length,
        label: "In Progress",
        bgColor: `linear-gradient(135deg, rgba(255, 152, 0, 0.9) 0%, rgba(245, 124, 0, 0.9) 100%)`,
        borderColor: "rgba(255, 152, 0, 0.3)",
      },
      {
        value: batchStats.total,
        label: "Total Batches",
        bgColor: `linear-gradient(135deg, ${aliceBlueColor}dd 0%, #26c6dadd 100%)`,
        borderColor: `${aliceBlueColor}50`,
      },
    ],
    [batchStats]
  );

  // Event handlers with useCallback
  const handleCloseNewBatch = useCallback(() => {
    setIsNewBatch(false);
  }, []);

  const handleNewBatch = useCallback(() => {
    setIsNewBatch((prev) => !prev);
  }, []);

  const navigateToAllBatch = useCallback(() => {
    navigate("/batch");
  }, [navigate]);

  const handleViewCourse = useCallback(
    (courseId) => {
      navigate(`/batch/${courseId}`);
    },
    [navigate]
  );

  // Loading state
  if (loading) {
    return (
      <Box sx={styles.mainContainer}>
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
              Loading profile...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  // Error state
  if (error || !profileData) {
    return (
      <Box sx={styles.mainContainer}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || "Failed to load profile"}
          </Alert>
          <Button
            variant="contained"
            onClick={fetchUserProfile}
            sx={{ bgcolor: aliceBlueColor }}
          >
            Retry
          </Button>
        </Container>
      </Box>
    );
  }

  const { user, courses } = profileData;

  return (
    <Box sx={styles.mainContainer}>
      <Container maxWidth="lg" sx={{ py: 4, pb: 6 }}>
        <Grid container spacing={4}>
          {/* Profile Header Section */}
          <Grid size={{ xs: 12 }}>
            <Paper elevation={6} sx={styles.profileCard}>
              <Box flex={1} textAlign={{ xs: "center", md: "left" }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "space-between" }}
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                  mb={2}
                >
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: aliceBlueColor }}
                  >
                    {user.name}
                  </Typography>
                  <IconButton
                    sx={{
                      color: aliceBlueColor,
                      bgcolor: `${aliceBlueColor}20`,
                      "&:hover": { bgcolor: `${aliceBlueColor}30` },
                    }}
                    onClick={() =>
                      toast.info("Edit profile feature coming soon!")
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  gap={1}
                  mb={2}
                >
                  <PersonIcon sx={{ color: captionColor }} />
                  <Typography variant="h6" sx={{ color: captionColor }}>
                    @{user.username}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  gap={1}
                  mb={3}
                >
                  <DescriptionIcon sx={{ color: captionColor, mt: 0.5 }} />
                  <Typography
                    variant="body1"
                    sx={{ color: captionColor, lineHeight: 1.6 }}
                  >
                    Member since{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems="center"
                >
                  {chipData.map((chip, index) => (
                    <Chip
                      key={index}
                      icon={chip.icon}
                      label={chip.label}
                      sx={{
                        ...styles.chip,
                        bgcolor: chip.bgcolor,
                        color: chip.color,
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Statistics Section */}
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={3}>
              {statCards.map((stat, index) => (
                <Grid size={{ xs: 12, sm: 4 }} key={index}>
                  <StatCard
                    value={stat.value}
                    label={stat.label}
                    bgColor={stat.bgColor}
                    borderColor={stat.borderColor}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Grid size={{ xs: 12 }}>
            <Paper elevation={6} sx={styles.quickActionsCard}>
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
                sx={{
                  ...styles.sectionTitle,
                  textAlign: "center",
                }}
              >
                Quick Actions
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  startIcon={<SchoolIcon />}
                  size="large"
                  onClick={handleNewBatch}
                  sx={styles.primaryButton}
                >
                  Generate New Course
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<SchoolIcon />}
                  onClick={navigateToAllBatch}
                  size="large"
                  sx={styles.secondaryButton}
                >
                  View Courses
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* My Courses Section */}
          {courses && courses.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
                sx={{
                  ...styles.sectionTitle,
                  textAlign: "left",
                }}
              >
                My Courses ({courses.length})
              </Typography>
              <Grid container spacing={3}>
                {courses.map((course) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
                    <BatchCard
                      course={course}
                      onViewCourse={handleViewCourse}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          {/* Empty State */}
          {courses && courses.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Paper elevation={6} sx={styles.quickActionsCard}>
                <Typography
                  variant="h6"
                  sx={{ color: captionColor, textAlign: "center", mb: 2 }}
                >
                  You haven't created any courses yet.
                </Typography>
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    startIcon={<SchoolIcon />}
                    onClick={handleNewBatch}
                    sx={styles.primaryButton}
                  >
                    Create Your First Course
                  </Button>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
      <NewBatch open={newBatch} onClose={handleCloseNewBatch} />
    </Box>
  );
};

export default AppLayout()(Profile);
