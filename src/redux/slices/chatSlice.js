import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedChapter: null,
  messages: [],
  isTyping: false,
  lastSavedDoubtChapterId: null, // Track when a doubt is saved
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    openChat: (state, action) => {
      state.isOpen = true;
      state.selectedChapter = action.payload;
      state.messages = [
        {
          role: "assistant",
          content: `Hello! I'm here to help you understand "${action.payload.title}". Ask me anything about this chapter! 🚀`,
          timestamp: new Date().toISOString(),
        },
      ];
    },
    closeChat: (state) => {
      state.isOpen = false;
      state.selectedChapter = null;
      state.messages = [];
      state.isTyping = false;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    doubtSaved: (state, action) => {
      state.lastSavedDoubtChapterId = action.payload; // Store chapter ID
    },
  },
});

export const {
  openChat,
  closeChat,
  addMessage,
  setTyping,
  clearMessages,
  doubtSaved,
} = chatSlice.actions;

export default chatSlice.reducer;
