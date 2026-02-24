import { useEffect } from "react";
import { useState } from "react"
import { api } from "../../api/axios";

export function useEnrolledCourses(){
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    const fetchCourse = async()=>{
        try {
            const response = await api.get('/courses/enrolled-courses');
            setEnrolledCourses(response.data.courses)
        } catch (error) {
            setError(error.message || "Error while fetching enrolled courses")
        }finally{
            setLoading(false);
        }
    } 

    useEffect(()=>{
        fetchCourse()
    },[])

    return{
        enrolledCourses,
        loading,
        error
    }
}