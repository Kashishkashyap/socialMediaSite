import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import ViewUser from './Components/ViewUser';
import UpdateUser from './Components/UpdateUser';
import DeleteUser from './Components/DeleteUser';
import CreatePost from './Components/Posts/CreatePost';
import ViewPost from './Components/Posts/ViewPost';
import UpdatePost from './Components/Posts/UpdatePost';
import DeletePost from './Components/Posts/DeletePost';

// const PrivateRoute = ({ element, ...rest }) => {
//   const isAuthenticated = !!localStorage.getItem('token');
//   return isAuthenticated ? element : <Navigate to="/login" />;
// };
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view" element={<ViewUser />} />
        <Route path="/view/update" element={<UpdateUser />} />
        <Route path="/view/delete" element={<DeleteUser />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/view/:id" element={<ViewPost />} />
        <Route path="/post/update/:id" element={<UpdatePost />} />
        <Route path="/post/delete/:id" element={<DeletePost />} />
        {/* <Route path="/products" element={<PrivateRoute element={<Products />} />} />
        <Route path="/" element={<PrivateRoute element={<Navigate to="/products" />} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
