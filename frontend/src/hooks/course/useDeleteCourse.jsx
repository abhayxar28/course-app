import { useState } from "react"
import { api } from "../../api/axios"
import { toast } from "sonner"

export function useDeleteCourse(courseId) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteCourse = async () => {
    try {
      setLoading(true)
      setError(null)

      await api.delete(`/courses/delete-course/${courseId}`)
      toast.success("Course deleted successfully")
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    deleteCourse,
    loading,
    error,
  }
}
