import { useContext, useState } from "react";
import { api } from "../../api/axios";
import { CourseContext } from "../../context/course/course-context";

const updateCourseApi = async (data, courseId) =>
  (
    await api.put(
      `/courses/update-course/${courseId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  ).data;

export function useUpdateCourse() {
  const [loading, setLoading] = useState(false);
  const {setCourse} = useContext(CourseContext);

  const updateCourse = async (data, courseId) => {
    try {
      setLoading(true);
      const response = await updateCourseApi(data, courseId);
      setCourse(response.course);
      return true;
    } catch(error){
      console.log(error);
    }finally {
      setLoading(false);
    }
  };

  return { updateCourse, loading };
}
