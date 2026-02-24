import { AccordionContent } from "@/components/ui/accordion";
import { useMemo } from "react";
import { durationFn } from "../../lib/duration";

export default function VideoComponent({ video }) {

  const duration = useMemo(() => {
    return durationFn(video?.duration)
  }, [video?.duration])

  return (
    <AccordionContent>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between items-center">
          <span> ▶ {video.videoTitle}</span>
          <span className="text-muted-foreground">{duration}</span>
        </li>
      </ul>
    </AccordionContent>
  );
}
