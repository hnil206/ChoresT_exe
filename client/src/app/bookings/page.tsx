"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hook/useAuth";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

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

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8080/api/update-status",
        { _id: bookingId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">List of Bookings</h2>

      {errorMessage && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-card text-card-foreground">
            <thead className="bg-muted">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Service</th>
                <th className="py-3 px-4 text-left">Square Meters</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                {isAuthenticated && <th className="py-3 px-4 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-muted-foreground">
                  <td className="py-3 px-4">{booking.name}</td>
                  <td className="py-3 px-4">{booking.phone}</td>
                  <td className="py-3 px-4">{booking.address}</td>
                  <td className="py-3 px-4">{booking.service}</td>
                  <td className="py-3 px-4">{booking.squareMeters}</td>
                  <td className="py-3 px-4">${booking.price}</td>
                  <td className="py-3 px-4">{booking.status}</td>
                  {isAuthenticated && (
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => updateBookingStatus(booking.id, "accepted")}
                          variant="default"
                          size="sm"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => updateBookingStatus(booking.id, "rejected")}
                          variant="destructive"
                          size="sm"
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-700">No bookings found.</p>
      )}
    </div>
  );
};

export default BookingList;