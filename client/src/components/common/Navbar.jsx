import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('role'));
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("role"))
    // Function to check token and update isAuthenticated state
    const checkAuthentication = () => {
        const role = localStorage.getItem('role');
        if (role) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    // Run this only once when the component mounts
    useEffect(() => {
        checkAuthentication();
    }, [isAuthenticated]); // Empty dependency array ensures this runs only once

    const handleLogout = () => {
        localStorage.removeItem('token'); localStorage.removeItem('role');
        setIsAuthenticated(!isAuthenticated);
        navigate('/login'); // Redirect to login after logout
    };


    console.log("isAuthenticated:", isAuthenticated);

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                            <svg
                                className="hidden h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold">  Blog Website</h1>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                            {/* Render links based on authentication status */}

                            {
                                isAuthenticated && <>
                                    <Link to="/posts" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Posts
                                    </Link>
                                    {
                                        isAdmin === 'admin' && <Link to="/createPost" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Create Post
                                        </Link>
                                    }

                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div className="sm:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {
                        isAuthenticated && <>
                            <Link to="/posts" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Posts
                            </Link>
                            <Link to="/createPost" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Create Post
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Logout
                            </button>
                        </>
                    }

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
