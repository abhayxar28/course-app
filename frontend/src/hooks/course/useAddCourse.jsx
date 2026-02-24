import { useState } from "react";
import { api } from "../../api/axios"

const addCourseApi = async(data)=>(await api.post('/courses/create-course', data)).data

export function useAddCourse(){
    const [loading, setLoading] = useState(false);
    
    const createCourse = async(data)=>{
        try {
            setLoading(true);
            await addCourseApi(data);
            return true
        } catch (error) {
            throw error;
        }finally{
            setLoading(false)
        }
    }
    return{createCourse, loading}
}