import { useState } from "react";
import { LectureContext } from "./lecture-context";


export function LectureProvider({children}) {
    const [lecture, setLecture] = useState({});

    return (
        <LectureContext.Provider value={{lecture, setLecture}}>
            {children}
        </LectureContext.Provider>
    )
}
