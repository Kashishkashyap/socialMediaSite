import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePost = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({ title: '', description: '', image: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:5000/v1/api/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                const postData = await response.json();
                setFormData({ title: postData.title, description: postData.description, image: postData.image });
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/v1/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update post');
            }
            navigate(`/post/view/${id}`);
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
                            <h2 className="card-title text-center mb-4">Update Post</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" name="title" id="title" className="form-control" placeholder="Title" value={formData.title} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea name="description" id="description" className="form-control" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image URL</label>
                                    <input type="url" name="image" id="image" className="form-control" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Update Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePost;
