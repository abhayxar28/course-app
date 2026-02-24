import { useContext, useState } from "react"
import { api } from "../../api/axios"
import { VideosContext } from "../../context/video/videos-context"

export function useUpdateVideo() {
  const {setVideos} = useContext(VideosContext);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateVideo = async (videoId, data) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.put(
        `/videos/${videoId}/update-video`,
        data
      )

      const updatedVideo = response.data.videos

      setVideos(prevVideo => (
        prevVideo.map((v)=>{
          v._id === videoId ? {...v, ...updatedVideo} : v
        })
      ))

      return true
    } catch (err) {
      setError(err.response?.data || err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    updateVideo,
    loading,
    error,
  }
}
