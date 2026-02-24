import { useContext, useState } from "react";
import { api } from "../../api/axios";
import { LecturesContext } from "../../context/lecture/lectures-context";

export function useAddLecture(courseId) {
  const { lectures, setLectures } = useContext(LecturesContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLecture = async ({ title, description }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post(`/lectures/${courseId}/add-lecture`, {
        title,
        description,
      });

      const newLecture = res.data.lecture;

      if (newLecture) {
        setLectures([...lectures, newLecture]);
      }

      return newLecture;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createLecture, loading, error };
}
