import { useState, useMemo } from "react";

/**
 * Custom hook for managing theme state and styles
 * @returns {Object} Theme state and functions
 */
export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const themeStyles = useMemo(
    () => ({
      container: {
        minHeight: "100vh",
        background: isDarkMode
          ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
          : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
        transition: "all 0.3s ease",
      },
      topBar: {
        p: 2.5,
        mb: 2,
        background: isDarkMode
          ? "rgba(30, 41, 59, 0.8)"
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${
          isDarkMode ? "rgba(100, 255, 218, 0.2)" : "rgba(0, 0, 0, 0.1)"
        }`,
        borderRadius: 2,
        boxShadow: isDarkMode
          ? "0 4px 20px rgba(0, 0, 0, 0.4)"
          : "0 4px 20px rgba(0, 0, 0, 0.08)",
      },
      contentCard: {
        background: isDarkMode
          ? "rgba(30, 41, 59, 0.8)"
          : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(15px)",
        border: `1px solid ${
          isDarkMode ? "rgba(100, 255, 218, 0.15)" : "rgba(0, 0, 0, 0.08)"
        }`,
        borderRadius: 2,
        boxShadow: isDarkMode
          ? "0 8px 32px rgba(0, 0, 0, 0.4)"
          : "0 8px 32px rgba(0, 0, 0, 0.1)",
        minHeight: "calc(100vh - 200px)",
      },
      primaryText: {
        color: isDarkMode ? "#f8fafc" : "#1e293b",
      },
      secondaryText: {
        color: isDarkMode ? "#94a3b8" : "#64748b",
      },
      messageInput: {
        "& .MuiOutlinedInput-root": {
          color: isDarkMode ? "#f8fafc" : "#1e293b",
          backgroundColor: isDarkMode
            ? "rgba(15, 23, 42, 0.5)"
            : "rgba(255, 255, 255, 0.8)",
          "& fieldset": {
            borderColor: isDarkMode
              ? "rgba(100, 255, 218, 0.3)"
              : "rgba(0, 0, 0, 0.2)",
          },
          "&:hover fieldset": {
            borderColor: isDarkMode
              ? "rgba(100, 255, 218, 0.5)"
              : "rgba(0, 0, 0, 0.3)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#64ffda",
          },
        },
        "& .MuiInputLabel-root": {
          color: isDarkMode ? "#94a3b8" : "#64748b",
          "&.Mui-focused": {
            color: "#64ffda",
          },
        },
      },
      tabsStyle: {
        "& .MuiTab-root": {
          color: isDarkMode ? "#94a3b8" : "#64748b",
          fontWeight: 600,
          fontSize: "1rem",
          "&.Mui-selected": {
            color: "#64ffda",
          },
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "#64ffda",
          height: 3,
        },
      },
    }),
    [isDarkMode]
  );

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return {
    isDarkMode,
    themeStyles,
    toggleTheme,
  };
};
