import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export function useInstructorCourses(){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInstructorCourses = async()=>{
        try {
            const response = await api.get('/courses/instructor-course');
            setCourses(response.data.courses)
        } catch (error) {
            setCourses([])
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchInstructorCourses();
    },[])

    return {
        courses,
        loading
    }
}