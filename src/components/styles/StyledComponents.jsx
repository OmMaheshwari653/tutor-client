import { styled } from "@mui/material";

export const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  clip: "rect(0 0 0 0)",
  border: 0,
  padding: 0,
  height: "1px",
  width: "1px",
  overflow: "hidden",
});
