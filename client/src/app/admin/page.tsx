'use client';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Bell, ChevronDown, Home, Users, Calendar, Settings, LogOut, DollarSign } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from 'next/link';

type Stat = {
  title: string;
  value: string;
}

type Booking = {
  id: number;
  customer: string;
  maid: string;
  date: string;
  status: string;
}

type User = {
  _id: string;
  username: string;
  email: string;
  roles: string[];
  createdAt: string;
}

interface TotalPriceResponse {
  totalPrice: number;
}

const AdminHome: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Dashboard')
  const [users, setUsers] = useState<User[]>([])
  const [userCount, setUserCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingCount, setBookingCount] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data.users);
        setUserCount(response.data.userCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/getCountBookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookingCount(response.data.bookingCount);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch booking data');
        setLoading(false);
      }
    };
    const fetchTotalPrice = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<TotalPriceResponse>(`${process.env.NEXT_PUBLIC_API_URL}/books/total-price`, { headers: { Authorization: `Bearer ${token}` } });
        setTotalPrice(response.data.totalPrice);
      } catch (error) {
        console.error('Error fetching total price:', error);
      }
    };

    fetchUsers();
    fetchBookings();
    fetchTotalPrice();
  }, []);

  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">MaidRental</h1>
        </div>
        <nav className="mt-6">
          {['Dashboard', 'Bookings', 'Maids', 'Customers', 'Settings'].map((item) => (
            <button
              key={item}
              className={`flex items-center w-full px-6 py-3 text-left ${
                activePage === item ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActivePage(item)}
            >
              {item === 'Dashboard' && <Home className="mr-3 h-5 w-5" />}
              {item === 'Bookings' && <Calendar className="mr-3 h-5 w-5" />}
              {item === 'Maids' && <Users className="mr-3 h-5 w-5" />}
              {item === 'Customers' && <Users className="mr-3 h-5 w-5" />}
              {item === 'Settings' && <Settings className="mr-3 h-5 w-5" />}
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Admin Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{activePage}</h1>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-4">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder-admin.jpg" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span>Admin</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats overview */}
          <Link href="/admin/listusers">
          <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Total Registered Users: {userCount}</h2>
          </Link>
          
          <Link href="/admin/listbookings">
          <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Total Bookings: {bookingCount}</h2>
          </Link>
          <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Total Revenue: {totalPrice} VND</h2>
        </div>
      </main>
    </div>
  )
}

export default AdminHome
