import { Separator } from "@/components/ui/separator"
import { NavLink } from "react-router-dom"
import { BookOpen, PlusCircle, FileWarning } from "lucide-react"

export default function InstructorSidebar() {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors
     ${
       isActive
         ? "bg-primary text-white"
         : "text-muted-foreground hover:bg-accent hover:text-foreground"
     }`

  return (
    <div className="w-64 h-full bg-background p-6 flex flex-col gap-6">
      
      <div>
        <h2 className="text-lg font-semibold">Instructor Panel</h2>
        <p className="text-xs text-muted-foreground">
          Manage your courses
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <NavLink to="/instructor/courses" className={linkStyle}>
          <BookOpen size={18} />
          Courses
        </NavLink>

        <NavLink to="/instructor/add-courses" className={linkStyle}>
          <PlusCircle size={18} />
          Add Course
        </NavLink>

        <NavLink to="/instructor/unpublished" className={linkStyle}>
          <FileWarning size={18} />
          Unpublished
        </NavLink>
      </div>

    </div>
  )
}
