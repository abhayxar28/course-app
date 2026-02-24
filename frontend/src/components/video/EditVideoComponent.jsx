import { Video } from "lucide-react"
import { durationFn } from "../../lib/duration"
import { UpdateVideoDialog } from "./update/UpdateVideoDialog"
import VideoAlertDelete from "./delete/VideoAlertDelete"


export default function EditVideoComponent({video, lecture}) {
  const duration = durationFn(video?.duration)  
  return (
    <div>
        <div
            key={video?._id}
            className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2"
        >
            <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-muted-foreground" />
                <div>
                    <p className="text-sm">{video?.videoTitle}</p>
                    <p className="text-xs text-muted-foreground">{duration}</p>
                </div>
            </div>
    
            <div className="flex gap-1">
                <UpdateVideoDialog video={video} lecture={lecture}/>
                <VideoAlertDelete video={video}/>
            </div>
        </div>

    </div>
  )
}
