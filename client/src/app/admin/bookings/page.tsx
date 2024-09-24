"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hook/useAuth";
import Booking from "../../book/page";

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
      const response = await axios.get("http://localhost:8080/api/bookings", {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8080/api/update-status",
        { _id: bookingId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the booking status in the state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      setErrorMessage("Error updating booking status");
      console.error(error);
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Bookings</h2>

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
            {" "}
            <p className="text-lg font-semibold mb-2">Name: {booking.name}</p>
            <p className="text-gray-700 mb-2">Phone: {booking.phone}</p>
            <p className="text-gray-700 mb-2">Address: {booking.address}</p>
            <p className="text-gray-700 mb-2">Service: {booking.service}</p>
            <p className="text-gray-700 mb-2">
              Square Meters: {booking.squareMeters}
            </p>
            <p className="text-gray-700 mb-2">Price: ${booking.price}</p>
            {isAuthenticated && (
              <div className="mt-4">
                <button
                  onClick={() => updateBookingStatus(booking.id, "accepted")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateBookingStatus(booking.id, "rejected")}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-700">No bookings found.</p>
      )}
    </div>
  );
};

export default BookingList;
