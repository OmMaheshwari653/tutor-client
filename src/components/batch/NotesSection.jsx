import React, { memo } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from "@mui/material";
import { MenuBook as NotesIcon, Quiz as QuizIcon } from "@mui/icons-material";
import {
  parseProgress,
  getDifficultyColor,
} from "../../utils/batch/batchUtils";
import ContentSection from "./ContentSection";

/**
 * Notes section component containing chapter intro and content sections
 */
const NotesSection = memo(
  ({
    batchData,
    batchNotes,
    isDarkMode,
    isMobile,
    themeStyles,
    expandedSection,
    onToggleExpand,
    onExplainSection,
    onAskDoubt,
  }) => {
    const progressValue = parseProgress(batchData.progress);

    return (
      <Box>
        {/* Chapter Introduction */}
        <Card
          sx={{
            mb: 3,
            bgcolor: isDarkMode
              ? "rgba(15, 23, 42, 0.6)"
              : "rgba(248, 250, 252, 0.8)",
            border: `1px solid ${
              isDarkMode ? "rgba(100, 255, 218, 0.2)" : "rgba(0, 0, 0, 0.08)"
            }`,
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              mb={2}
              flexWrap="wrap"
            >
              <Avatar
                sx={{
                  bgcolor: "#64ffda",
                  color: "#0f172a",
                  width: { xs: 40, md: 48 },
                  height: { xs: 40, md: 48 },
                }}
              >
                <NotesIcon />
              </Avatar>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={themeStyles.primaryText}
                fontWeight="600"
              >
                {batchNotes.chapterContent.title}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                ...themeStyles.secondaryText,
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.7,
              }}
            >
              {batchNotes.chapterContent.introduction}
            </Typography>

            {/* Progress */}
            <Box mt={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography
                  variant="body1"
                  sx={themeStyles.primaryText}
                  fontWeight="600"
                >
                  Chapter Progress
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#64ffda" }}
                  fontWeight="600"
                >
                  {batchData.progress}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progressValue}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: isDarkMode
                    ? "rgba(100, 255, 218, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#64ffda",
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Content Sections */}
        {batchNotes.chapterContent.sections.map((section, index) => (
          <ContentSection
            key={section.id}
            section={section}
            index={index}
            isDarkMode={isDarkMode}
            isMobile={isMobile}
            themeStyles={themeStyles}
            expandedSection={expandedSection}
            onToggleExpand={onToggleExpand}
            onExplainSection={onExplainSection}
            onAskDoubt={onAskDoubt}
          />
        ))}

        {/* Practice Problems */}
        <Card
          sx={{
            bgcolor: isDarkMode
              ? "rgba(245, 158, 11, 0.1)"
              : "rgba(245, 158, 11, 0.05)",
            border: `1px solid ${
              isDarkMode ? "rgba(245, 158, 11, 0.3)" : "rgba(245, 158, 11, 0.2)"
            }`,
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <QuizIcon sx={{ color: "#f59e0b", fontSize: 32 }} />
              <Typography
                variant="h5"
                sx={{
                  ...themeStyles.primaryText,
                  fontWeight: 600,
                }}
              >
                Practice Problems
              </Typography>
            </Box>
            {batchNotes.chapterContent.practiceProblems.map(
              (problem, index) => (
                <Card
                  key={problem.id}
                  sx={{
                    mb: 2,
                    bgcolor: isDarkMode
                      ? "rgba(30, 41, 59, 0.6)"
                      : "rgba(255, 255, 255, 0.8)",
                    border: `1px solid ${
                      isDarkMode
                        ? "rgba(100, 255, 218, 0.15)"
                        : "rgba(0, 0, 0, 0.08)"
                    }`,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: isDarkMode
                        ? "0 8px 25px rgba(0, 0, 0, 0.4)"
                        : "0 8px 25px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      mb={2}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          ...themeStyles.primaryText,
                          fontWeight: 600,
                          flex: 1,
                        }}
                      >
                        Q{index + 1}. {problem.question}
                      </Typography>
                      <Chip
                        label={problem.difficulty}
                        size="small"
                        color={getDifficultyColor(problem.difficulty)}
                        sx={{
                          ml: 2,
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        ...themeStyles.secondaryText,
                        fontStyle: "italic",
                        fontSize: "0.95rem",
                      }}
                    >
                      💡 Hint: {problem.hint}
                    </Typography>
                  </CardContent>
                </Card>
              )
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }
);

NotesSection.displayName = "NotesSection";

export default NotesSection;
