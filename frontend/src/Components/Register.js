import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        bio: '',
        profilePicture: ''
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/v1/api/users/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An unexpected error occurred');
            }

            const data = await response.json();
            console.log(data);
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div className="container shadow p-4 bg-light">
            <div className="row">
                <div className="col-md-6" style={{ backgroundColor: "rgba(137,151,239,255)" }}>
                    <img src="login.jpg" alt="Registration" className="img-fluid" />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <div className="w-75 mx-auto">
                        <h2 className="text-center mb-4">Register</h2>
                        {error && <div className="text-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="form-control" required />
                                <small className="text-muted">Username should be at least 3 characters</small>
                            </div>
                            <div className="mb-3">
                                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control" required />
                                <small className="text-muted">Email should be a valid email address</small>
                            </div>
                            <div className="mb-3">
                                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="form-control" required />
                                <small className="text-muted">Password should be at least 6 characters</small>
                            </div>
                            <div className="mb-3">
                                <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="form-control"></textarea>
                                <small className="text-muted">Optional Field</small>
                            </div>
                            <div className="mb-3">
                                <input type="text" name="profilePicture" placeholder="Profile Picture URL" value={formData.profilePicture} onChange={handleChange} className="form-control" />
                                <small className="text-muted">Add Public URL to your profile picture</small>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Register;
