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
import {useDeleteLecture} from '../../../hooks/lecture/useDeleteLecture';
import { toast } from "sonner";
import { useState } from "react";

export default function LectureAlertDelete({course, lecture}) {
    const {deleteLecture, loading, error} = useDeleteLecture({courseId: course._id, lectureId: lecture._id})

    const [open, setOpen] = useState(false);
    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    const handleDeleteLecture = async () => {
        try {
            await deleteLecture();
            toast.success("Lecture Deleted");
            setOpen(false);
        } catch (error) {
            console.error("Failed to delete course", error)
        }
    }    

    
    if (error) {
        return (
            <div className="p-6 text-sm text-destructive">
            Failed to load course. Please try again.
            </div>
        )
    }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={loading}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this Lecture?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            lecture and all its videos.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={handleDeleteLecture}
          >
            {loading ? "Deleting..." : "Yes, delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
