'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
}

function BlogDetail() {
  const router = useRouter();
  const { id } = router.query; // Lấy ID từ query params
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogDetail();
    }
  }, [id]);

  const fetchBlogDetail = async () => {
    try {
      const response = await axios.get<Blog>(`http://localhost:8080/api/blogs/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog detail:', error);
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      {blog.image && <img src={`http://localhost:8080/${blog.image}`} alt={blog.title} />}
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}

export default BlogDetail;