'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from '@/app/hook/useAuth';
import Image from 'next/image';
import { ImageUploader } from '@/components/image-upload';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchUserProfile();
  }, [isAuthenticated, router]);

  const handleProfileEdit = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/update`, 
        { name, phone },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      console.log('Profile updated:', response.data);
      fetchUserProfile(); // Refetch user profile to update the state
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAvatarUpload = async (url: string) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/update`,    
        { avatar: url }, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      console.log('Profile updated:', response.data);
      fetchUserProfile(); // Refetch user profile to update the state
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(response.data);
      setName(response.data.username); // Set the initial name from the fetched user profile
      setPhone(response.data.phone); // Set the initial phone from the fetched user profile
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Image
              src={user.avatar || '/default-avatar.png'}
              alt="Profile Avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
            <ImageUploader onUploadSuccess={handleAvatarUpload} />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Full name</h3>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <h3 className="font-semibold">Role</h3>
              <p>{user.roles.join(', ')}</p>
            </div>
            <button onClick={handleProfileEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save Changes
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;