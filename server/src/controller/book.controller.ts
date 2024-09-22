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

// Get all book entries created by the logged-in user
export const getBooks = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find all bookings created by the logged-in user
    const books = await Book.find({ userId: req.user.id });

    return res.status(200).json({
      message: 'Bookings fetched successfully',
      data: books.map(book => ({
        name: book.name,
        phone: book.phone,
        address: book.address,
        service: book.service,
        squareMeters: book.squareMeters,
        price: book.price,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching bookings',
      error: "Error fetching get bookings",
    });
  }
};
