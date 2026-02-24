
import {
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Layers} from "lucide-react"
import { AddLectureDialog } from "./AddLectureDialog";


export default function LectureAddComponent({course}) {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Lectures
        </CardTitle>
        <AddLectureDialog course={course} />
    </CardHeader>
  )
}
