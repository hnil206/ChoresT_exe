'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

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

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchBookings = async () => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("You must be logged in to view bookings.");
                return;
            }
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/bookings`, {
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

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatPrice = (price: string): string => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(Number(price));
    };

    const getStatusBadge = (status: string) => {
        const statusStyles = {
            pending: "bg-yellow-100 text-yellow-800",
            confirmed: "bg-green-100 text-green-800",
            completed: "bg-blue-100 text-blue-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return (
            <Badge variant="outline" className={`${statusStyles[status.toLowerCase() as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"}`}>
                {status}
            </Badge>
        );
    };

    const LoadingSkeleton = () => (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex space-x-4">
                    <Skeleton className="h-12 w-full" />
                </div>
            ))}
        </div>
    );

    if (errorMessage) {
        return (
            <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold">My Bookings</CardTitle>
                    <Button 
                        variant="outline" 
                        onClick={fetchBookings}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : bookings.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">STT</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Address</TableHead>
                                        <TableHead>Service</TableHead>
                                        <TableHead className="text-right">Square Meters</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.map((booking, index) => (
                                        <TableRow key={booking.id} className="hover:bg-gray-50">
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell>{booking.name}</TableCell>
                                            <TableCell>{booking.phone}</TableCell>
                                            <TableCell className="max-w-xs truncate" title={booking.address}>
                                                {booking.address}
                                            </TableCell>
                                            <TableCell>{booking.service}</TableCell>
                                            <TableCell className="text-right">{booking.squareMeters} m²</TableCell>
                                            <TableCell className="text-right font-medium">
                                                {formatPrice(booking.price)}
                                            </TableCell>
                                            <TableCell>{formatDate(booking.date)}</TableCell>
                                            <TableCell>{booking.time}</TableCell>
                                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No bookings found.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default MyBookingsPage;