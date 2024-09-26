// pages/contact.tsx
'use client'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation logic here (cơ bản, bạn có thể cải thiện)
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all required fields.');
      return;
    }

    // Xử lý gửi form (fake thành công ở đây)
    toast.success('Your message has been sent successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-xl mt-10">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Contact Us</h2>
      <p className="text-center text-gray-600 mb-6">We'd love to hear from you! Please fill out the form below.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mt-1 block w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-1 block w-full"
          />
        </div>

        {/* Phone (optional) */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="mt-1 block w-full"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here"
            className="mt-1 block w-full"
          />
        </div>

        {/* Error and Success Messages */}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="mt-4">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default Contact;
