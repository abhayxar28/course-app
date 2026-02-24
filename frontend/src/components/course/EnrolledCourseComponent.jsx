import { useEnrolledCourses } from '../../hooks/course/useEnrolledCourses'
import { CourseCard } from './CourseCard';

export default function EnrolledCourseComponent() {
  const {enrolledCourses, loading} = useEnrolledCourses();  

  if (loading) {
    return <div>Loading courses...</div>
  }

  if (!enrolledCourses.length) {
    return <div className='flex justify-center items-center h-screen'>No courses found</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        {enrolledCourses.map((enrolledCourse)=>(
            <CourseCard
                key={enrolledCourse._id}
                course={enrolledCourse}
            />
        ))}
    </div>
  )
}
