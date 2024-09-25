import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const verifyHousemaid  = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, roles: string[] };
    req.user = { id: decoded.id, roles: decoded.roles || [] };  // Ensure this is set correctly
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
