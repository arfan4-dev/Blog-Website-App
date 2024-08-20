import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [message, setMessage] = useState('');


    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/posts/${id}`);
            setPost({ data: response.data.data });
        } catch (error) {
            console.error('Error fetching post:', error);
            setMessage('Failed to fetch the post. Please try again.');
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-4">{post.data.title}</h1>
                <p className="text-gray-700 mb-4">{post.data.content}</p>
                <p className="text-gray-500">Author: {post.data.author}</p>
                {message && <div className="mt-4 text-red-500">{message}</div>}
            </div>
        </div>

    );
};

export default SinglePost;
