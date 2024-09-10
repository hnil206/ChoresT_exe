import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../model/user.model';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, admin, housemaid } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      admin: admin || false,
      housemaid: housemaid || false,
    });

    // Save the user in MongoDB
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, admin: user.admin, housemaid: user.housemaid }, JWT_SECRET, {
      expiresIn: '24h', // Token valid for 24 hours
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      admin: user.admin,
      housemaid: user.housemaid,
      accessToken: token,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
