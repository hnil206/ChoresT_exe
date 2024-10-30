'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Housemaid {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  address: string;  // Thêm địa chỉ
  service: string;  // Thêm dịch vụ
  additionalImage: string;  // Hình ảnh bổ sung
}

const HousemaidList: React.FC = () => {
  const [housemaids, setHousemaids] = useState<Housemaid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHousemaids = async () => {
      try {
        const response = await axios.get<Housemaid[]>(`${process.env.NEXT_PUBLIC_API_URL}/auth/housemaid`);
        setHousemaids(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch housemaids');
        setLoading(false);
      }
    };

    fetchHousemaids();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  // Dữ liệu giả để hiển thị thêm 5 thẻ
  const additionalHousemaids: Housemaid[] = [
    {
      _id: 'new1',
      username: 'Nguyễn Thị Hạnh',
      email: 'HanhNT@gmail.com',
      avatar: '/images/avatar1.jpg',
      address: '123 Main St, Cityville',
      service: 'Cleaning',
      additionalImage: '/image/anh1.jpg',
    },
    {
      _id: 'new2',
      username: 'John',
      email: 'john@example.com',
      
      avatar: '/images/avatar2.jpg',
      address: '456 Elm St, Townsville',
      service: 'Cooking',
      additionalImage: '/image/anh3.webp',
    },
    {
      _id: 'new3',
      username: 'Maria',
      email: 'maria@example.com',
      
      avatar: '/images/avatar3.jpg',
      address: '789 Maple Ave, Villagetown',
      service: 'Babysitting',
      additionalImage: '/image/anh4.jpg',
    },
    {
      _id: 'new4',
      username: 'lisa',
      email: 'lisa@example.com',
     
      avatar: '/images/avatar4.jpg',
      address: '101 Oak St, Cityland',
      service: 'Laundry',
      additionalImage: '/image/anh7.jpg',
    },
    {
      _id: 'new5',
      username: 'Sophia',
      email: 'sophia@example.com',
      
      avatar: '/images/avatar5.jpg',
      address: '202 Pine St, Townland',
      service: 'Grocery Shopping',
      additionalImage: '/image/anh8.jpg',
    }
  ];

  const allHousemaids = [...housemaids, ...additionalHousemaids];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Housemaid List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allHousemaids.map((housemaid) => (
          <Card key={housemaid._id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={housemaid.avatar} alt={`${housemaid.username}'s avatar`} />
                <AvatarFallback>{housemaid.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle>{housemaid.username}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-1">Email: {housemaid.email}</p>
             
              <p className="text-sm text-gray-600 mb-1">Address: {housemaid.address}</p>
              <p className="text-sm text-gray-600 mb-4">Service: {housemaid.service}</p>
              <Link href={`/housemaid/${housemaid._id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              {/* Hiển thị hình ảnh bổ sung với kích thước cố định */}
              <div className="relative mt-2" style={{ height: '200px', width: '100%' }}>
                <Image 
                  src={housemaid.additionalImage} 
                  alt={`${housemaid.username}'s service`} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-lg" 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HousemaidList;
