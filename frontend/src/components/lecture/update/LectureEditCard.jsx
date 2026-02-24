import {
  Card,
  CardContent
} from "@/components/ui/card"
import {
  Accordion
} from "@/components/ui/accordion"

import LectureAddComponent from "../add/LectureAddComponent"
import LectureVideoComponent from "../LectureVideoComponent"
import { useLectures } from "../../../hooks/lecture/useLectures";


export default function LectureEditCard({course}) {
  const {lectures} = useLectures(course._id);
  return (
    <Card>
        <LectureAddComponent course={course} />
        <CardContent className="p-0">
            <Accordion type="multiple">
                {lectures.map((lecture) => (
                  <LectureVideoComponent course={course} lecture={lecture} key={lecture._id}/>
                ))}
            </Accordion>
        </CardContent>
    </Card>
  )
}
