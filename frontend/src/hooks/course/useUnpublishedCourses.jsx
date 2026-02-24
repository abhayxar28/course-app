import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export function useUnpublishedCourses(){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUnpublishedCourses = async()=>{
        try {
            const response = await api.get('/courses/unpublished-course');
            setCourses(response.data.courses)
        } catch (error) {
            setCourses([])
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUnpublishedCourses();
    },[])

    return {
        courses,
        loading
    }
}