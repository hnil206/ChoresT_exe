'use client'; // Required for client-side rendering in Next.js 14

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Next.js 14 uses `next/navigation`
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    admin: false,
    housemaid: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/auth/signup', formData);
      alert('User registered successfully!');
      router.push('/login'); // Redirect to login
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed!');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>
            <input type="checkbox" name="admin" checked={formData.admin} onChange={handleChange} />
            Admin
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" name="housemaid" checked={formData.housemaid} onChange={handleChange} />
            Housemaid
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
