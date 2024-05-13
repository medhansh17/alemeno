import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../courses/courseSlice";

export interface User {
  id: string;
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
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
  },
});



export const selectUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
