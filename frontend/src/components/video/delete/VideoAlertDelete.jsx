import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useDeleteVideo } from "../../../hooks/video/useDeleteVideo"
import { toast } from "sonner"
import { useState } from "react"

export default function VideoAlertDelete({ video }) {
  const [open, setOpen] = useState(false);
  const { deleteVideo, loading } = useDeleteVideo(video._id);

  const handleDelete = async () => {
    try {
      await deleteVideo(video._id)
      toast.success("Video deleted successfully")
      setOpen(false);
    } catch {
      toast.error("Failed to delete video")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-destructive"
          disabled={loading}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Delete this video?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the video.
            </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>
                Cancel
            </AlertDialogCancel>

            <AlertDialogAction
                asChild
            >
                <Button
                    onClick={handleDelete}
                    disabled={loading}
                    className="text-white bg-gray-900 hover:bg-gray-950 cursor-pointer"
                >
                    {loading ? "Deleting..." : "Yes, delete"}
                </Button>
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
