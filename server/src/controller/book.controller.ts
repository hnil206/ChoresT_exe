import { Request, Response } from 'express';
import { Book } from '../model/book.model';
import mongoose from 'mongoose';

// Create a new book entry, only accessible by authorized housemaid users
export const createBook = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, service, squareMeters, price, date, time } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Create a new book entry associated with the logged-in user
    const newBook = new Book({
      name,
      phone,
      address,
      service,
      squareMeters,
      price,
      userId: req.user.id, // Use req.user.id
      date,
      time, 
    });

    console.log(newBook, 'haha');

    await newBook.save();

    return res.status(201).json({
      message: 'Booking created successfully',
      data: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating booking',
    });
  }
};
// house maid: get all bookings
export const getBooks = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.roles.includes('housemaid') && !req.user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Unauthorized: Housemaid access required' });
    }

    // Find all bookings (not filtered by userId anymore)
    const books = await Book.find();

    if (books.length === 0) {
      return res.status(200).json({
        message: 'No bookings found',
        data: [],
      });
    }

    return res.status(200).json({
      message: 'Bookings fetched successfully',
      data: books.map(book => ({
        id: book._id,
        name: book.name,
        phone: book.phone,
        address: book.address,
        service: book.service,
        squareMeters: book.squareMeters,
        price: book.price,  
        createdAt: book.createdAt,
        status: book.status,
        date: book.date,
        time: book.time,
      })),
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({
      message: 'Error fetching bookings',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateBookStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.roles.includes('housemaid')) {
      return res.status(403).json({ message: 'Unauthorized: Housemaid access required' });
    }

    const { _id, status } = req.body;

    if (!['accepted', 'rejected', 'processing'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Log the _id to ensure it's being received correctly
    console.log('Received _id:', _id);

    // Check if the _id is a valid Mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid _id' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(200).json({
      message: 'Booking status updated successfully',
      data: updatedBook,
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({
      message: 'Error updating booking status',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }

    const userId = req.user.id;
    console.log('Fetching bookings for user ID:', userId);

    const bookings = await Book.find({ userId });
    console.log(`Found ${bookings.length} bookings for user ${userId}`);

    return res.status(200).json({
      message: 'User bookings fetched successfully',
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return res.status(500).json({
      message: 'Error fetching user bookings',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};


//admin: get count bookings
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const totalBookings = await Book.countDocuments();
    res.status(200).json({
      message: 'Total bookings fetched successfully',
      bookingCount: totalBookings,
    });
  } catch (error) {
    console.error('Error fetching total bookings:', error);
    res.status(500).json({
      message: 'Error fetching total bookings',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};