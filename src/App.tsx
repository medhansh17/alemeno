import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseContainer from "./components/couseContainer";
import CourseDetailPage from "./components/courseDetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CourseContainer />} />
          <Route path="/course/" element={<CourseDetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
