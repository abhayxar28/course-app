import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { useUpdateCourse } from "../../../hooks/course/useUpdateCourse";
import { toast } from "sonner";
import { CourseContext } from "../../../context/course/course-context";

export function EditCourseDialog() {
  const {course} = useContext(CourseContext)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(course?.title || "");
  const [subtitle, setSubtitle] = useState(course?.subtitle || "");
  const [description, setDescription] = useState(course?.description || "");
  const [category, setCategory] = useState(course?.category || "");
  const [levels, setLevel] = useState(course?.levels || "");
  const [price, setPrice] = useState(course?.price || 0);
  const [thumbnail, setThumbnail] = useState(null);

  const { updateCourse, loading } = useUpdateCourse();

  useEffect(() => {
    if (course) {
      setTitle(course.title || "");
      setSubtitle(course.subtitle || "");
      setDescription(course.description || "");
      setCategory(course.category || "");
      setLevel(course.levels || "");
      setPrice(course.price || 0);
      setThumbnail(null);
    }
  }, [course]);

  const reset = () => {
    setTitle(course.title || "");
    setSubtitle(course.subtitle || "");
    setDescription(course.description || "");
    setCategory(course.category || "");
    setLevel(course.levels || "");
    setPrice(course.price || 0);
    setThumbnail(null);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !levels || !subtitle || !price || price < 0) {
      toast.error("Please fill all required fields");
      return;
    }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("levels", levels);
      formData.append("price", price);
      if (thumbnail) formData.append("thumbnail", thumbnail);    


      try {
        await updateCourse(formData, course._id);
        toast.success("Course updated successfully");
        setOpen(false);
        reset();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to update course");
      }finally{
        setTitle("")
        setDescription("")
        setCategory("")
        setLevel("")
        setPrice("")
        setSubtitle("")
      }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Make changes to your course here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleUpdateCourse}>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                    <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Label>Course Thumbnail</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={price}
                  min={0}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </Field>

              <Field>
                <Label htmlFor="levels">Level</Label>
                <Select value={levels} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
