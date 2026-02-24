import { CourseCard } from "./CourseCard";
import { useCourses } from "../../hooks/course/useCourses";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState, useMemo, useContext, useEffect } from "react";
import { PageContext } from "../../context/page/page-context";
import { CategoryContext } from "../../context/category/category-context";

export default function CourseList() {
  const { page, setPage } = useContext(PageContext);
  const { category, setCategory } = useContext(CategoryContext);

  const { loading, courses = [] } = useCourses(page, category);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 20, behavior: "smooth" });
  }, [page]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [courses, filter]);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Upgrade your skills with our curated learning paths
        </p>
      </div>

      <div className="space-y-6">

        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10 h-11 rounded-full shadow-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            "All",
            "Web Development",
            "AI/ML",
            "Data Science",
            "Programming",
            "Data Analytics",
          ].map((cat) => (
            <Badge
              key={cat}
              variant={category === cat ? "default" : "outline"}
              className="cursor-pointer rounded-full px-5 py-2 transition"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center text-muted-foreground py-20">
          Loading courses...
        </div>
      )}

      {!loading && filteredCourses.length === 0 && (
        <div className="text-center text-muted-foreground py-20">
          No courses found
        </div>
      )}

      {!loading && filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
