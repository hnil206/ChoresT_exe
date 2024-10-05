import express from 'express';
import multer from 'multer';
import path from 'path';
import * as BlogController from '../controller/blogController';

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file duy nhất
    }
});

const upload = multer({ storage: storage });

// Routes
router.post('/', upload.single('image'), BlogController.createBlog);
router.get('/', BlogController.getAllBlogs);
router.get('/:id', BlogController.getBlogById);
router.put('/:id', upload.single('image'), BlogController.updateBlog);
router.delete('/:id', BlogController.deleteBlog);

export default router;
