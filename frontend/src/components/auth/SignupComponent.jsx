import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel } from "@/components/ui/field"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {toast} from 'sonner'
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../context/user/useAuth";
import { useSignup } from "../../hooks/user/useSignup";

export function SignupComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate()
  const {signup, loading} = useSignup()
  const {sessionLoading, isAuthenticated} = useAuth();
  
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/dashboard')
    }
  },[navigate, isAuthenticated])

  if(sessionLoading){
    return <div>
      Loading...
    </div>
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (avatar) formData.append("avatar", avatar);

      await signup(formData);
      toast.success("User created successfully")
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      setEmail("");
      setName("");
      setPassword("");
      setRole("");
      setAvatar(null)
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
        <CardAction>
          <Link
            to="/login"
            className="text-sm font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="John Doe"
                required
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Field>
                  <FieldLabel htmlFor="picture">Picture</FieldLabel>
                  <Input id="picture" type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)}/>
                </Field>
              </div>
              <div className="col-span-1 grid gap-2">
                <Label htmlFor="role">Role</Label>
                <div className="mt-2">
                  <NativeSelect id="role" onChange={(e)=>setRole(e.target.value)} value={role} required>
                    <NativeSelectOption value="">Select role</NativeSelectOption>
                    <NativeSelectOption value="student">Student</NativeSelectOption>
                    <NativeSelectOption value="instructor">Instructor</NativeSelectOption>
                  </NativeSelect>
                </div>
              </div>
            </div>
            <div className="grid gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                   {loading ? "Creating..." : "Signup"}
                </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
