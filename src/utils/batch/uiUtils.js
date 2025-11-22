/**
 * UI utility functions for styling and animations
 */

/**
 * Generate glassmorphism card styles
 * @param {boolean} isDarkMode - Dark mode state
 * @param {number} opacity - Background opacity (0-1)
 * @returns {Object} MUI sx styles
 */
export const getGlassmorphismStyles = (isDarkMode, opacity = 0.8) => ({
  background: isDarkMode
    ? `rgba(30, 41, 59, ${opacity})`
    : `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: "blur(15px)",
  border: `1px solid ${
    isDarkMode ? "rgba(100, 255, 218, 0.15)" : "rgba(0, 0, 0, 0.08)"
  }`,
  borderRadius: 2,
  boxShadow: isDarkMode
    ? "0 8px 32px rgba(0, 0, 0, 0.4)"
    : "0 8px 32px rgba(0, 0, 0, 0.1)",
});

/**
 * Generate hover animation styles
 * @param {string} transform - Transform value on hover
 * @returns {Object} MUI sx styles
 */
export const getHoverAnimationStyles = (transform = "translateY(-2px)") => ({
  transition: "all 0.3s ease",
  "&:hover": {
    transform,
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
  },
});

/**
 * Generate button styles with theme support
 * @param {boolean} isDarkMode - Dark mode state
 * @param {string} color - Primary color
 * @returns {Object} MUI sx styles
 */
export const getThemedButtonStyles = (isDarkMode, color = "#64ffda") => ({
  bgcolor: color,
  color: isDarkMode ? "#0f172a" : "#ffffff",
  "&:hover": {
    bgcolor: isDarkMode ? "#4fd3b8" : color,
    transform: "scale(1.05)",
  },
  "&:disabled": {
    bgcolor: isDarkMode
      ? "rgba(100, 100, 100, 0.3)"
      : "rgba(200, 200, 200, 0.5)",
    color: isDarkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
  },
  transition: "all 0.3s ease",
});

/**
 * Generate scrollbar styles
 * @param {boolean} isDarkMode - Dark mode state
 * @returns {Object} MUI sx styles
 */
export const getScrollbarStyles = (isDarkMode) => ({
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#64ffda",
    borderRadius: "3px",
  },
});

/**
 * Generate responsive padding/margin
 * @param {Object} values - Breakpoint values {xs, md, lg}
 * @returns {Object} Responsive object
 */
export const getResponsiveSpacing = (values) => ({
  xs: values.xs || 1,
  md: values.md || 2,
  lg: values.lg || 3,
});

/**
 * Generate responsive font sizes
 * @param {Object} sizes - Font sizes for breakpoints
 * @returns {Object} Responsive font size object
 */
export const getResponsiveFontSize = (sizes) => ({
  xs: sizes.xs || "0.875rem",
  sm: sizes.sm || "1rem",
  md: sizes.md || "1.125rem",
  lg: sizes.lg || "1.25rem",
});

/**
 * Generate chip styles based on type
 * @param {string} type - Chip type (success, warning, error, info)
 * @param {boolean} isDarkMode - Dark mode state
 * @returns {Object} MUI sx styles
 */
export const getChipStyles = (type, isDarkMode) => {
  const colors = {
    success: { bg: "#22c55e", text: "#ffffff" },
    warning: { bg: "#f59e0b", text: "#ffffff" },
    error: { bg: "#ef4444", text: "#ffffff" },
    info: { bg: "#64ffda", text: "#0f172a" },
  };

  const colorScheme = colors[type] || colors.info;

  return {
    bgcolor: colorScheme.bg,
    color: colorScheme.text,
    fontWeight: 600,
    "&:hover": {
      bgcolor: colorScheme.bg,
      transform: "scale(1.02)",
    },
    transition: "all 0.3s ease",
  };
};
