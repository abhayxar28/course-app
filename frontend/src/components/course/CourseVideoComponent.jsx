import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PlayCircle } from "lucide-react"
import { durationFn } from "../../lib/duration"

export default function CourseVideoComponent({ lectures, course }) {
  const [activeVideo, setActiveVideo] = useState(null)

  if (!lectures || lectures.length === 0) {
    return <div className="p-6">No lectures available</div>
  }

  return (
    <div className="grid min-h-screen grid-cols-1 gap-6 bg-muted/40 p-6 md:grid-cols-[3fr_1fr]">

      <div className="flex flex-col gap-6">

        <Card className="overflow-hidden border-0 shadow-none rounded-none">
          <div className="relative">
            <video
              key={activeVideo?._id}
              controls
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              autoPlay
              className="aspect-video w-full bg-black"
              src={activeVideo?.videoUrl}
            />
          </div>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {course?.category && (
                <Badge variant="secondary">{course.category}</Badge>
              )}
              {course?.level && (
                <Badge variant="outline">{course.level}</Badge>
              )}
            </div>

            <CardTitle className="text-2xl leading-tight">
              {course?.title}
            </CardTitle>

            {course?.subtitle && (
              <p className="text-sm text-muted-foreground">
                {course.subtitle}
              </p>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {activeVideo && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Now Playing
                </p>
                <p className="text-lg font-semibold">
                  {activeVideo.videoTitle}
                </p>
              </div>
            )}

            <p className="text-sm leading-relaxed text-muted-foreground">
              {course?.description}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="sticky top-6 h-fit shadow-md">
        <CardHeader className="flex items-center justify-between border-b">
          <CardTitle className="text-lg">Course Content</CardTitle>
          <Badge variant="secondary">
            {lectures.length} Lectures
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-150px)]">
            <Accordion type="single" collapsible>
              {lectures.map((lecture, index) => (
                <AccordionItem
                  key={lecture._id}
                  value={`lecture-${index}`}
                >
                  <AccordionTrigger className="px-4 text-sm font-medium hover:no-underline">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4 text-muted-foreground" />
                      {lecture.title}
                    </div>
                  </AccordionTrigger>

                  {lecture.video.map((video) => {
                    const isActive = activeVideo?._id === video._id
                    const duration = durationFn(video?.duration)

                    return (
                      <AccordionContent
                        key={video._id}
                        className="px-6 py-2"
                      >
                        <button
                          onClick={() => setActiveVideo(video)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition
                            ${
                              isActive
                                ? "bg-primary/10 text-primary font-semibold"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }
                          `}
                        >
                          <span className="flex items-center gap-2">
                            ▶ {video.videoTitle}
                          </span>
                          <span className="text-xs">
                            {duration}
                          </span>
                        </button>
                      </AccordionContent>
                    )
                  })}
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>

    </div>
  )
}
