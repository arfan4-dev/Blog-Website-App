import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

// Register a new user
const register = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        // Validate input fields
        if (!email || !password || !role) {
            throw new ApiError(400, "Please fill in all fields");
        }

        // Check if user already exists with the provided email
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            throw new ApiError(400, "Email already exists");
        }

        // Hash the user's password before storing it in the database
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user with hashed password
        const createUser = await User.create({ email, password: hashPassword, role });

        // Send success response with created user data
        return res.status(201).json({
            message: "User created successfully",
            data: createUser,
            success: true
        });

    } catch (error) {
        // Handle any ApiError thrown during the process
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: error.success,
                errors: error.errors,
            });
        }
        // Forward any other errors to the next error-handling middleware
        next(error);
    }
};

// Login an existing user
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            throw new ApiError(400, "Please fill in all fields");
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(400, "User does not exist");
        }

        // Compare provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new ApiError(400, "Incorrect password");
        }

        // Generate JWT token for the user
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

        // Send success response with the generated token and user data
        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token: token,
            user
        });

    } catch (error) {
        // Handle any ApiError thrown during the process
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: error.success,
                errors: error.errors,
            });
        }
        // Forward any other errors to the next error-handling middleware
        next(error);
    }
};

export { register, login };
