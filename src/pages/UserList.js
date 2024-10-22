import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../pages/AuthProvider'; // Import AuthContext

const UserList = () => {
  const { users } = useContext(AuthContext); // Access users from context

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg p-8 shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Бүртгэлтэй хэрэглэгчид</h2>
      {users.length === 0 ? (
        <p className="text-center text-gray-500 italic">Одоогоор бүртгэлтэй хэрэглэгч байхгүй байна.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user, index) => (
            <li key={index} className="flex items-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition-shadow duration-300 ease-in-out">
              {user.image && (
                <img
                  src={user.image}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full border-2 border-purple-500 mr-4"
                />
              )}
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-800">
                  <strong>Хэрэглэгчийн нэр:</strong> {user.username}
                </p>
                <p className="text-gray-600">
                  <strong>И-мэйл хаяг:</strong> {user.email}
                </p>
              </div>
              <Link
                to={`/users/${user.uid}/places`} // Link to user's places
                className="text-blue-500 hover:underline"
              >
                Газруудыг харах
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
