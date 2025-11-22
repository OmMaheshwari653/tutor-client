import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <CssBaseline />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1a1a2e",
              color: "#fff",
              border: "1px solid #64ffda",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow: "0 8px 32px rgba(100, 255, 218, 0.2)",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#64ffda",
                secondary: "#1a1a2e",
              },
              style: {
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                border: "2px solid #64ffda",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#ff6b6b",
                secondary: "#1a1a2e",
              },
              style: {
                background: "linear-gradient(135deg, #2d1b1b 0%, #1a1a2e 100%)",
                border: "2px solid #ff6b6b",
              },
            },
            loading: {
              iconTheme: {
                primary: "#64ffda",
                secondary: "#1a1a2e",
              },
            },
          }}
        />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
