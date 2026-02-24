import { CourseCard } from "../../components/course/CourseCard";
import { useInstructorCourses } from "../../hooks/course/useInstructorCourses";

export default function InstructorCourses() {
  const { loading, courses = [] } = useInstructorCourses();

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (!courses.length) {
    return <div>No courses found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
      {courses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
        />
      ))}
    </div>
  );
}
