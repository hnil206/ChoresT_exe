'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BlogList.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
}

export default function BlogList() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        fetchBlogs();
    }, []);
    console.log(blogs)

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };



    return (
        <div className={styles.container}>
            <div className={styles.blogGrid}>
                {blogs.map((blog, index) => (
                    <Link key={index} href={`/blogs/${blog._id}`}>
                        <div className={styles.blogCard}>
                            {blog.image ? (
                                <div className={styles.imageContainer}>
                                    <img
                                        src={`${blog.image}`}
                                        alt={blog.title}
                                        className={styles.blogImage}
                                    />
                                </div>
                            ) : (
                                <div className={styles.placeholderImage}>No Image</div>
                            )}
                            <div className={styles.blogContent}>
                                <h3 className={styles.blogTitle}><strong>{blog.title}</strong></h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

