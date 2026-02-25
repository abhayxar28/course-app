import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/layouts/ProtectedRoute'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'
import MainLayout from './components/layouts/MainLayout';
import Landing from './pages/landing/Landing'
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/user/Profile'
import EnrolledCourses from './pages/course/EnrolledCourses'
import CourseEdit from './pages/course/CourseEdit'
import CourseVideoPage from './pages/course/CourseVideoPage'
import Success from './pages/payment/Success'
import Cancel from './pages/payment/Cancel'
import InstructorLayout from './components/layouts/InstructorLayout'
import InstructorCourses from './pages/Instructor/InstructorCourses'
import AddCourse from './pages/Instructor/AddCourse'
import Course from './pages/course/Course'
import UnpublishedCourses from './pages/Instructor/UnpublishedCourses'

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={< Signin/> }/>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route
            element={<ProtectedRoute />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="/payment/success" element={<Success />} />
            <Route path="/payment/cancel" element={<Cancel />} />

            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/courses/:courseId/watch" element={<CourseVideoPage />} />
          </Route>

          <Route
            element={<ProtectedRoute role="instructor" />}
          >
            <Route path="/instructor" element={<InstructorLayout />}>
              <Route path="courses" element={<InstructorCourses />} />
              <Route path="add-courses" element={<AddCourse />} />
              <Route path="unpublished" element={<UnpublishedCourses />} />
            </Route>
            <Route path="/courses/:courseId/edit" element={<CourseEdit />} />

          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
