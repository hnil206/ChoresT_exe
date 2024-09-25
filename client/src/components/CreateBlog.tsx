'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CreateBlogProps {
  onBlogCreated: () => void;
}

function CreateBlog({ onBlogCreated }: CreateBlogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content); // Gửi nội dung HTML nguyên gốc
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:8080/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTitle('');
      setContent('');
      setImage(null);
      setPreviewUrl(null); // Reset preview URL after submission
      onBlogCreated();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
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
            onChange={(value) => setContent(value)} // Corrected to accept the value directly
            placeholder="Write your blog content here..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
          {previewUrl && (
            <div className="image-preview mt-4">
              <img src={previewUrl} alt="Preview" className="rounded-lg shadow-md max-h-64" />
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
          dangerouslySetInnerHTML={{ __html: content }} // Hiển thị nội dung HTML
        />
      </div>
    </div>
  );
}

export default CreateBlog;
