import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
const cookieSession = require("cookie-session");
import mongoose from 'mongoose';
import routes from './routes/routes';
import auth from './routes/user.routes';
import dotenv from 'dotenv';
// Initialize express app
const app: Application = express();

// Middleware
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

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

app.use('/api', routes);
app.use('/auth', auth);
app.use('/auth', auth);

// Export the app
export default app;
