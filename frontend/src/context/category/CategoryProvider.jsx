import { useState } from "react"
import { CategoryContext } from "./category-context"

export function CategoryProvider({ children }) {
  const [category, setCategory] = useState("All")

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}
