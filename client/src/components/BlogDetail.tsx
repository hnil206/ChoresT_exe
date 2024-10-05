'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
}

function BlogDetail({id} : {id : string}) {
    const [blog, setBlog] = useState<Blog | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            fetchBlog(id as string);
        }
    }, [id]);

    const fetchBlog = async (id: string) => {
        try {
            const response = await axios.get<Blog>(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`); 
            setBlog(response.data);
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

    if (!blog) return <div className="text-center text-lg">Loading...</div>; // Tailwind CSS for loading

    return (
        <div className="max-w-2xl mx-auto p-4"> {/* Tailwind CSS for layout */}
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1> 
            {/* {blog.image && <img className="w-full h-auto mb-4 rounded-lg" src={`http://localhost:8080/${blog.image}`} alt={blog.title} />}  */}
            <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content }}></div> {/* Tailwind CSS for content */}
        </div>
    );
}

export default BlogDetail;
