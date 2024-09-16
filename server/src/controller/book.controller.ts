import { Request, Response } from 'express';
import { Book } from '../model/book.model';


// Create a new book entry
export const createBook = async (req: Request, res: Response) => {
    try {
      const { name, phone, address, service, squareMeters } = req.body;
  
      // Check if all fields are provided
      if (!name || !phone) {
        return res.status(400).json({
          message: 'Name and phone are required fields',
        });
      }
  
      // Create a new book entry
      const newBook = new Book({
        name,
        phone,
        address,
        service,
        squareMeters,
      });
  
      // Save the entry to the database
      await newBook.save();
  
      return res.status(201).json({
        message: 'Booking created successfully',
        data: newBook,
      });
    } catch (error) {
      console.error('Error creating booking:', error);  // Log the error
      return res.status(500).json({
        message: 'Error creating booking',
        //error: error.message,  // Send the actual error message
      });
    }
  };

// Get all book entries
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      message: 'Bookings fetched successfully',
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching bookings',
      //error: error.message,
    });
  }
};
