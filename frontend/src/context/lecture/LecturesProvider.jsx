import { useState } from "react";
import {LecturesContext} from './lectures-context';

export function LecturesProvider({children}) {
    const [lectures, setLectures] = useState([]);

    return (
        <LecturesContext.Provider value={{lectures, setLectures}}>
            {children}
        </LecturesContext.Provider>
    )
}
