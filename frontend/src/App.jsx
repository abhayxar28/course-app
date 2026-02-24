import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from './components/layouts/ProtectedRoute'
import LoadingComponent from "./components/ui/loading";

const Signup = lazy(() => import("./pages/auth/Signup"));
const Signin = lazy(() => import("./pages/auth/Signin"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Landing = lazy(() => import("./pages/landing/Landing"));
const Profile = lazy(() => import("./pages/user/Profile"));
const EnrolledCourses = lazy(() => import("./pages/course/EnrolledCourses"));
const Success = lazy(() => import("./pages/payment/Success"));
const Cancel = lazy(() => import("./pages/payment/Cancel"));
const Course = lazy(() => import("./pages/course/Course"));
const CourseVideoPage = lazy(() => import("./pages/course/CourseVideoPage"));
const CourseEdit = lazy(() => import("./pages/course/CourseEdit"));

const AddCourse = lazy(() => import("./pages/Instructor/AddCourse"));
const UnpublishedCourses = lazy(() => import("./pages/Instructor/UnpublishedCourses"));
const InstructorCourses = lazy(() => import("./pages/Instructor/InstructorCourses"));

const MainLayout = lazy(() => import("./components/layouts/MainLayout"));
const InstructorLayout = lazy(() => import("./components/layouts/InstructorLayout"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div><LoadingComponent/></div>}>
        <Routes>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />

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
      </Suspense>
    </Router>
  );
}

export default App;
