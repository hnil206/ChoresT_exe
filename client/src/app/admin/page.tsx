'use client';
import { useState } from 'react'
import { Bell, ChevronDown, Home, Users, Calendar, Settings, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

const AdminHome: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Dashboard')

  const stats: Stat[] = [
    { title: "Total Bookings", value: "1,234" },
    { title: "Active Maids", value: "56" },
    { title: "This Month's Revenue", value: "$12,345" },
    { title: "Customer Satisfaction", value: "4.8/5" },
  ]

  const recentBookings: Booking[] = [
    { id: 1, customer: "John Doe", maid: "Alice Smith", date: "2023-04-15", status: "Completed" },
    { id: 2, customer: "Jane Smith", maid: "Emma Johnson", date: "2023-04-16", status: "Scheduled" },
    { id: 3, customer: "Bob Wilson", maid: "Olivia Brown", date: "2023-04-17", status: "In Progress" },
  ]

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
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-4 flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent bookings */}
          <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Recent Bookings</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <li key={booking.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-primary truncate">{booking.customer}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {booking.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {booking.maid}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>{booking.date}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick actions */}
          <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button>Add New Maid</Button>
            <Button>Create Booking</Button>
            <Button>View Reports</Button>
            <Button>Manage Promotions</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminHome
