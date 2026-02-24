import { Outlet } from "react-router-dom";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";

export default function Instructor() {
  return (
    <div className="grid grid-cols-5 min-h-[calc(100vh-85px)]">
      <div className="col-span-1 border-r">
        <InstructorSidebar />
      </div>
      <div className="col-span-4 p-6">
        <Outlet />
      </div>
    </div>
  );
}
