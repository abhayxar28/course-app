import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { createLecture, deleteLecture, getAllLectures, getLecture, updateLecture } from "../controllers/lecture.controller.js";

const router = express.Router();

router.post('/:courseId/add-lecture', isAuthenticated, createLecture);
router.get('/course/:courseId', isAuthenticated, getAllLectures);
router.get('/:lectureId', isAuthenticated, getLecture);
router.put('/:courseId/:lectureId/update-lecture', isAuthenticated, updateLecture)
router.delete('/:courseId/:lectureId', isAuthenticated, deleteLecture)

export default router;