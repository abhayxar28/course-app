import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import upload from '../utils/multer.js';
import { createVideo, deleteVideo, getAllVideo, getVideo, updateVideo } from "../controllers/video.contoller.js";

const router = express.Router();

router.post('/:lectureId/create-video', isAuthenticated, upload.single("videoUrl"), createVideo);
router.put('/:videoId/update-video', isAuthenticated, upload.single("videoUrl"), updateVideo)
router.get('/:lectureId', isAuthenticated, getAllVideo);
router.get('/:lectureId/:videoId', isAuthenticated, getVideo)
router.delete('/:videoId/delete-video', isAuthenticated, deleteVideo)

export default router;