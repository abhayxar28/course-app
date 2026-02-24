import { useContext, useEffect, useState } from "react";
import { api } from "../../api/axios";
import { LecturesContext } from "../../context/lecture/lectures-context";

export function useLectures(courseId) {
  const {lectures, setLectures} = useContext(LecturesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    const fetchLecture = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/lectures/course/${courseId}`);
        setLectures(response.data.lectures);
      } catch (error) {
        setLectures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [courseId]);

  return {
    lectures,
    loading,
  };
}
