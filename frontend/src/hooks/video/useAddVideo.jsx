import { useContext, useState } from "react"
import { api } from "../../api/axios"
import { VideosContext } from "../../context/video/videos-context"

export function useAddVideo() {
  const {videos, setVideos} = useContext(VideosContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createVideo = async (lectureId, data) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post(
        `/videos/${lectureId}/create-video`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setVideos([...videos, response.data.video])

      return true
    } catch (err) {
      setError(err.response?.data || err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    createVideo,
    loading,
    error,
  }
}
