import { useContext } from 'react'
import { Button } from "@/components/ui/button"
import { PageContext } from '../../context/page/page-context';

export default function PageComponent({totalPages}) {
  const {page, setPage} = useContext(PageContext);

  return (
    <div className='flex justify-center items-center gap-5'>
        <div>
            <Button disabled={page === 1} onClick={()=>{setPage(p => p-1);}}>
                Prev
            </Button>
        </div>
        <div>
            <Button disabled={page === totalPages} onClick={()=>{setPage(p => p+1)}}>
                Next
            </Button>
        </div>
    </div>
  )
}
