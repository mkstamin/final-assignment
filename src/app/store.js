import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import userSliceReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    users: userSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
