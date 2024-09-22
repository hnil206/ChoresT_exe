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
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.push('/login');
    // } else {
      fetchUserProfile();
    // }
  }, [isAuthenticated, router]);

  const handleAvatarUpload = async (url: string) => {
    try {
      const response = await axios.put('http://localhost:8080/auth/user/update', 
        { avatar: url }, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      // Handle successful update
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/user/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(response.data);
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
              <h3 className="font-semibold">Username</h3>
              <p>{user.username}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;