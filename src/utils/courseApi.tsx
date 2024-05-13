import toast from "react-hot-toast";
import { Course } from "../state/courses/courseSlice";
import { addCourseToStudent } from "./userApi";

export async function enrollStudent(
  courseId: number,
  studentId: number,
  email: string
): Promise<Course | string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/courses/${courseId}`);
      console.log(response);
      const course: Course = await response.json();
      if (course.students.find((student) => student.id === studentId)) {
        toast.error("Student already enrolled");
        throw new Error("Student already enrolled");
      }
      course.students.push({ id: studentId, email: email });
      const updateResponse = await fetch(
        `http://localhost:8000/courses/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(course),
        }
      );
      if (!updateResponse.ok) {
        throw new Error("Failed to enroll student");
      }
      await addCourseToStudent(course, studentId);
      resolve(course);
    } catch (error) {
      console.log("Error enrolling student", error);
      reject("Error enrolling student");
    }
  });
}

export async function unenrollStudent(
  courseId: number,
  studentId: number
): Promise<Course | string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/courses/${courseId}`);
      const course: Course = await response.json();
      course.students = course.students.filter(
        (student) => student.id !== studentId
      );
      const updateResponse = await fetch(
        `http://localhost:8000/courses/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(course),
        }
      );
      if (!updateResponse.ok) {
        throw new Error("Failed to unenroll student");
      }
      resolve(course);
    } catch (error) {
      console.log("Error unenrolling student", error);
      reject("Error unenrolling student");
    }
  });
}
