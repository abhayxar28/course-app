import { UploadCloud, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePublishCourse } from "../../../hooks/course/usePublishCourse"
import { useContext } from "react"
import { CourseContext } from "../../../context/course/course-context"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function PublishCourse() {
  const {course} = useContext(CourseContext);
  const navigate = useNavigate();
  const { publishCourse, loading } = usePublishCourse(course._id)

  const handlePublish = async()=>{
    try {
      await publishCourse();
      toast.success("Course Published successfully");
      navigate("/dashboard")
    } catch (error) {
      toast.error("Course cannot be published")
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        size="lg"
        className="gap-2 shadow-lg"
        onClick={handlePublish}
        disabled={loading || course.totalLectures > 0 }
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Publishing…
          </>
        ) : (
          <>
            <UploadCloud className="h-5 w-5" />
            Publish Course
          </>
        )}
      </Button>
    </div>
  )
}
