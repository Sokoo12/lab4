import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './pages/UserList';
import UserPlaces from './components/UserPlaces';
import AddPlace from './components/AddPlaces';
import  AuthProvider  from './pages/AuthProvider'; 
import EditPlace from './components/EditPlace';
import ViewUserPlaces from './components/ViewUserPlace';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="container mx-auto p-4">
                    <nav className="mb-4">
                        <Link to="/register">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Register</button>
                        </Link>
                        <Link to="/login">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ml-4">Login</button>
                        </Link>
                        <Link to="/users">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 ml-4">User List</button>
                        </Link>
                    </nav>

                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/user/:userId/add" element={<AddPlace />} />
                        <Route path="/user/:userId/places" element={<UserPlaces />} />
                        <Route path="/user/:userId/edit/:placeId" element={<EditPlace />} />
                        <Route path="/users/:id/places" element={<ViewUserPlaces />} />
                        {/* Add other routes as necessary */}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
