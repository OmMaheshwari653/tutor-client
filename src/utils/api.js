// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNIN: `${API_BASE_URL}/api/auth/signin`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,

  // User endpoints
  USER_PROFILE: `${API_BASE_URL}/api/user/profile`,

  // Course endpoints
  COURSE_LIST: `${API_BASE_URL}/api/course/list`,
  COURSE_GENERATE: `${API_BASE_URL}/api/course/generate`,
  COURSE_DETAIL: (id) => `${API_BASE_URL}/api/course/${id}`,

  // Chapter endpoints
  CHAPTER_DETAIL: (courseId, chapterId) =>
    `${API_BASE_URL}/api/course/${courseId}/chapter/${chapterId}`,
  CHAPTER_NOTES: (chapterId) =>
    `${API_BASE_URL}/api/chapters/${chapterId}/notes`,

  // Chat endpoints
  CHAT: `${API_BASE_URL}/api/chat`,

  // Doubts endpoints
  CHAPTER_DOUBTS: (chapterId) => `${API_BASE_URL}/api/doubts/${chapterId}`,

  // Homework endpoints
  HOMEWORK: (chapterId) => `${API_BASE_URL}/api/homework/${chapterId}`,
  GENERATE_HOMEWORK: (chapterId) =>
    `${API_BASE_URL}/api/homework/generate/${chapterId}`,
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function for API calls with error handling
export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default API_BASE_URL;

// Named exports for easier imports
export const {
  SIGNIN,
  SIGNUP,
  USER_PROFILE,
  COURSE_LIST,
  COURSE_GENERATE,
  COURSE_DETAIL,
  CHAPTER_DETAIL,
  CHAPTER_NOTES,
  CHAT,
  CHAPTER_DOUBTS,
  HOMEWORK,
  GENERATE_HOMEWORK,
} = API_ENDPOINTS;
