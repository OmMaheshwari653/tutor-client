/**
 * Material-UI theme configuration with glassmorphism design
 */
import { createTheme } from "@mui/material/styles";

/**
 * Color palette for the application
 */
export const colorPalette = {
  primary: {
    main: "#64ffda",
    light: "#4fd3b8",
    dark: "#00bfa5",
    contrastText: "#0f172a",
  },
  secondary: {
    main: "#22c55e",
    light: "#4ade80",
    dark: "#16a34a",
    contrastText: "#ffffff",
  },
  success: {
    main: "#22c55e",
    light: "#4ade80",
    dark: "#16a34a",
  },
  warning: {
    main: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706",
  },
  error: {
    main: "#ef4444",
    light: "#f87171",
    dark: "#dc2626",
  },
  info: {
    main: "#3b82f6",
    light: "#60a5fa",
    dark: "#2563eb",
  },
  grey: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
};

/**
 * Dark mode color overrides
 */
export const darkModeColors = {
  background: {
    default: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    paper: "rgba(30, 41, 59, 0.8)",
    card: "rgba(30, 41, 59, 0.6)",
  },
  text: {
    primary: "#f8fafc",
    secondary: "#94a3b8",
  },
  divider: "rgba(100, 255, 218, 0.2)",
};

/**
 * Light mode color overrides
 */
export const lightModeColors = {
  background: {
    default: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
    paper: "rgba(255, 255, 255, 0.95)",
    card: "rgba(255, 255, 255, 0.9)",
  },
  text: {
    primary: "#1e293b",
    secondary: "#64748b",
  },
  divider: "rgba(0, 0, 0, 0.1)",
};

/**
 * Typography configuration
 */
export const typography = {
  fontFamily: [
    "Inter",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(","),
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },
  caption: {
    fontSize: "0.75rem",
    lineHeight: 1.4,
  },
};

/**
 * Component style overrides
 */
export const componentOverrides = {
  MuiCard: {
    styleOverrides: {
      root: {
        backdropFilter: "blur(15px)",
        borderRadius: 16,
        transition: "all 0.3s ease",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        textTransform: "none",
        fontWeight: 600,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 600,
        transition: "all 0.3s ease",
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: 4,
        height: 8,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 3,
        borderRadius: 2,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 600,
        minHeight: 48,
      },
    },
  },
};

/**
 * Breakpoint configuration
 */
export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

/**
 * Create theme function
 */
export const createAppTheme = (isDarkMode = true) => {
  return createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      ...colorPalette,
      ...(isDarkMode ? darkModeColors : lightModeColors),
    },
    typography,
    components: componentOverrides,
    breakpoints,
    spacing: 8, // 8px base spacing
    shape: {
      borderRadius: 12,
    },
  });
};
