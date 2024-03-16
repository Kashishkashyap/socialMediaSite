import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://social-media-site-gules.vercel.app/v1/api/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                const postData = await response.json();
                setPost(postData);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchPost();
    }, [id]);



    return (
        <div className="container mt-5">
            <div className="card">
                {post.image && (
                    <img src={post.image} className="card-img-top img-fluid" alt="Post" style={{ maxHeight: '400px' }} />
                )}
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/post/update/${id}`} className="btn btn-primary">Update Post</Link>
                        <Link to={`/post/delete/${id}`} className="btn btn-danger">Delete Post</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPost;
