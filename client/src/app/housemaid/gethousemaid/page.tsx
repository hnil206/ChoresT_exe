'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Housemaid {
  _id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Housemaid List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {housemaids.map((housemaid) => (
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
              <p className="text-sm text-gray-600">Phone: {housemaid.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HousemaidList;