import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flex: 1,
          }}
        >
          <WrappedComponent {...props} />
        </Box>
        <Footer />
      </Box>
    );
  };
};

export default AppLayout;
