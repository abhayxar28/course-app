import { useParams } from 'react-router-dom';
import CourseDetails from '../../components/course/CourseDetail'
import { useCourse } from '../../hooks/course/useCourse';

export default function Course() {
  const {courseId} = useParams();

  const {course, loading} = useCourse(courseId)

  if(loading){
    return <div>
      Loading...
    </div>
  }
  return (
    <div><CourseDetails course={course}/></div>
  )
}
