import { useSearchParams } from "react-router-dom";

export default function CourseDetailPage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id");
  console.log(courseId);

  return (
    <div>
      <h1>Course Details : {courseId}</h1>
    </div>
  );
}
  