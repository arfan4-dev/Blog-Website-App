import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

// Middleware to protect routes
export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ApiError(401, "Not authorized, no token"));
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ApiError(401, "Not authorized, token failed"));
    }
};

// Middleware to authorize specific roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, `User role '${req.user.role}' is not authorized to access this route`));
        }
        next();
    };
};




































// import jwt from "jsonwebtoken";


// // verify token to access User Data
// export const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.headers["authorization"].split(" ")[1];


//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
//             if (err) {
//                 // return res.status(401).json({ message: "Invalid token", err })
//                 throw new ApiError(401, "Invalid token")

//             }

//             else {
//                 req.body.id = result.id;
//                 next();
//             }

//         })

//     } catch (error) {
//         return res.status(401).json({ message: "Invalid token" })

//     }
// }