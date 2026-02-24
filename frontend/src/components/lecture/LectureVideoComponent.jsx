
import {PlayCircle} from "lucide-react"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LectureEditDialog } from "../lecture/update/LectureEditDialog"
import LectureAlertDelete from "./delete/LectureAlertDelete";
import EditVideoList from "../video/EditVideoList";


export default function LectureVideoComponent({course, lecture}) {
  return (
    <AccordionItem key={lecture._id} value={`lecture-${lecture._id}`} className="border-none">
        <div className="flex items-center justify-between px-4 py-2">
            <AccordionTrigger className="flex-1 text-left text-sm font-medium hover:no-underline">
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <PlayCircle className="h-4 w-4 text-muted-foreground" />
                        {lecture.title}
                    </div>

                    {lecture.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                            {(lecture.description.slice(0,100))}...
                        </p>
                    )}
                </div>
            </AccordionTrigger>

        <div className="ml-2 flex gap-1">
            <LectureEditDialog course={course} lecture={lecture}/>
            <LectureAlertDelete course={course} lecture={lecture}/>

        </div>
        </div>

        <AccordionContent className="space-y-2 px-6 pb-3">
            <EditVideoList lecture={lecture}/>
        </AccordionContent>
    </AccordionItem>
  )
}


