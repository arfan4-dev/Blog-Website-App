import express from 'express'
const router = express.Router();
import { register, login } from "../controllers/auth.controller.js"

// register route
router.post('/register', register)

// Login route
router.post('/login', login)

export default router;