import { useState } from "react"
import { api } from "../../api/axios"

export function usePayment() {
  const [loading, setLoading] = useState(false)

  const createPayment = async (courseId) => {
    try {
      setLoading(true)

      const response = await api.post(
        "/stripe/create-checkout-session",
        { courseId }
      )

      return response.data
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createPayment, loading }
}
