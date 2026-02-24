import CourseEditCard from "./CourseEditCard"
import LectureEditCard from "../../lecture/update/LectureEditCard"
import PublishCourse from "../publish/PublishCourse"
import { useCourse } from "../../../hooks/course/useCourse"
import { useParams } from "react-router-dom"


export default function CourseEditComponent() {
  const {courseId} = useParams();
  const {course} = useCourse(courseId);
  return (
    <div className="space-y-6 p-6 h-screen overflow-y-auto">

        <CourseEditCard />

        <LectureEditCard course={course}/>

        {!course?.isPublished && 
          <div className="sticky bottom-0 flex justify-end bg-background/90 p-4 z-10">
            <PublishCourse />
          </div>
        }
    </div>
  )
}

