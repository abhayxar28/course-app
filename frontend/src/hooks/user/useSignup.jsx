import { useState } from "react"
import { api } from "../../api/axios";

const signupApi = async(data)=>(await api.post("/users/signup", data)).data

export const useSignup = ()=>{
    const [loading, setLoading] = useState(false);

    const signup = async(data)=>{
        try {
            setLoading(true);
            await signupApi(data);
            return true
        } catch (error) {
            throw error;
        }finally{
            setLoading(false)
        }
    }

    return {signup, loading}
}