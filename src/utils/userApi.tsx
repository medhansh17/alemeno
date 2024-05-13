import { Course } from "../state/courses/courseSlice";
import { User } from "../state/user/userSlice";

export async function fetchUser(userId: number): Promise<User | string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`);
      const user = await response.json();
      resolve(user);
    } catch (error) {
      console.log("Error fetching user", error);
      reject("Error fetching user");
    }
  });
}

export async function addCourseToStudent(
  course: Course,
  studentId: number
): Promise<Course | string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${studentId}`);
      const student = await response.json();
      if (student.enrolledCourses.find((c: Course) => c.id === course.id)) {
        throw new Error("Student already enrolled");
      }
      student.enrolledCourses.push(course);
      const updateResponse = await fetch(
        `http://localhost:8000/users/${studentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
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
