'use client';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Bell, ChevronDown, Home, Users, Calendar, Settings, LogOut, DollarSign } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

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

  

  const chartData = [
    { name: 'Users', value: userCount },
    { name: 'Bookings', value: bookingCount },
    { name: 'Revenue (VND)', value: totalPrice },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">MaidRental</h1>
        </div>
        <nav className="mt-8">
          {['Dashboard', 'Bookings', 'Maids', 'Customers', 'Settings'].map((item) => (
            <button
              key={item}
              className={`flex items-center w-full px-4 py-2 text-left ${
                activePage === item ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActivePage(item)}
            >
              {item === 'Dashboard' && <Home className="mr-2 h-4 w-4" />}
              {item === 'Bookings' && <Calendar className="mr-2 h-4 w-4" />}
              {item === 'Maids' && <Users className="mr-2 h-4 w-4" />}
              {item === 'Customers' && <Users className="mr-2 h-4 w-4" />}
              {item === 'Settings' && <Settings className="mr-2 h-4 w-4" />}
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Admin Header */}
        <header className="bg-white shadow-sm"></header>
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{activePage}</h1>
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-4 flex items-center">
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
        
        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Registered Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userCount}</div>
                <p className="text-xs text-muted-foreground">
                  <Link href="/admin/listusers">View all users</Link>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookingCount}</div>
                <p className="text-xs text-muted-foreground">
                  <Link href="/admin/listbookings">View all bookings</Link>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPrice.toLocaleString()} VND</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminHome
