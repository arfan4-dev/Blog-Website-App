import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const UpdatePost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/posts/${id}`);
            const post = response.data;
            setTitle(post.title);
            setContent(post.content);
            setAuthor(post.author);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setMessage('Unauthorized. Please log in as an admin.');
                return;
            }

            const config = {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            };

            await axios.put(`http://localhost:4000/api/v1/updatePosts/${id}`, {
                title,
                content,
                author,
            }, config);

            setMessage('Post updated successfully!');
            navigate('/posts');
        } catch (error) {
            console.error('Error updating post:', error);
            setMessage('Failed to update post. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Update Post</h1>
                {message && <div className="mb-4 text-red-500">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            rows="6"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Update Post
                    </button>
                </form>
            </div>
        </div>

    );
};

export default UpdatePost;
