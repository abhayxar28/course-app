import { useContext, useEffect, useState } from "react";
import { api } from "../../api/axios";
import { LectureContext } from "../../context/lecture/lecture-context";

export function useLecture({lectureId}) {
  const {lecture, setLecture} = useContext(LectureContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lectureId) return;

    const fetchLecture = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/lectures/${lectureId}`);
        setLecture(response.data.lecture);
      } catch (error) {
        setLecture(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [lectureId]);

  return {
    lecture,
    loading,
  };
}
