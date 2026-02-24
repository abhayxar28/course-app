import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import LectureComponent from "../lecture/LectureComponent";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../hooks/user/useSession";
import { usePayment } from "../../hooks/payment/usePayment";

export default function CourseDetails({course}) {
  const navigate = useNavigate();
  const {createPayment} = usePayment()
  const {user} = useSession();

  const isInstructor = course.instructor === user?._id

  const isEnrolled = course.enrolledStudents?.includes(user?._id)

  const handlePayment = async () => {
    try {
      const response = await createPayment(course._id)
      window.location.href = response.url
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">
              {course.title}
            </h1>
            <p className="text-muted-foreground mt-2">
              {course.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary">{course.category}</Badge>
            <Badge variant="secondary">{course.levels}</Badge>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">₹{course.price}</div>
              <div className="flex gap-3">

                {isInstructor && (
                  <Button
                    size="lg"
                    variant="secondary"
                    className="shadow"
                    onClick={() => navigate(`/courses/${course._id}/edit`)}
                  >
                    Edit
                  </Button>
                )}

                {(isInstructor || isEnrolled) && (
                  <Button
                    size="lg"
                    className="shadow"
                    onClick={() => navigate(`/courses/${course._id}/watch`)}
                  >
                    Go to Course
                  </Button>
                )}

                {!isInstructor && !isEnrolled && (
                  <Button size="lg" className="shadow" onClick={handlePayment}>
                    Enroll Now
                  </Button>
                )}

              </div>

          </div>

          <Separator />

          <div className="prose max-w-none">
            {course.description}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Course Content</h3>
            <LectureComponent lectures={course?.lectures || []}/>
          </div>

          <Separator />

          <ul className="text-sm text-muted-foreground space-y-2">
            <li>✔ Full lifetime access</li>
            <li>✔ Access on mobile & desktop</li>
            <li>✔ Certificate of completion</li>
          </ul>
        </div>

        <div className="rounded-lg overflow-hidden border h-fit">
          <img
            src={course.thumbnail}
            alt="Course Thumbnail"
            className="w-full h-100 object-cover"
          />
        </div>

      </div>
    </div>
  );
}
