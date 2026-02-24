import { useContext, useState } from "react"
import { api } from "../../api/axios"
import { VideosContext } from "../../context/video/videos-context";

export function useDeleteVideo() {
  const {setVideos} = useContext(VideosContext); 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteVideo = async (videoId) => {
    if (!videoId) {
      throw new Error("Video ID is required")
    }

    try {
      setLoading(true)
      setError(null)

      await api.delete(
        `/videos/${videoId}/delete-video`
      )

      setVideos((prevVideo)=>(
        prevVideo.filter((v)=>v._id !== videoId)
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
    deleteVideo,
    loading,
    error,
  }
}
