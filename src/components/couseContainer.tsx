import { CourseCard } from "./coursecard";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { useEffect, useState } from "react";
import { SearchBox } from "./searchBox";
import { fetchCourses, Course } from "../state/courses/courseSlice";

export default function CourseContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchField, setSearchField] = useState("");
  
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const courses = useSelector((state: RootState) => state.courses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const filtered = courses.courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchField.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchField.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchField, courses.courses]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value);
  };

  return (
    <div className="flex items-center flex-col gap-4 p-4">
      <SearchBox
        placeholder="Search Courses or Instructor"
        onChange={onSearchChange}
      />
      {courses.loading && <p>Loading...</p>}
      {courses.error && <p>{courses.error}</p>}
      <div className="flex flex-row flex-wrap justify-evenly gap-[2rem] w-[95%] mx-auto">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
