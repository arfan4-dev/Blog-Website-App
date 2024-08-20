import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../common/Loader'; // Import the Loading component
import Navbar from '../common/Navbar';

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // State to track loading
    const navigate = useNavigate();

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true); // Start loading
            setErrorMessage(''); // Clear previous error message
            try {
                const response = await axios.post('http://localhost:4000/api/v1/auth/login', values);
                localStorage.setItem('token', response.data.token); // Save token to localStorage
                localStorage.setItem('role', response.data.user.role);
                navigate('/posts');
                console.log(response.data);
            } catch (error) {
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.message || 'Login failed. Please check your credentials.');
                } else {
                    setErrorMessage('Login failed. Please try again.');
                }
            } finally {
                setLoading(false); // Stop loading
            }
        },
    });

    return (
        <div className='h-screen overflow-hidden'>
            <header className="bg-gray-800 py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <Link to="/" className="text-white text-2xl font-bold">
                        Blog Website
                    </Link>

                </div>
            </header>
            <div className="mt-14">

                <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>} {/* Display error messages */}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...formik.getFieldProps('email')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 mt-1 text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...formik.getFieldProps('password')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 mt-1 text-sm">{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-2 px-4 bg-gray-800 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? (
                                <Loading />
                            ) : (
                                'Login'
                            )}
                        </button>

                        <p className="mt-4 text-center text-gray-700">
                            Not Registered Yet?{' '}
                            <Link to="/" className="text-gray-800 hover:text-indigo-800 font-semibold">
                                Register here
                            </Link>
                        </p>                </form>

                </div>


            </div>

        </div>

    );
};
export default LoginForm;
