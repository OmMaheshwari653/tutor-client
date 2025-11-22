import React, { lazy, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Divider,
  Fade,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useInputValidation } from "6pp";
import { usernameValidator } from "../utils/validators";
import toast from "react-hot-toast";
import {
  aliceBlueColor,
  blackBoardColor,
  brownColor,
  captionColor,
  mattBlack,
} from "../components/constants/color";
import { API_ENDPOINTS, apiCall } from "../utils/api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const email = useInputValidation("");
  const password = useInputValidation("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const loadingToast = toast.loading("Signing in...");

    try {
      const data = await apiCall(API_ENDPOINTS.SIGNIN, {
        method: "POST",
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success(`Welcome back, ${data.user.name}! 🎉`, {
          id: loadingToast,
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (err) {
      toast.error(err.message || "Failed to connect to server", {
        id: loadingToast,
      });
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!name.value || !email.value || !password.value) {
      toast.error("Please fill all fields!");
      setError("Please fill all fields");
      return;
    }

    if (password.value.length < 6) {
      toast.error("Password must be at least 6 characters!");
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);

    const loadingToast = toast.loading("Creating your account...");

    try {
      const data = await apiCall(API_ENDPOINTS.SIGNUP, {
        method: "POST",
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success(`Welcome aboard, ${data.user.name}! 🚀`, {
          id: loadingToast,
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        throw new Error(data.error || "Signup failed");
      }
    } catch (err) {
      toast.error(err.message || "Failed to connect to server", {
        id: loadingToast,
      });
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: blackBoardColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Fade in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 7 },
              borderRadius: 4,
              background: mattBlack,
              backdropFilter: "blur(20px)",
              border: `1px solid ${brownColor}`,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              color: "white",
            }}
          >
            {isLogin ? (
              <Stack spacing={3} alignItems="center">
                <Box textAlign="center" mb={2}>
                  <AccountCircleIcon
                    sx={{ fontSize: 60, color: aliceBlueColor, mb: 1 }}
                  />
                  <Typography
                    component="h1"
                    variant="h4"
                    fontWeight="bold"
                    color={aliceBlueColor}
                  >
                    Welcome Back
                  </Typography>
                  <Typography variant="caption" color={captionColor} mt={1}>
                    Sign in to your account
                  </Typography>
                </Box>

                <Box
                  component="form"
                  onSubmit={handleLogin}
                  sx={{ width: "100%" }}
                >
                  <Stack spacing={3}>
                    {error && (
                      <Typography
                        color="error"
                        variant="body2"
                        textAlign="center"
                      >
                        {error}
                      </Typography>
                    )}
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      value={email.value}
                      onChange={email.changeHandler}
                      InputProps={{
                        startAdornment: (
                          <EmailIcon sx={{ color: aliceBlueColor, mr: 1 }} />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: { captionColor },
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: { aliceBlueColor },
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                          "&.Mui-focused": {
                            color: { aliceBlueColor },
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#ff6b6b",
                        },
                      }}
                    />

                    <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={password.value}
                      onChange={password.changeHandler}
                      InputProps={{
                        startAdornment: (
                          <LockIcon sx={{ color: aliceBlueColor, mr: 1 }} />
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: aliceBlueColor,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: aliceBlueColor,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                          "&.Mui-focused": {
                            color: aliceBlueColor,
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                        },
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        background:
                          "linear-gradient(45deg, #1a1a2e 30%, #16213e 90%)",
                        border: "1px solid #64ffda",
                        color: aliceBlueColor,
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #64ffda 30%, #4fd1c7 90%)",
                          color: "#1a1a2e",
                          transform: "translateY(-1px)",
                          boxShadow: "0 8px 25px rgba(100, 255, 218, 0.4)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>

                    <Divider sx={{ my: 2 }}>
                      <Typography variant="body2" color={captionColor}>
                        OR
                      </Typography>
                    </Divider>

                    <Button
                      variant="text"
                      onClick={toggleLogin}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "1rem",
                        color: aliceBlueColor,
                        "&:hover": {
                          backgroundColor: "rgba(100, 255, 218, 0.1)",
                        },
                      }}
                    >
                      Don't have an account? Sign Up
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            ) : (
              <Stack spacing={3} alignItems="center">
                <Box textAlign="center" mb={1}>
                  <Typography
                    component="h1"
                    variant="h4"
                    fontWeight="bold"
                    color={aliceBlueColor}
                  >
                    Create Account
                  </Typography>
                  <Typography variant="body2" color={captionColor} mt={1}>
                    Join us today and get started
                  </Typography>
                </Box>

                <Box
                  component="form"
                  onSubmit={handleSignUp}
                  sx={{ width: "100%" }}
                >
                  <Stack spacing={3} alignItems="center">
                    {error && (
                      <Typography
                        color="error"
                        variant="body2"
                        textAlign="center"
                        width="100%"
                      >
                        {error}
                      </Typography>
                    )}

                    <Stack spacing={2.5} width="100%">
                      <TextField
                        required
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        value={name.value}
                        onChange={name.changeHandler}
                        InputProps={{
                          startAdornment: (
                            <PersonIcon sx={{ color: aliceBlueColor, mr: 1 }} />
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            "& fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.3)",
                            },
                            "&:hover fieldset": {
                              borderColor: aliceBlueColor,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: aliceBlueColor,
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255, 255, 255, 0.7)",
                            "&.Mui-focused": {
                              color: aliceBlueColor,
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: "white",
                          },
                        }}
                      />

                      <TextField
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        value={email.value}
                        onChange={email.changeHandler}
                        InputProps={{
                          startAdornment: (
                            <EmailIcon sx={{ color: aliceBlueColor, mr: 1 }} />
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            "& fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.3)",
                            },
                            "&:hover fieldset": {
                              borderColor: aliceBlueColor,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: aliceBlueColor,
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255, 255, 255, 0.7)",
                            "&.Mui-focused": {
                              color: aliceBlueColor,
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: "white",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#ff6b6b",
                          },
                        }}
                      />

                      <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password.value}
                        onChange={password.changeHandler}
                        InputProps={{
                          startAdornment: (
                            <LockIcon sx={{ color: aliceBlueColor, mr: 1 }} />
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            "& fieldset": {
                              borderColor: "rgba(255, 255, 255, 0.3)",
                            },
                            "&:hover fieldset": {
                              borderColor: aliceBlueColor,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: aliceBlueColor,
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "rgba(255, 255, 255, 0.7)",
                            "&.Mui-focused": {
                              color: aliceBlueColor,
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: "white",
                          },
                        }}
                      />
                    </Stack>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        mt: 2,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        background:
                          "linear-gradient(45deg, #1a1a2e 30%, #16213e 90%)",
                        border: "1px solid #64ffda",
                        color: aliceBlueColor,
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #64ffda 30%, #4fd1c7 90%)",
                          color: "#1a1a2e",
                          transform: "translateY(-1px)",
                          boxShadow: "0 8px 25px rgba(100, 255, 218, 0.4)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>

                    <Divider sx={{ my: 2, width: "100%" }}>
                      <Typography variant="body2" color={captionColor}>
                        OR
                      </Typography>
                    </Divider>

                    <Button
                      variant="text"
                      onClick={toggleLogin}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "1rem",
                        color: "primary.main",
                        "&:hover": {
                          backgroundColor: "rgba(102, 126, 234, 0.04)",
                        },
                      }}
                    >
                      Already have an account? Sign In
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            )}
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;
