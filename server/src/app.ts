import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
const cookieSession = require("cookie-session");
import mongoose from 'mongoose';
import routes from './routes/routes';
import userRoutes from './routes/user.routes';
import book from './routes/book.routes';
import blogRoutes from './routes/blogRoutes';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
// Initialize express app
const app: Application = express();

// Middleware
var corsOptions = {
  origin: "http://localhost:1234",
  credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());


// Function to read JSON data
const readJsonFile = (fileName: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'data', fileName), 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
};


// API to get provinces

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

// Set Mongoose strictQuery option
mongoose.set('strictQuery', true);

// MongoDB connection
const mongoURI = 'mongodb+srv://Luund:Uc8Qzwd2j8AMtJxW@cluster0.ioech.mongodb.net/ChoresT';




mongoose.connect(mongoURI, {})
  .then(() => {
    console.log('------------------------------')
    console.log('MongoDB connected successfully')
    console.log('------------------------------')
  })
  .catch(err => {
    console.log('------------------------------')
    console.error('MongoDB connection error:', err)
    console.log('------------------------------')
  });

// Define routes
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


app.use('/api', routes);
app.use('/auth', auth);
app.use('/auth', auth);
app.use('/auth', auth);
app.use('/books', book);
app.use('/uploads',express.static('uploads'));
app.use('/api/blogs',blogRoutes);



// Export the app
export default app;
