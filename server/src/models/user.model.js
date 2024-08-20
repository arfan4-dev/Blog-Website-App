import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", 'admin']
    }
})

const User = mongoose.model("User", userSchema);

export default User