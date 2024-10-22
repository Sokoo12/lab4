import React, { useState, useContext } from 'react';
import { AuthContext } from '../pages/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, currentUser } = useContext(AuthContext); // Extracting login function and currentUser from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const isSuccess = login(username, password); // Call the login function from context

    if (isSuccess) {
      setMessage('Амжилттай нэвтэрлээ!');
      
      // Null check to ensure currentUser exists before accessing id
      if (currentUser && currentUser.id) {
        const userId = currentUser.id; // Extract the user ID
        // Redirect to the user's places page
        navigate(`/user/${userId}/places`);
      } else {
        setMessage('Login successful, but user data is missing.');
      }
    } else {
      setMessage('Нэвтрэх нэр эсвэл нууц үг таарахгүй байна.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 border rounded-md mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-md mb-4"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
