import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PostsList from './pages/client/PostsList';
import CreatePost from './pages/client/CreatePost';
import UpdatePost from './pages/client/UpdatePost';
import SinglePost from './pages/client/SinglePost ';
import ProtectedRoute from './components/auth/ProtectedRoute';
const App = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute element={<PostsList />} />
            }
          />
          <Route
            path="/createPost"
            element={
              <ProtectedRoute element={<CreatePost />} />
            }
          />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
