import { useTheme, useMediaQuery } from "@mui/material";

/**
 * Custom hook for responsive design utilities
 * @returns {Object} Responsive breakpoint states
 */
export const useResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoints: {
      xs: useMediaQuery(theme.breakpoints.only("xs")),
      sm: useMediaQuery(theme.breakpoints.only("sm")),
      md: useMediaQuery(theme.breakpoints.only("md")),
      lg: useMediaQuery(theme.breakpoints.only("lg")),
      xl: useMediaQuery(theme.breakpoints.only("xl")),
    },
  };
};
