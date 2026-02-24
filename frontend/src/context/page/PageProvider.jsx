import { useState } from "react";
import {PageContext} from './page-context';

export function PageProvider({children}) {
    const [page, setPage] = useState(1);

    return (
        <PageContext.Provider value={{page, setPage}}>
            {children}
        </PageContext.Provider>
    )
}
