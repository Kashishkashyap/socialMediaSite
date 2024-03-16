import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [formData, setFormData] = useState({ title: '', description: '', image: '' });
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/v1/api/posts/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            const postData = await response.json();
            const postId = postData._id;

            navigate(`/post/view/${postId}`);
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
                            <h2 className="card-title">Create New Post</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" id="title" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea id="description" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-control" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image URL</label>
                                    <input type="url" id="image" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="form-control" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Create Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
