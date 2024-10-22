// AuthProvider.js
import React, { createContext, useState } from 'react';


export const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const register = (username, email, password, image) => {
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return false; // Username already exists
    }
    const newUser = {
      id: Date.now(), // Generate a unique ID based on timestamp
      username,
      email,
      password,
      image,
      places: [], // Initialize with an empty array for places
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save users to local storage
    return true;
  };

  const login = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user)); // Save current user to local storage
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ users, currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthProvider as default
export default AuthProvider;
