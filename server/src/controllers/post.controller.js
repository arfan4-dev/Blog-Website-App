import Post from '../models/post.model.js';
import { ApiError } from '../utils/ApiError.js';

// Retrieve all blog posts
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        next(error);
    }
};

// Retrieve a single blog post by ID
export const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new ApiError(404, "Post not found");
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        next(error);
    }
};

// Create a new blog post (restricted to 'admin' role)
export const createPost = async (req, res, next) => {
    try {
        // Assuming you have middleware to verify the user's role
        if (req.user.role !== 'admin') {
            throw new ApiError(403, "Access denied");
        }

        const { title, content, author } = req.body;

        const newPost = await Post.create({ title, content, author });
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        next(error);
    }
};

// Update an existing blog post by ID (restricted to 'admin' role)
export const updatePost = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            throw new ApiError(403, "Access denied");
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPost) {
            throw new ApiError(404, "Post not found");
        }
        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        next(error);
    }
};

// Delete a blog post by ID (restricted to 'admin' role)
export const deletePost = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            throw new ApiError(403, "Access denied");
        }

        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            throw new ApiError(404, "Post not found");
        }
        res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        next(error);
    }
};
