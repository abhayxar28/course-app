import { useState } from "react"
import { api } from "../../api/axios"

export function useLogout() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const logout = async () => {
    try {
      setLoading(true)
      setError(null)

      await api.post("/users/signout")
      return true
    } catch (err) {
      setError(err.response?.data || err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    logout,
    loading,
    error,
  }
}
