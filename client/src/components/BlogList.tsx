'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BlogList.module.css';
import { useRouter } from 'next/router';
interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
}

function BlogList() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [expandedBlogs, setExpandedBlogs] = useState<Set<string>>(new Set());
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null); // Thêm state để lưu blog đã chọn

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get<Blog[]>('http://localhost:8080/api/blogs');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const deleteBlog = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/api/blogs/${id}`);
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedBlogs(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const truncateContent = (content: string, maxLength: number = 100) => {
        if (content.length <= maxLength) return content;
        return content.slice(0, maxLength) + '...';
    };

    const handleBlogClick = (blog: Blog) => {
        setSelectedBlog(blog); // Cập nhật blog đã chọn
        const router = useRouter();
        router.push(`/blog/${blog._id}`); // Điều hướng đến trang chi tiết
    };
    return (
        <div className={styles.container}>
        <div className={styles.blogGrid}>
            {blogs.map((blog) => (
                <div key={blog._id} className={styles.blogCard} onClick={() => handleBlogClick(blog)}>
                    {blog.image ? (
                        <div className={styles.imageContainer}>
                            <img
                                src={`http://localhost:8080/${blog.image}`}
                                alt={blog.title}
                                className={styles.blogImage}
                            />
                        </div>
                    ) : (
                        <div className={styles.placeholderImage}>No Image</div>
                    )}

                    <div className={styles.blogContent}>
                        <h3 className={styles.blogTitle}><strong>{blog.title}</strong></h3>
                        {selectedBlog && selectedBlog._id === blog._id ? ( // Kiểm tra nếu blog đã chọn
                            <div className='content' dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                        ) : null}
                        
                        <button
                            onClick={() => deleteBlog(blog._id)}
                            className={styles.deleteButton}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}

export default BlogList;
