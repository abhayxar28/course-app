import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from 'sonner';
import {AuthProvider} from './context/user/SessionContext.jsx';
import { CourseProvider } from './context/course/CourseProvider.jsx';
import { LectureProvider } from './context/lecture/LectureProvider.jsx';
import { LecturesProvider } from './context/lecture/LecturesProvider.jsx';
import { VideosProvider } from './context/video/VideosProvider.jsx';
import { PageProvider } from './context/page/PageProvider.jsx';
import { CategoryProvider } from './context/category/CategoryProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CourseProvider>
        <PageProvider>
          <CategoryProvider>
            <LecturesProvider>
              <LectureProvider>
                <VideosProvider>
                  <App />
                  <Toaster position='top-right'/>
                </VideosProvider>
              </LectureProvider>
            </LecturesProvider>
          </CategoryProvider>
        </PageProvider>
      </CourseProvider>
    </AuthProvider>
  </StrictMode>,
)
