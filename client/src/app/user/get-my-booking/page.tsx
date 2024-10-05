'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hook/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN Card
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // ShadCN Alert
import { Badge } from "@/components/ui/badge"; // ShadCN Badge
import { Loader2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Booking {
  id: string;
  name: string;
  phone: string;
  address: string;
  service: string;
  squareMeters: string;
  price: string;
  status: string;
  date: string;
  time: string;
}

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You must be logged in to view bookings.");
        return;
      }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/my-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data.data);
    } catch (error) {
      setErrorMessage("Error fetching bookings. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          <Skeleton className="w-1/2 h-8 mx-auto" />
        </h2>
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="mb-4 shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">My Bookings</h2>

      {errorMessage && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {currentBookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentBookings.map((booking) => (
            <Card key={booking.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{booking.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Phone: {booking.phone}</p>
                <p className="text-gray-700">Address: {booking.address}</p>
                <p className="text-gray-700">Service: {booking.service}</p>
                <p className="text-gray-700">Square Meters: {booking.squareMeters}</p>
                <p className="text-gray-700">Price: ${booking.price}</p>
                <p className="text-gray-700">Date: {formatDate(booking.date)}</p>
                <p className="text-gray-700">Time: {(booking.time)}</p>
                <p className="font-semibold">
                  Status: <Badge variant="outline" className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center">No bookings found.</p>
      )}

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(bookings.length / itemsPerPage) }, (_, index) => (
          <Button key={index} onClick={() => paginate(index + 1)} className={`mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}>
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'reject':
      return 'bg-red-100 text-red-800'; // Màu đỏ cho trạng thái "reject"
    case 'accept':
      return 'bg-green-100 text-green-800'; // Màu xanh cho trạng thái "accept"
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'; // Màu vàng cho trạng thái "pending"
    default:
      return 'bg-gray-100 text-gray-800'; // Màu xám cho trạng thái khác
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Format to 'MM/DD/YYYY' or similar based on locale
};

const formatTime = (timeString: string): string => {
  const date = new Date(`1970-01-01T${timeString}`); // Assuming time is in 'HH:mm' format
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format to 'HH:MM AM/PM'
};

export default BookingList;