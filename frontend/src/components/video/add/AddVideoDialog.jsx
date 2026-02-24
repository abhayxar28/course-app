import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { VideoDropInput } from "../../ui/VideoDropInput"
import { useAddVideo } from "../../../hooks/video/useAddVideo"
import { toast } from "sonner"

export function AddVideoDialog({ lecture }) {
  const { createVideo, loading, error } = useAddVideo()
  const [videoTitle, setVideoTitle] = useState("")
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null)

  const handleAddVideo = async (e) => {
    e.preventDefault()

    if (!lecture?._id) {
      alert("Lecture not found")
      return
    }

    if (!videoTitle || !videoUrl) {
      alert("Video title and file are required")
      return
    }

    const formData = new FormData()
    formData.append("videoTitle", videoTitle)
    formData.append("videoUrl", videoUrl) 

    await createVideo(lecture._id, formData)
    toast.success("Video added successfully");
    setOpen(false);
    setVideoTitle("");
  }

  if (error) return <div>Error adding video</div>

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Video
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleAddVideo}>
          <DialogHeader>
            <DialogTitle>Add Video</DialogTitle>
            <DialogDescription>
              Add video to your lecture here.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field className="mt-3">
              <Label htmlFor="videoTitle">Video Title</Label>
              <Input
                id="videoTitle"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              />
            </Field>

            <Field>
              <Label>Video File</Label>
              <VideoDropInput
                value={videoUrl}
                onFileSelect={setVideoUrl}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Video"}
          </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
