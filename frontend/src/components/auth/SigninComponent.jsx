import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {toast} from 'sonner'
import { useSignin } from "../../hooks/user/useSignin"
import { useAuth } from "../../context/user/useAuth"

export function SigninComponents() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signin, loading} = useSignin();
  const {isAuthenticated, sessionLoading} = useAuth();
  const navigate = useNavigate()

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/dashboard')
    }
  },[isAuthenticated, navigate])

  if(sessionLoading){
    return <div>
      Loading...
    </div>
  }

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      await signin({email: email.trim(), password});
      toast.success("User logged in successfully")
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signin failed");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link to="/signup">Sign Up</Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email} 
                placeholder="m@example.com"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input autoComplete="password" id="password" value={password} type="password" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="flex-col gap-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Signin"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
