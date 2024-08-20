import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("role"))
    const navigate = useNavigate();


    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            // Retrieve the token from localStorage
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

            await axios.delete(`http://localhost:4000/api/v1/deletePosts/${postId}`, config);
            setMessage('Post deleted successfully.');
            fetchPosts(); // Refresh the list of posts after deletion
        } catch (error) {
            console.error('Error deleting post:', error);
            setMessage('Failed to delete post. Please try again.');
        }
    };

    const handleUpdate = (postId) => {
        navigate(`/update-post/${postId}`);
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-2xl mx-auto p-6 ">

                <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
                {message && <div className="mb-4 text-red-500 ">{message}</div>}
                {posts?.data?.length > 0 ? (
                    posts.data.map((post) => (
                        <div key={post._id} className="mb-6 bg-white shadow-md rounded-lg p-5 ">
                            <Link to={`/posts/${post._id}`}>
                                <h2 className="text-xl font-bold hover:text-slate-500">
                                    {post.title}
                                </h2></Link>
                            <p className="text-gray-700 ">{post.content.substring(0, 100)} more... </p>

                            <p className="text-gray-500">Author: {post.author}</p>
                            {
                                isAdmin === 'admin' && <div> <div className="mt-4">
                                    <button
                                        onClick={() => handleUpdate(post._id)}
                                        className="mr-2 bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
                                    >
                                        Delete
                                    </button>
                                </div>

                                </div>
                            }



                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>

    );
};

export default PostsList;
