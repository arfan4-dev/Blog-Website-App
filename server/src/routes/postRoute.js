import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/post.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/posts', getAllPosts); // Public route
router.get('/posts/:id', getPostById); // Public route

router.post('/createPosts', protect, authorize('admin'), createPost); // Admin-only route
router.put('/updatePosts/:id', protect, authorize('admin'), updatePost); // Admin-only route
router.delete('/deletePosts/:id', protect, authorize('admin'), deletePost); // Admin-only route

export default router;
