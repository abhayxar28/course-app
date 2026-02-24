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
import { VideoDropInput } from "../../ui/VideoDropInput"
import { useUpdateVideo } from "../../../hooks/video/useUpdateVideo"
import { Pencil } from "lucide-react"
import { toast } from "sonner"

export function UpdateVideoDialog({ video }) {
  const { updateVideo, loading, error } = useUpdateVideo()
  const [open, setOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState(video?.videoTitle || "")
  const [videoFile, setVideoFile] = useState(null)

  const handleUpdateVideo = async (e) => {
    e.preventDefault()
    
    if (!video?._id) {
      toast.error("Video not found")
      return
    }
    
    if (!videoTitle && !videoFile) {
      toast.error("Nothing to update")
      return
    }
    
    const formData = new FormData()
    
    if (videoTitle) {
      formData.append("videoTitle", videoTitle)
    }
    
    if (videoFile) {
      formData.append("videoUrl", videoFile)
    }
    
    try {
      await updateVideo(video._id, formData)
      toast.success("Video updated successfully")
      setOpen(false);
    } catch {
      toast.error("Failed to update video")
    }
  }

  if (error) return <div>Error updating video</div>

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleUpdateVideo}>
          <DialogHeader>
            <DialogTitle>Update Video</DialogTitle>
            <DialogDescription>
              Update video details or replace the video file.
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
              <Label>Replace Video File</Label>
              <VideoDropInput
                value={videoFile}
                onFileSelect={setVideoFile}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Video"}
          </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
