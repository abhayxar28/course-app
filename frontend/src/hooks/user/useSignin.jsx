import { useState } from "react";
import { api } from "../../api/axios";

const signinApi = async (data) => (await api.post("/users/login", data)).data;

export function useSignin(){
    const [loading, setLoading] = useState(false);
    
    const signin = async({email, password}) =>{
        try {
            setLoading(true);
            await signinApi({email, password})
            return true;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {signin, loading}
}