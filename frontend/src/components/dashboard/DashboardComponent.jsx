import { useContext } from 'react';
import CourseList from '../course/CourseList'
import PageComponent from '../page/pageComponent'
import { PageContext } from '../../context/page/page-context';
import { useCourses } from '../../hooks/course/useCourses';
import { CategoryContext } from '../../context/category/category-context';

export default function DashboardComponent() {
  const { page } = useContext(PageContext);
  const {category} = useContext(CategoryContext)
  const { totalPages,courses } = useCourses(page, category);
  return (
    <div className='flex flex-col'>
        <div>
          <CourseList/>
        </div>

        {courses.length !== 0 && (
          <div className='my-10'>
            <PageComponent totalPages={totalPages}/>
          </div>
        )}
    </div>
  )
}
