'use client'

import React, { useState, useEffect } from 'react';
import CreateBlog from '../../../components/CreateBlog';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateBlogPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBlogCreated = () => {
    router.push('/blogs');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/blogs">
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Back to Blogs
          </button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {isClient && <CreateBlog onBlogCreated={handleBlogCreated} />}
      </div>
    </div>
  );
}
