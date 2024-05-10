import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCourse } from "../state/courses/courseSlice";
import { Course } from "../state/courses/courseSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../state/store";
import { SyllabusAccordion } from "./syllabusAccordion";

export default function CourseDetailPage() {
  const [searchParams] = useSearchParams();
  const [course, setCourse] = useState<Course>();
  const courseId = Number(searchParams.get("id"));
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchCourse(courseId));
      console.log(result.payload);
      console.log(result.payload.syllabus);

      setCourse(result.payload);
    };
    fetchData();
  }, [searchParams, dispatch]);

  return (
    <>
      {course && (
        <div className=" pb-4">
          <div className="bg-[#2D2F31] min-h-[40vh] h-fit w-full text-white flex md:flex-row flex-col-reverse justify-around items-center gap-4 pb-4">
            <div className="flex flex-col gap-4 max-w-[600px] lg:w-[65%] w-[90%] lg:ml-[8%] ml-[2%] ">
              <span className="sm:text-3xl text-xl font-bold text-center">
                {course.name}
              </span>
              <p className="sm:text-xl text-lg text-center">{course.description}</p>
              <p>Created by {course.instructor}</p>
              <section className="flex flex-row gap-3">
                <span>Enrollments : {course.enrollmentStatus}</span>
                <span>Location: {course.location}</span>
                <span>Duration: {course.duration}</span>
              </section>
              <p>Schedule : {course.schedule}</p>
            </div>
            <div className="max-w-[300px] w-[900px]">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80 "
                alt="Medhansh"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className=" mt-2 py-2 mx-auto w-[90%] flex sm:flex-row flex-col justify-evenly">
            <div className=" mx-auto flex flex-col">
              <h1 className="text-3xl font-bold">Requirements</h1>
              <ul className="list-disc list-inside text-lg mt-4">
                {course.prerequisites.map((content, index) => (
                  <li key={index}>{content}</li>
                ))}
              </ul>
            </div>
            <section className="min-w-[400px] max-w-[900px] w-[90%]">
              <h1 className="text-3xl font-bold">Course Content</h1>
              <SyllabusAccordion syllabus={course.syllabus} />
            </section>
          </div>
        </div>
      )}
    </>
  );
}
