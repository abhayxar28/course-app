import { createContext } from "react";
import { useSession } from "../../hooks/user/useSession";

export const AuthContext = createContext(null);

export function AuthProvider({children}){
    const {role, sessionLoading, isAuthenticated} = useSession();

    return(
        <AuthContext.Provider value={{role, isAuthenticated, sessionLoading}}>
            {children}
        </AuthContext.Provider>
    )
}