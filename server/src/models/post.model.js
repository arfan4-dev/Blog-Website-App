import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Post = mongoose.model("Post", postSchema);

export default Post