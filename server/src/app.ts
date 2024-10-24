import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import cookieSession from "cookie-session";
import mongoose from 'mongoose';
import routes from './routes/routes';
import userRoutes from './routes/user.routes';
import book from './routes/book.routes';
import blogRoutes from './routes/blogRoutes';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import commentRoutes from './routes/commentRoutes';
import paymentRoutes from './routes/paymentRoutes';
// Initialize dotenv
dotenv.config();

// Initialize express app
const app: Application = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:1234',
  // origin: process.env.CLIENT_URL,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure cookie session
app.use(cookieSession({
  name: "bezkoder-session",
  keys: [process.env.COOKIE_SECRET || "default_secret"], // should use as secret environment variable
  httpOnly: true
}));

// Set Mongoose strictQuery option
mongoose.set('strictQuery', true);

// MongoDB connection
const mongoURI = 'mongodb+srv://Luund:Uc8Qzwd2j8AMtJxW@cluster0.ioech.mongodb.net/ChoresT';


mongoose.connect(mongoURI, {})
  .then(() => {
    console.log('------------------------------');
    console.log('MongoDB connected successfully');
    console.log('------------------------------');
  })
  .catch(err => {
    console.log('------------------------------');
    console.error('MongoDB connection error:', err);
    console.log('------------------------------');
  });

// Define routes
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Static files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// API routes
app.use('/api', routes);
app.use('/api/auth', userRoutes);
app.use('/api/books', book);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/payment', paymentRoutes);
// Export the app
export default app;
