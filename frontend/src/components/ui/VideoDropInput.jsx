import { Upload } from "lucide-react"
import { useEffect, useState } from "react"

export function VideoDropInput({ onFileSelect, value }) {
  const [previewUrl, setPreviewUrl] = useState(null)

  function handleFile(file) {
    if (!file.type.startsWith("video/")) {
      alert("Only video files are allowed")
      return
    }

    onFileSelect(file)

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  useEffect(() => {
    if (!value) {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }, [value])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <label
      className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border border-dashed border-input bg-background hover:bg-accent"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) handleFile(file)
      }}
    >
      {previewUrl ? (
        <>
          <video
            src={previewUrl}
            controls
            className="h-full w-full rounded-md object-cover"
          />
          <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
            Click to replace
          </div>
        </>
      ) : (
        <>
          <Upload className="mb-2 h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag & drop video or click to upload
          </p>
        </>
      )}

      <input
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
    </label>
  )
}
