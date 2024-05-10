import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  enrollmentStatus: string;
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: {
    week: number;
    topic: string;
    content: string;
  }[];
  students: {
    id: number;
    name: string;
    email: string;
  }[];
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    try {
      const response = await fetch("http://localhost:8000/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching courses", error);
    }
  }
);

export const fetchCourse = createAsyncThunk(
  "courses/fetchCourse",
  async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/courses/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch course");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching course", error);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "An error occurred";
    });
  },
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;
