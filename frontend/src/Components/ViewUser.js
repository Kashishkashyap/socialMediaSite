import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const id = localStorage.getItem("userId");
                const response = await fetch(`http://localhost:5000/v1/api/users/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "token": localStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUserProfile();
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <img src={user.profilePicture} className="card-img-top img-fluid" alt="Profile" style={{ maxHeight: "300px" }} />
                        <div className="card-body">

                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">User Profile</h2>
                            <h5 className="card-title"><strong>Username:</strong> {user.username}</h5>
                            <p className="card-text"><strong>Email:</strong> {user.email}</p>
                            <p className="card-text"><strong>Bio:</strong> {user.bio}</p>
                            <Link to={`/view/update`} state={{ user }} className="btn btn-primary me-3">Update Profile</Link>
                            <Link to={`/view/delete`} state={{ user }} className="btn btn-danger">Delete Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
