import { useContext } from "react"
import { AuthContext } from "./SessionContext"

export const useAuth = ()=>{
    const {role, isAuthenticated, sessionLoading} = useContext(AuthContext)

    return {
        role,
        isAuthenticated,
        sessionLoading
    }
}