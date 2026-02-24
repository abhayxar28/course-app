import { useNavigate } from "react-router-dom"
import { useSession } from "../../hooks/user/useSession"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useLogout } from "../../hooks/user/useLogout"

export default function Navbar() {
  const navigate = useNavigate()
  const {logout} = useLogout();
  const { role, user, setUser, isAuthenticated} = useSession()

   const handleLogout = async () => {
    try {
      await logout()
      setUser(null)    
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <div
          className="text-3xl font-bold text-primary cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Coursera
        </div>

        <div className="flex items-center gap-6">

          {role === "instructor" && (
            <button
              onClick={() => navigate("/instructor/courses")}
              className="text-sm font-medium hover:text-primary transition cursor-pointer"
            >
              Courses
            </button>
          )}
          {role === "student" && (
            <button
              onClick={() => navigate("/enrolled-courses")}
              className="text-sm font-medium hover:text-primary transition cursor-pointer"
            >
              Courses
            </button>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ): (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-medium hover:text-primary transition cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-sm font-medium hover:text-primary transition cursor-pointer"
              >
                Signup
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  )
}
