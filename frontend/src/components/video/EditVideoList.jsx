import { AddVideoDialog } from "./add/AddVideoDialog"
import EditVideoComponent from "./EditVideoComponent"
import {useVideos} from '../../hooks/video/useVideos';

export default function EditVideoList({lecture}) {
  const {videos, loading} = useVideos(lecture._id)

  if(loading){
    return (
      <div>Loading...</div>
    )
  }

  return (  
    <div>
        {videos?.map((video) => (
          <EditVideoComponent video={video} key={video._id} lecture={lecture}/>
        ))}

        <AddVideoDialog lecture={lecture}/>
    </div>
  )
}
