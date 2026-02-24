import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "../../api/axios"

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [courseId, setCourseId] = useState(null)

  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!sessionId) {
          toast.error("SessionId missing")
          navigate("/dashboard")
          return
        }

        const res = await api.post("/stripe/verify-session", {
          sessionId,
        })

        if (res.data.success) {
          setCourseId(res.data.courseId)
          toast.success("Cousre Purchased")
        } else {
          navigate("/dashboard")
        }
      } catch (err) {
        navigate("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    verifyPayment()
  }, [sessionId, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-6">
      <CheckCircle className="h-16 w-16 text-green-600" />

      <h1 className="text-3xl font-bold">
        Payment Successful 🎉
      </h1>

      <p className="text-muted-foreground">
        Your course has been unlocked.
      </p>

      <Button onClick={() => navigate(`/courses/${courseId}/watch`)}>
        Start Learning
      </Button>
    </div>
  )
}
