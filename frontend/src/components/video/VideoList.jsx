import { useVideos } from '../../hooks/video/useVideos';
import VideoComponent from './VideoComponent';

export default function VideoList({lecture}) {
  const {videos, loading} = useVideos(lecture._id)

  if(loading){
    return <div>
        Loading...
    </div>
  }

  return (
    <div>
        {videos?.map((v)=>(
          <VideoComponent video={v} key={v._id}/>
        ))}
    </div>
  )
}
