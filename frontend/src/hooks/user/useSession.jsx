import { useEffect, useState } from "react";
import { api } from "../../api/axios";

export function useSession() {
  const [user, setUser] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await api.get("/users/profile")
        setUser(response.data.user);
        setRole(response.data.user.role);
      } catch (error) {
        setUser(null);
        setRole(null)
      } finally {
        setSessionLoading(false);
      }
    };

    fetchSession();
  }, []);

  return {
    role,
    user,
    setUser,
    isAuthenticated: !!user,
    sessionLoading
  };
}
