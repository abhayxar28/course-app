import express from "express";
import { allUser, authenticateUser, createUserAccount, deleteUser, getCurrentUserProfile, signOutUser, updateUserProfile } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/signup', upload.single("avatar"),createUserAccount);
router.post('/login', authenticateUser);
router.post('/signout', isAuthenticated, signOutUser);
router.get('/profile', isAuthenticated, getCurrentUserProfile)
router.patch('/update', isAuthenticated, upload.single("avatar"), updateUserProfile)
router.delete('/delete', isAuthenticated, deleteUser);
router.get("/all", allUser);

export default router;