import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export function useCourses(page, category, limit = 3) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);

        const params = { page, limit };

        if (category && category !== "All") {
          params.category = category;
        }

        const response = await api.get("/courses", { params });

        if (isMounted) {
          setCourses(response.data.courses);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        if (isMounted) {
          setCourses([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, [page, category, limit]);

  return { courses, loading, totalPages };
}
