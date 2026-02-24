import {Badge} from "@/components/ui/badge"
import { EditCourseDialog } from "./EditCourseDialog"
import AlertDelete from "../delete/AlertDelete"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { useDeleteCourse } from "../../../hooks/course/useDeleteCourse"
import { useContext } from "react"
import { CourseContext } from "../../../context/course/course-context"

export default function CourseEditCard() {
    const { course } = useContext(CourseContext);


    const {deleteCourse, loading, error} = useDeleteCourse(course._id);
    const navigate = useNavigate();

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 text-sm text-destructive">
            Failed to load course. Please try again.
            </div>
        )
    }


    const handleDeleteCourse = async () => {
        try {
            await deleteCourse()
            navigate("/dashboard")
        } catch (error) {
            console.error("Failed to delete course", error)
        }
    }  
  return (
    <Card>
        <CardHeader className="grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-1">
            <CardTitle className="text-2xl">{course.title}</CardTitle>

            {course.subtitle && (
                <p className="text-sm text-muted-foreground">
                {course.subtitle}
                </p>
            )}

            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                {course.category && (
                <Badge variant="secondary">
                    {course.category}
                </Badge>
                )}

                {course.levels && (
                <Badge variant="outline" className="capitalize">
                    {course.levels}
                </Badge>
                )}

                {course.price !== undefined && (
                <Badge variant="default">
                    {course.price === 0 ? "Free" : `₹${course.price}`}
                </Badge>
                )}
            </div>

            {course.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                {course.description}
                </p>
            )}
            </div>

            <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                    <EditCourseDialog />
                    <AlertDelete handleDeleteCourse={handleDeleteCourse} loading={loading}/>
                </div>

                {course?.thumbnail && (
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-32 h-20 object-cover rounded-md border"
                    />
                )}
            </div>
        </CardHeader>
    </Card>
  )
}
