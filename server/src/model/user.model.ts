import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    admin: {
        type: Boolean,
        default: false,
        required: true
      },  
    housemaid: {
        type: Boolean,
        default: false,
        required: true
      }
    }, {
    timestamps: true
    });

export const User = mongoose.model('User', userSchema);