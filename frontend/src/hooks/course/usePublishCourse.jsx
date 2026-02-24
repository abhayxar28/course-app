import { useState } from "react"
import { api } from "../../api/axios"
import { toast } from "sonner"

export function usePublishCourse(courseId) {
  const [loading, setLoading] = useState(false)

  const publishCourse = async () => {
    try {
      setLoading(true)
      await api.post(`/courses/publish-course/${courseId}`)

      return true
    } catch (err) {
      toast.error("Course cannot be published")
      return false
    } finally {
      setLoading(false)
    }
  }

  return { publishCourse, loading }
}
