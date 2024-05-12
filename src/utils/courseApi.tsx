import toast from "react-hot-toast";
import { Course } from "../state/courses/courseSlice";

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
      resolve(course);
    } catch (error) {
      console.log("Error enrolling student", error);
      reject("Error enrolling student");
    }
  });
}
