import { CourseCard } from "../../components/course/CourseCard";
import { useUnpublishedCourses } from "../../hooks/course/useUnpublishedCourses";

export default function UnpublishedCourses() {
  const { loading, courses = [] } = useUnpublishedCourses();

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
