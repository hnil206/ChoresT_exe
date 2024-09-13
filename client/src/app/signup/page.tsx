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
    Confirmpassword: '',
    phone: '',
    DateOfBirth: '',
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

    if (formData.password !== formData.Confirmpassword) {
      alert('Passwords do not match!');
      return;
    }

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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp" 
            alt="Signup"
            className="img-fluid"
            style={{ borderRadius: '8px' }} // Optional: Add border radius to the image
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="Confirmpassword"
                value={formData.Confirmpassword}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-12">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="DateOfBirth"
                value={formData.DateOfBirth}
                onChange={handleChange}
                className="form-control"
              />
            </div>
           
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary" style={{alignItems:'center'}}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
