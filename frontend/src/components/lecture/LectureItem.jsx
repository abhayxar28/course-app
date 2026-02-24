import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VideoList from "../video/VideoList";

export default function LectureItem({ lecture }) {
  return (
      <Accordion type="multiple" className="w-full">
          <AccordionItem value="section-1">
            <AccordionTrigger>
                {lecture.title}
            </AccordionTrigger>
            <VideoList lecture={lecture}/>
          </AccordionItem>
      </Accordion>
  )
}
