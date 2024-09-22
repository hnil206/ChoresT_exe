import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
     type: Number, 
     required: true 
  },
  address: {
    type: String, // or you can store as number if you prefer the province code
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  squareMeters: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create the Book model from the schema
export const Book = mongoose.model("Book", bookSchema);
