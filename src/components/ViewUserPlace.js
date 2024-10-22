import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewUserPlaces = () => {
  const { uid } = useParams(); // Get the user ID from the URL
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPlaces = () => {
      const savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
      const userLocations = savedLocations.filter(location => location.userEmail === uid); // Adjust this based on how you store user data
      setLocations(userLocations);
      setLoading(false);
    };

    fetchUserPlaces();
  }, [uid]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading user places...</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Places for User {uid}</h2>
      {locations.length === 0 ? (
        <p className="text-center text-gray-500 italic">No places available for this user.</p>
      ) : (
        <ul className="space-y-4">
          {locations.map((location) => (
            <li key={location.id} className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition-shadow duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-gray-800">{location.title}</h3>
              <p className="text-gray-600">{location.description}</p>
              <p><strong>Address:</strong> {location.address}</p>
              {location.coordinates && location.coordinates.lat && location.coordinates.lng ? (
                <p><strong>Coordinates:</strong> ({location.coordinates.lat}, {location.coordinates.lng})</p>
              ) : (
                <p><strong>Coordinates:</strong> Not available</p>
              )}
              {location.image && (
                <img className="w-full h-48 object-cover rounded mt-2" src={location.image} alt={`Location: ${location.title}`} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewUserPlaces;
