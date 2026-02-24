import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export function CourseCard({ course }) {
  const navigate = useNavigate()

  return (
    <Card
      className="group relative mx-auto w-full max-w-sm cursor-pointer overflow-hidden pt-0 transition hover:-translate-y-1 hover:shadow-lg"
      onClick={() => navigate(`/courses/${course._id}`)}
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="aspect-video w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" />

        {course.category && (
          <Badge className="absolute left-3 top-3 z-10">
            {course.category}
          </Badge>
        )}
      </div>

      <CardHeader className="space-y-1">
        <CardTitle className="line-clamp-2">
          {course.title}
        </CardTitle>

        <CardDescription className="line-clamp-3">
          {course.description.slice(0,200)}...
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between">
        <span className="text-lg font-semibold">
          {course.price === 0 ? "Free" : `₹${course.price}`}
        </span>


          <Badge variant="outline" className="bg-background border-2 border-gray-300 text-gray-700">
            {course.levels}
          </Badge>
      </CardFooter>
    </Card>
  )
}
