import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import assignmentSliceReducer from "../features/assignment/assignmentSlice";
import authSliceReducer from "../features/auth/authSlice";
import leaderboardReducer from "../features/leaderboard/leaderboardSlice";
import userSliceReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    users: userSliceReducer,
    assignments: assignmentSliceReducer,
    leaderboard: leaderboardReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
