import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { aliceBlueColor, darkBlueColor } from "../constants/color";

const LogoutDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: "#1a1a2e",
          color: "white",
          borderRadius: 3,
          border: `2px solid ${aliceBlueColor}40`,
          minWidth: "400px",
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <LogoutIcon sx={{ color: aliceBlueColor, fontSize: 32 }} />
          <Typography variant="h6" fontWeight="bold">
            Confirm Logout
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ color: "#e0e0e0" }}>
          Are you sure you want to logout? Your progress is saved and you can
          come back anytime.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "white",
            color: "white",
            "&:hover": {
              borderColor: aliceBlueColor,
              color: aliceBlueColor,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: "#f44336",
            color: "white",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#d32f2f",
            },
          }}
        >
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
