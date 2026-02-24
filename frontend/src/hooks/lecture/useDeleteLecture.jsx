import { useContext, useState } from "react";
import { api } from "../../api/axios";
import { LecturesContext } from "../../context/lecture/lectures-context";

export function useDeleteLecture({courseId, lectureId}) {
  const {setLectures} = useContext(LecturesContext);
  const [loading, setLoading] = useState(false);

  const deleteLecture = async () => {
    try {
      setLoading(true);
      await api.delete(`/lectures/${courseId}/${lectureId}`);
      setLectures((prevLectures)=>(
        prevLectures.filter((lec)=>lec._id !== lectureId)
      ));
      return true
    } catch (error) {
      throw error
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteLecture,
    loading,
  };
}
