'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogList from '../../components/BlogList';

export default function Blogs() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only on the client side
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Blog App</h1>
      <div className="mb-6 text-right">
        <Link href="/blogs/create">
          {token && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
              Create New Blog
            </button>
          )}
        </Link>
      </div>
      <BlogList />
    </div>
  );
}
