'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hook/useAuth";

interface Booking {
  id: string;
  name: string;
  phone: string;
  address: string;
  service: string;
  squareMeters: string;
  price: string;
  status: string;
}

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You must be logged in to view bookings.");
        return;
      }
      const response = await axios.get("http://localhost:8080/api/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched bookings:', response.data.data); // Add logging
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">My Bookings</h2>

      {errorMessage && (
        <div
          className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 mt-4"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <p className="text-lg font-semibold mb-2">Name: {booking.name}</p>
            <p className="text-gray-700 mb-2">Phone: {booking.phone}</p>
            <p className="text-gray-700 mb-2">Address: {booking.address}</p>
            <p className="text-gray-700 mb-2">Service: {booking.service}</p>
            <p className="text-gray-700 mb-2">
              Square Meters: {booking.squareMeters}
            </p>
            <p className="text-gray-700 mb-2">Price: ${booking.price}</p>
            <p className="font-semibold mb-2">
              Status: <span className={`px-2 py-1 rounded ${getStatusColor(booking.status)}`}>{booking.status}</span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No bookings found.</p>
      )}
    </div>
  );
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-200 text-yellow-800';
    case 'confirmed':
      return 'bg-green-200 text-green-800';
    case 'cancelled':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

export default BookingList;