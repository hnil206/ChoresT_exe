'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from 'next/link';
import { Button } from '@/components/ui/button';


interface Housemaid {
  _id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  service: string;
  additionalImage: string;
}

const HousemaidList: React.FC = () => {
  const [housemaids, setHousemaids] = useState<Housemaid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHousemaids = async () => {
      try {
        const response = await axios.get<Housemaid[]>('http://localhost:8080/auth/housemaid');
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
      username: 'Anna',
      email: 'anna@example.com',
      phone: '123-456-7890',
      avatar: '/images/avatar1.jpg',
      address: '123 Main St, Cityville',
      service: 'Cleaning',
      additionalImage: '/image/anh1.jpg',
    },
    {
      _id: 'new2',
      username: 'John',
      email: 'john@example.com',
      phone: '098-765-4321',
      avatar: '/images/avatar2.jpg',
      address: '456 Elm St, Townsville',
      service: 'Cooking',
      additionalImage: '/image/anh3.webp',
    },
    {
      _id: 'new3',
      username: 'Maria',
      email: 'maria@example.com',
      phone: '555-123-4567',
      avatar: '/images/avatar3.jpg',
      address: '789 Maple Ave, Villagetown',
      service: 'Babysitting',
      additionalImage: '/image/anh7.jpg',
    },
    {
      _id: 'new4',
      username: 'Lisa',
      email: 'Lisa@example.com',
      phone: '321-654-0987',
      avatar: '/images/avatar4.jpg',
      address: '101 Oak St, Cityland',
      service: 'Laundry',
      additionalImage: '/image/anh4.jpg',
    },
    {
      _id: 'new5',
      username: 'Sophia',
      email: 'sophia@example.com',
      phone: '654-321-9870',
      avatar: '/images/avatar5.jpg',
      address: '202 Pine St, Townland',
      service: 'Grocery Shopping',
      additionalImage: '/image/anh8.jpg',
    }
  ];

  const allHousemaids = [...housemaids, ...additionalHousemaids];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Housemaid List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {allHousemaids.map((housemaid) => (
          <Link href="/book" key={housemaid._id} legacyBehavior>
            <a>
              <Card className="overflow-hidden shadow-md rounded-lg h-full flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={housemaid.avatar} alt={`${housemaid.username}'s avatar`} />
                    <AvatarFallback>{housemaid.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg font-semibold text-gray-800">{housemaid.username}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email: {housemaid.email}</p>
                    <p className="text-sm text-gray-600">Phone: {housemaid.phone}</p>
                    <p className="text-sm text-gray-600">Address: {housemaid.address}</p>
                    <p className="text-sm text-gray-600">Service: {housemaid.service}</p>
                  </div>
                  <div className="relative w-full" style={{ height: '200px' }}>
                    <Image 
                      src={housemaid.additionalImage} 
                      alt={`${housemaid.username}'s service`} 
                      layout="fill" 
                      objectFit="cover" 
                      className="mt-2 rounded-lg" 
                    />
                  </div>
                </CardContent>
              </Card>
            </a>
          </Link>

        ))}
      </div>
    </div>
  );
};

export default HousemaidList;
