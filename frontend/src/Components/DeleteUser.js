import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DeleteUser = () => {
    const { state: { user } } = useLocation();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const id = user._id;
            const response = await fetch(`http://localhost:5000/v1/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    "token": localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete profile');
            }
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Delete Profile</h2>
                            <p className="card-text">Are you sure you want to delete your profile?</p>
                            <button onClick={handleDelete} className="btn btn-danger">Delete Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;
