import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserPlaces = () => {
    const { userId } = useParams(); // Get userId from route parameters
    const [places, setPlaces] = useState([]); // State to hold places
    const navigate = useNavigate();

    // Fetch places for the logged-in user
    useEffect(() => {
        const fetchPlaces = () => {
            const savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
            const userPlaces = savedLocations.filter(place => place.userId === userId); // Filter by userId
            setPlaces(userPlaces); // Set filtered places
        };

        fetchPlaces(); // Call the function
    }, [userId]); // Re-fetch when userId changes

    // Navigate to AddPlace page
    const handleAddPlace = () => {
        navigate(`/user/${userId}/add`); // Redirect to add place page
    };

    // Navigate to EditPlace page
    const handleEditPlace = (place) => {
        navigate(`/user/${userId}/edit/${place.id}`, { state: { place } }); // Pass place data to edit page
    };

    // Delete place
    const handleDeletePlace = (placeId) => {
        const savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
        const updatedLocations = savedLocations.filter(place => place.id !== placeId); // Remove place by id

        localStorage.setItem('locations', JSON.stringify(updatedLocations)); // Save updated locations
        setPlaces(updatedLocations); // Update state to reflect deleted place
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Your Places</h2>
                <button 
                    onClick={handleAddPlace} 
                    className="mb-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200 shadow-md"
                >
                    Add New Place
                </button>
                {places.length === 0 ? (
                    <p className="text-center text-gray-600">No places found. Add your first place!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {places.map((place) => (
                            <div key={place.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-2">Газрын нэр:{place.title}</h3>
                                <p className="mb-2">{place.description}</p>
                                <p className="text-sm text-gray-600">Latitude: {place.coordinates.lat}</p>
                                <p className="text-sm text-gray-600">Longitude: {place.coordinates.lng}</p>
                                {place.image && (
                                    <img 
                                        src={place.image} 
                                        alt={place.title} 
                                        className="mt-2 w-full h-auto rounded-lg shadow-md" 
                                    />
                                )}
                                <div className="flex justify-between mt-4">
                                    <button 
                                        onClick={() => handleEditPlace(place)} 
                                        className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDeletePlace(place.id)} 
                                        className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPlaces;
