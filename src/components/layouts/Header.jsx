import {
  AppBar,
  Box,
  Icon,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, useState, lazy } from "react";
import {
  aliceBlueColor,
  brownColor,
  captionColor,
  mattBlack,
} from "../constants/color";
import {
  Pages as HomeIcon,
  Add as AddIcon,
  Book as BookIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useNavigate, Link } from "react-router-dom";
import NewBatch from "../specific/NewBatch";
import LogoutDialog from "../specific/LogoutDialog";
import toast from "react-hot-toast";

const PageLoader = lazy(() => import("./Loaders"));

const IconBtn = ({ title, onclick, icon }) => {
  return (
    <Tooltip title={title}>
      <IconButton sx={{ color: `${captionColor}` }} onClick={onclick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

const Header = () => {
  const [newBatch, setIsNewBatch] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const navigate = useNavigate();
  const navigateToAllBatch = () => {
    navigate("/batch");
  };
  const navigateToProfile = () => {
    navigate("/profile");
  };
  const navigateToHome = () => {
    navigate("/");
  };
  const handleNewBatch = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to create a course");
      navigate("/login");
      return;
    }
    setIsNewBatch((prev) => !prev);
  };

  const handleCloseNewBatch = () => {
    setIsNewBatch(false);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setLogoutDialogOpen(false);
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <AppBar
        position="static"
        sx={{
          bgcolor: mattBlack,
        }}
      >
        <Toolbar>
          <IconBtn title="Tutor" onclick={navigateToHome} icon={<HomeIcon />} />
          <Link
            to="/"
            style={{ textDecoration: "none", color: aliceBlueColor }}
          >
            <Typography variant="h6" sx={{ color: `${aliceBlueColor}` }}>
              Tutor
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconBtn
              title="Generate Course"
              onclick={handleNewBatch}
              icon={<AddIcon />}
            />
            <IconBtn
              title="View Courses"
              onclick={navigateToAllBatch}
              icon={<BookIcon />}
            />
            <IconBtn
              title="Profile"
              onclick={navigateToProfile}
              icon={<ProfileIcon />}
            />
            <IconBtn
              title="Logout"
              onclick={handleLogoutClick}
              icon={<LogoutIcon />}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <NewBatch open={newBatch} onClose={handleCloseNewBatch} />
      <LogoutDialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </Suspense>
  );
};

export default Header;
