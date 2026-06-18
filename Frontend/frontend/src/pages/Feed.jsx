import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Feed = () => {

    const [posts, setPosts] = useState([
        {
            _id: 1,
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            caption: "Beautiful Scenery"
        }
    ]);

    useEffect(() => {
        axios.get("http://localhost:3000/posts")
        .then((res) => {
            setPosts(res.data.posts)
        })
    })

    return (
        <section className='feed-section'>
            <h1>Feed Section</h1>

            {
                posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className='post-card'>
                            <img src={post.image} alt={post.caption} />
                            <p>{post.caption}</p>
                        </div>
                    ))
                ) : (
                    <h1>No posts available</h1>
                )
            }
        </section>
    );
};

export default Feed;