import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeletePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://social-media-site-gules.vercel.app/v1/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
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
                            <h2 className="card-title text-center mb-4">Delete Post</h2>
                            <p className="card-text text-center">Are you sure you want to delete this post?</p>
                            <div className="d-grid gap-2">
                                <button onClick={handleDelete} className="btn btn-danger">Delete Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletePost;
