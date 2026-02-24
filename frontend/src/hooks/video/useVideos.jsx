import { useContext, useEffect, useState } from "react";
import { api } from "../../api/axios";
import { VideosContext } from "../../context/video/videos-context";

export function useVideos(lectureId) {
  const {videos, setVideos} = useContext(VideosContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lectureId) return;

    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/videos/${lectureId}`);
        setVideos(response.data.videos);
        return true;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [lectureId]);

  return {
    videos,
    loading,
  };
}
