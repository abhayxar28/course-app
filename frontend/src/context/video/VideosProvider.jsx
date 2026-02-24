import { useState } from "react";
import { VideosContext } from "./videos-context";


export function VideosProvider({children}){
    const [videos, setVideos] = useState([]);
    return (
        <VideosContext.Provider value={{videos, setVideos}}>
            {children}
        </VideosContext.Provider>
    )
}