// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../model/user.model';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, phone, dateOfBirth, admin, housemaid } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create roles array
    const roles = ['user'];
    if (admin) roles.push('admin');
    if (housemaid) roles.push('housemaid');

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      dateOfBirth,
      roles
    });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error: any) { 
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error during signup', error: error.message });
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
    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      JWT_SECRET,
      { expiresIn: '24h' } // Token validity
    );

    res.status(200).json({ accessToken: token });
  } catch (error) {
    console.error('Login error:', error); // Log error for debugging
    res.status(500).json({ message: 'Error during login' });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error during logout' });
  }
};


export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body; // Đảm bảo rằng chỉ có name và phone được gửi trong yêu cầu

    const updateData: {[key: string]: any} = {};

    if(name) updateData.username = name; // Đảm bảo rằng tên được cập nhật thành name
    if(phone) updateData.phone = phone; // Đảm bảo rằng số điện thoại được cập nhật thành phone

    const user = await User.findByIdAndUpdate(
      req.user!.id,
      updateData,
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const getAllHousemaids = async (req: Request, res: Response) => {
  try {
    const housemaids = await User.find({ roles: 'housemaid' }).select('-password');
    res.status(200).json(housemaids);
  } catch (error) {
    console.error('Error fetching housemaids:', error);
    res.status(500).json({ message: 'Error fetching housemaids' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    const userCount = await User.countDocuments();
    res.json({ users, userCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// export const checkAdminRole = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findById(req.user!.id).select('roles');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const isAdmin = user.roles.includes('admin');
//     res.json({ isAdmin });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
