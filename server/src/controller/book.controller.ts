import { Request, Response } from 'express';
import { Book } from '../model/book.model';

// Create a new book entry, only accessible by authorized housemaid users
export const createBook = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, service, squareMeters, price } = req.body;

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
    });

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

export const getBooks = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find all bookings created by the logged-in user
    const books = await Book.find({ userId: req.user.id });

    if (books.length === 0) {
      return res.status(200).json({
        message: 'No bookings found for this user',
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

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }

    const books = await Book.find().populate('userId', 'username email');

    return res.status(200).json({
      message: 'All bookings fetched successfully',
      data: books,
    });
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return res.status(500).json({
      message: 'Error fetching all bookings',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
import mongoose from 'mongoose';

export const updateBookStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Unauthorized: Admin access required' });
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