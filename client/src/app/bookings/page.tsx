'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
  name: string;
  phone: string;
  address: string;
  service: string;
  squareMeters: number;
  price: number;
}

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bookings");
        setBookings(response.data.data); // Save the bookings into the state
      } catch (error) {
        setErrorMessage('Error fetching bookings.');
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Bookings</h2>

      {errorMessage && (
        <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 mt-4" role="alert">
          {errorMessage}
        </div>
      )}

      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div key={index} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-lg font-semibold mb-2">Name: {booking.name}</p>
            <p className="text-gray-700 mb-2">Phone: {booking.phone}</p>
            <p className="text-gray-700 mb-2">Address: {booking.address}</p>
            <p className="text-gray-700 mb-2">Service: {booking.service}</p>
            <p className="text-gray-700 mb-2">Square Meters: {booking.squareMeters}</p>
            <p className="text-gray-700 mb-2">Price: ${booking.price}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No bookings found.</p>
      )}
    </div>
  );
};

export default BookingList;
