import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const EditPlace = () => {
    const { userId, placeId } = useParams();
    const { state } = useLocation();
    const [location, setLocation] = useState({ lat: '', lng: '' });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.place) {
            const { title, description, coordinates, image } = state.place;
            setTitle(title);
            setDescription(description);
            setLocation(coordinates);
            setImage(image);
        }
    }, [state.place]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocation((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedLocation = {
            id: placeId, // Use the same ID
            title,
            description,
            coordinates: {
                lat: parseFloat(location.lat), // Ensure latitude is a float
                lng: parseFloat(location.lng), // Ensure longitude is a float
            },
            image,
            userId,
        };

        // Retrieve saved locations from localStorage
        const savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
        // Update the existing location in the array
        const updatedLocations = savedLocations.map(place =>
            place.id === placeId ? updatedLocation : place
        );

        // Save updated locations back to localStorage
        localStorage.setItem('locations', JSON.stringify(updatedLocations));
        // Navigate back to the user's places page
        navigate(`/user/${userId}/places`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Edit Place</h2>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        rows="4"
                        required
                    />
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-700">Latitude:</label>
                        <input
                            type="number"
                            name="lat"
                            value={location.lat}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            step="0.000001"
                            required
                        />
                        <label className="block mb-2 font-semibold text-gray-700">Longitude:</label>
                        <input
                            type="number"
                            name="lng"
                            value={location.lng}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            step="0.000001"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold text-gray-700">Upload Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        />
                        {image && (
                            <div className="mt-4">
                                <img src={image} alt="Preview" className="w-full h-auto rounded-lg shadow-md" />
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition duration-200 shadow-md"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPlace;
