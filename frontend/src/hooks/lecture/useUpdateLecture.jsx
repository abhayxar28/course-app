import { useContext, useState } from "react";
import { api } from "../../api/axios";
import { LecturesContext } from "../../context/lecture/lectures-context";

export function useUpdateLecture({ courseId, lectureId }) {
  const { lectures, setLectures } = useContext(LecturesContext);
  const [loading, setLoading] = useState(false);

  const updateLecture = async ({ title, description }) => {
    try {
      setLoading(true);

      const response = await api.put(
        `/lectures/${courseId}/${lectureId}/update-lecture`,
        { title, description }
      );

      const updatedLecture = response.data.lecture;

      setLectures((prevLectures) =>
        prevLectures.map((lec) =>
          lec._id === lectureId ? { ...lec, ...updatedLecture } : lec
        )
      );

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateLecture, loading };
}
