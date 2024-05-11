import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../courses/courseSlice";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  enrolledCourses: Course[];
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const selectUser = () =>
  sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user") as string)
    : null;

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
