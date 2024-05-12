import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Course } from "../state/courses/courseSlice";

export const Dashboard = () => {
  const userEnrolledCourses: Course[] | undefined = useSelector(
    (state: RootState) => state.user.user?.enrolledCourses
  );
  return (
    <div>
      <div className="bg-[#2D2F31] w-full h-[20vh] text-white flex items-center justify-center">
        <h1 className="text-4xl w-[70%]">My Courses</h1>
      </div>
      <div>
        <div className="flex items-center flex-col gap-4 p-4">
          <div className="flex flex-row flex-wrap justify-evenly gap-[2rem] w-[95%] mx-auto">
            {userEnrolledCourses?.map((course) => (
              <div
                key={course.id}
                className="bg-[#2D2F31] text-white p-4 rounded-lg w-[300px] h-[300px] flex flex-col justify-between"
              >
                <h1 className="text-2xl">{course.name}</h1>
                <p>{course.instructor}</p>
                <p>{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
