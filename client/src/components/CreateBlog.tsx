'use client';
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CldUploadWidget } from 'next-cloudinary';
import { ImageUploader } from './image-upload';

interface CreateBlogProps {
  onBlogCreated: () => void;
}

function CreateBlog({ onBlogCreated }: CreateBlogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const blogData = {
      title,
      content,
      image: imageUrl
    };


    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, blogData);
      setTitle('');
      setContent('');
      setImageUrl(null);
      onBlogCreated();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700 text-center">Create New Blog</h2>
        <div className="form-group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter your blog title"
            className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
          <ReactQuill
            theme="snow"
            className="h-36"
            value={content}
            onChange={(value) => setContent(value)}
            placeholder="Write your blog content here..."
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <ImageUploader onUploadSuccess={setImageUrl} />
          {imageUrl && (
            <div className="image-preview mt-4">
              <img src={imageUrl} alt="Preview" className="rounded-lg shadow-md max-h-64" />
            </div>
          )}
        </div>
        <div className="text-center">
          <button type="submit" className="submit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Blog
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700">Preview:</h3>
        <div
          className="preview-content mt-4 border p-4 rounded"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}

export default CreateBlog;
