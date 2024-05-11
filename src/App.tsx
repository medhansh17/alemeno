import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CoursePage from "./components/couseContainer";
import CourseDetailPage from "./components/courseDetail";
import LoginPage from "./components/login";
import SignupCard from "./components/signUp";
import Navbar from "./components/navbar";
import { ProtectedRoute } from "./components/protectedRoute";
import { Dashboard } from "./components/dashboard";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<CoursePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupCard />} />
          <Route path="/course" element={<CourseDetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
