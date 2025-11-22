import React, { memo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Collapse,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import {
  QuestionAnswer as QuestionIcon,
  Lightbulb as LightbulbIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { formatSectionContent } from "../../utils/batch/batchUtils";

/**
 * Content section component for notes
 */
const ContentSection = memo(
  ({
    section,
    index,
    isDarkMode,
    isMobile,
    themeStyles,
    expandedSection,
    onToggleExpand,
    onExplainSection,
    onAskDoubt,
  }) => {
    const { preview, full, needsExpansion } = formatSectionContent(
      section.content,
      isMobile ? 200 : 500
    );

    const isExpanded =
      expandedSection === section.id || expandedSection === null;

    return (
      <Card
        key={section.id}
        sx={{
          mb: 3,
          bgcolor: isDarkMode
            ? "rgba(30, 41, 59, 0.6)"
            : "rgba(255, 255, 255, 0.9)",
          border: `1px solid ${
            isDarkMode ? "rgba(100, 255, 218, 0.15)" : "rgba(0, 0, 0, 0.08)"
          }`,
          borderRadius: 3,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: isDarkMode
              ? "0 12px 40px rgba(0, 0, 0, 0.5)"
              : "0 12px 40px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          {/* Section Header with Action Buttons */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                ...themeStyles.primaryText,
                fontWeight: 600,
                color: isDarkMode ? "#f8fafc" : "#1e293b",
                flex: 1,
              }}
            >
              {section.title}
            </Typography>
            <Box display="flex" gap={1} ml={1}>
              <Tooltip title="Get AI explanation of this topic">
                <IconButton
                  onClick={() => onExplainSection(section.id, section.title)}
                  sx={{
                    color: "#22c55e",
                    bgcolor: "rgba(34, 197, 94, 0.1)",
                    "&:hover": {
                      bgcolor: "rgba(34, 197, 94, 0.2)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  size="small"
                >
                  <LightbulbIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Ask doubt about this topic">
                <IconButton
                  onClick={() => onAskDoubt(section.id, section.title)}
                  sx={{
                    color: "#64ffda",
                    bgcolor: "rgba(100, 255, 218, 0.1)",
                    "&:hover": {
                      bgcolor: "rgba(100, 255, 218, 0.2)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  size="small"
                >
                  <QuestionIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Content with Expansion for Mobile */}
          {isMobile && needsExpansion ? (
            <>
              <Collapse in={isExpanded}>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      ...themeStyles.secondaryText,
                      mb: 2,
                      lineHeight: 1.8,
                      fontSize: "1rem",
                    }}
                  >
                    {isExpanded ? full : preview}
                  </Typography>

                  {isExpanded && (
                    <Box mb={2}>
                      <Typography
                        variant="h6"
                        sx={{
                          ...themeStyles.primaryText,
                          fontWeight: 600,
                          mb: 1,
                          color: "#64ffda",
                          fontSize: "1.1rem",
                        }}
                      >
                        📌 Key Points:
                      </Typography>
                      <List dense>
                        {section.keyPoints.map((point, idx) => (
                          <ListItem key={idx} sx={{ py: 0.25, pl: 0 }}>
                            <ListItemText
                              primary={`• ${point}`}
                              sx={{
                                "& .MuiListItemText-primary": {
                                  ...themeStyles.secondaryText,
                                  fontSize: "0.9rem",
                                  lineHeight: 1.5,
                                },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </Box>
              </Collapse>

              <Button
                onClick={() => onToggleExpand(section.id)}
                startIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{
                  color: "#64ffda",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {isExpanded ? "Show Less" : "Read More"}
              </Button>
            </>
          ) : (
            <Box>
              <Typography
                variant="body1"
                sx={{
                  ...themeStyles.secondaryText,
                  mb: 3,
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                }}
              >
                {full}
              </Typography>

              {/* Key Points */}
              <Box mb={3}>
                <Typography
                  variant="h6"
                  sx={{
                    ...themeStyles.primaryText,
                    fontWeight: 600,
                    mb: 2,
                    color: "#64ffda",
                  }}
                >
                  📌 Key Points:
                </Typography>
                <List>
                  {section.keyPoints.map((point, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5, pl: 0 }}>
                      <ListItemText
                        primary={`• ${point}`}
                        sx={{
                          "& .MuiListItemText-primary": {
                            ...themeStyles.secondaryText,
                            fontSize: "1rem",
                            lineHeight: 1.6,
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}

          {/* Visual Diagram */}
          {section.diagram && (
            <Card
              sx={{
                mb: 3,
                bgcolor: isDarkMode
                  ? "rgba(15, 23, 42, 0.8)"
                  : "rgba(248, 250, 252, 0.8)",
                border: `1px solid ${
                  isDarkMode
                    ? "rgba(100, 255, 218, 0.2)"
                    : "rgba(0, 0, 0, 0.08)"
                }`,
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Typography
                    variant="h6"
                    sx={{
                      ...themeStyles.primaryText,
                      fontWeight: 600,
                      fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                  >
                    📊 Visual Learning
                  </Typography>
                </Box>
                <Box
                  component="img"
                  src={section.diagram}
                  alt={section.title}
                  sx={{
                    width: "100%",
                    maxHeight: { xs: 200, md: 300 },
                    objectFit: "cover",
                    borderRadius: 2,
                    border: `2px solid ${
                      isDarkMode
                        ? "rgba(100, 255, 218, 0.3)"
                        : "rgba(0, 0, 0, 0.1)"
                    }`,
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Examples */}
          {section.examples && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  ...themeStyles.primaryText,
                  fontWeight: 600,
                  mb: 2,
                  color: "#22c55e",
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                💡 Solved Examples:
              </Typography>
              {section.examples.map((example, idx) => (
                <Card
                  key={idx}
                  sx={{
                    mb: 2,
                    bgcolor: isDarkMode
                      ? "rgba(34, 197, 94, 0.1)"
                      : "rgba(34, 197, 94, 0.05)",
                    border: `1px solid ${
                      isDarkMode
                        ? "rgba(34, 197, 94, 0.3)"
                        : "rgba(34, 197, 94, 0.2)"
                    }`,
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography
                      variant="body1"
                      sx={{
                        ...themeStyles.primaryText,
                        fontWeight: 600,
                        mb: 1,
                        fontSize: { xs: "0.95rem", md: "1rem" },
                      }}
                    >
                      Problem: {example.problem}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#22c55e",
                        fontWeight: 600,
                        mb: 1,
                        fontSize: { xs: "0.95rem", md: "1rem" },
                      }}
                    >
                      Solution: {example.solution}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        ...themeStyles.secondaryText,
                        fontStyle: "italic",
                        fontSize: { xs: "0.85rem", md: "0.9rem" },
                      }}
                    >
                      💭 {example.explanation}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    );
  }
);

ContentSection.displayName = "ContentSection";

export default ContentSection;
