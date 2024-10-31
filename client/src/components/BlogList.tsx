'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BlogList.module.css';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, EyeIcon, HeartIcon } from 'lucide-react';

interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
    views: number;
    likes: number;
    date: string;
}

export default function BlogList() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h1>
            <div className={styles.blogGrid}>
                {blogs.map((blog) => (
                    <Link key={blog._id} href={`/blogs/${blog._id}`} className="no-underline">
                        <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                            <div className={styles.imageContainer}>
                                {blog.image ? (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className={styles.blogImage}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className={styles.placeholderImage}>
                                        <span>No Image Available</span>
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                                <div className="text-sm text-gray-600 mb-4 line-clamp-3" 
                                     dangerouslySetInnerHTML={{ __html: blog.content }} />
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <EyeIcon className="w-4 h-4" />
                                            {blog.views}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <HeartIcon className="w-4 h-4" />
                                            {blog.likes}
                                        </span>
                                    </div>
                                    {blog.date && (
                                        <span className="flex items-center gap-1">
                                            <CalendarIcon className="w-4 h-4" />
                                            {formatDate(blog.date)}
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

