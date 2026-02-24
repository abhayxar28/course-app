import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import upload from '../utils/multer.js';
import { createCourse, deleteInstructorCourse, getAllCourse, getALLCourseByCategory, getAllInstructorCourse, getAllUnpublishedCourse, getAllUserEnrolledCourse, getCourseById, publishCourse, purchaseCourse, updateInstructorCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.post('/create-course', isAuthenticated, upload.single("thumbnail"),createCourse);
router.get('/', isAuthenticated, getAllCourse);
router.get('/enrolled-courses', isAuthenticated, getAllUserEnrolledCourse);
router.get('/instructor-course', isAuthenticated, getAllInstructorCourse);
router.get('/unpublished-course', isAuthenticated, getAllUnpublishedCourse)
router.get('/:courseId', isAuthenticated, getCourseById);
router.put('/update-course/:courseId', isAuthenticated, upload.single("thumbnail"), updateInstructorCourse);
router.delete('/delete-course/:courseId', isAuthenticated, deleteInstructorCourse);
router.post('/purchase-course/:courseId', isAuthenticated, purchaseCourse);
router.get('/category', isAuthenticated, getALLCourseByCategory)
router.post('/publish-course/:courseId', isAuthenticated, publishCourse)

export default router;