import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const { state: { user } } = useLocation();
    const [formData, setFormData] = useState({ bio: user.bio, profilePicture: user.profilePicture });
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const id = user._id;
            const response = await fetch(`http://localhost:5000/v1/api/users/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "token": localStorage.getItem('token')
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            const updatedUser = await response.json();
            navigate('/view')
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>User Profile</h2>
            <p className="mb-3">Update your profile information:</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="bio" className="form-label">Bio</label>
                    <input type="text" name="bio" id="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="profilePicture" className="form-label">Profile Picture URL</label>
                    <input type="url" name="profilePicture" id="profilePicture" placeholder="Profile Picture URL" value={formData.profilePicture} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
        </div>


    );
};

export default UpdateUser;
