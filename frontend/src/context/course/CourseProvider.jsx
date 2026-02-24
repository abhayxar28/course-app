import { useState } from "react"
import { CourseContext } from "./course-context"

export function CourseProvider({ children }) {
  const [course, setCourse] = useState({})

  return (
    <CourseContext.Provider value={{ course, setCourse }}>
      {children}
    </CourseContext.Provider>
  )
}
