import { useContext, useEffect, useState } from "react"
import { api } from "../../api/axios"
import { CourseContext } from "../../context/course/course-context"

export function useCourse(courseId) {
  const { course, setCourse } = useContext(CourseContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!courseId) return

    const fetchCourse = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/courses/${courseId}`)
        console.log(response.data.course)
        setCourse(response.data.course)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId, setCourse])

  return {
    course,
    loading,
  }
}
