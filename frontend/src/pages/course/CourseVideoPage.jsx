import CourseVideoComponent from "../../components/course/CourseVideoComponent";
import { useCourse } from "../../hooks/course/useCourse";
import { useLectures } from "../../hooks/lecture/useLectures";
import {useParams} from 'react-router-dom';

export default function CourseVideoPage() {
  const {courseId} = useParams();
  const {lectures, loading} = useLectures(courseId)
  const {course} = useCourse(courseId)

  if(loading){
    return <div>
      Loading...
    </div>
  }
  return (
    <div>
      <CourseVideoComponent lectures={lectures} course={course}/>
    </div>
  )
}

