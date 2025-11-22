import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatReducer from "./slices/chatSlice";
import { chatApi } from "./api/chatApi";

// Persist configuration for chat
const chatPersistConfig = {
  key: "chat",
  storage,
  whitelist: ["messages", "selectedChapter"], // Only persist messages and selected chapter
};

const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer);

export const store = configureStore({
  reducer: {
    chat: persistedChatReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(chatApi.middleware),
});

export const persistor = persistStore(store);
export default store;
