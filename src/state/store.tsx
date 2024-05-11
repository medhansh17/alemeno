import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courses/courseSlice";

import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
