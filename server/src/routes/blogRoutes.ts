import express from 'express';
import multer from 'multer';
import path from 'path';
const BlogController = require('../controller/blogController');

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req: express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (req: express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + path.extname(file.originalname));
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