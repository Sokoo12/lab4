import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../pages/AuthProvider';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null); // For the avatar image
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const { register } = useContext(AuthContext);

  const generateUserId = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const ids = existingUsers.map(user => user.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1; // Incrementing the maximum ID
  };

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword || !image) {
      setMessage('Please fill in all fields and upload an avatar.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }

    const userId = generateUserId(); // Generate user ID
    const user = {
      id: userId,
      username,
      email,
      password,
      image,
    };

    const isRegistered = register(username, email, password, image); // Pass the avatar image
    if (isRegistered) {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      existingUsers.push(user);
      localStorage.setItem('users', JSON.stringify(existingUsers)); // Save user data to local storage

      setMessage('Successfully registered! Redirecting to login page...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMessage('Username already exists.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
