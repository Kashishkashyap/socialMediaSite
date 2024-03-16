import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/v1/api/users/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                navigate('/');
            } else {
                alert('Sign in failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container shadow p-4 bg-light">
            <div className="row mt-5">
                <div className="col-md-6 text-center">
                    <img src="login.jpg" alt="Image" className="img-fluid" />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <div className="w-75 mx-auto">
                        <h2 className="text-center mb-4 text-primary">Sign In</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label text-dark">Email address</label>
                                <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label text-dark">Password</label>
                                <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} className="form-control" required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
