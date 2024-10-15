import { Request, Response } from 'express';
const Blog = require('../model/Blog');

export const createBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content, image } = req.body; // Thêm date vào đây

        const newBlog = new Blog({
            title,
            content,
            image,
            date: new Date()
        });

        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating blog', error });
    }
};

export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' });
            return;
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content } = req.body;
        const image = req.file ? req.file.path : undefined;
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content, image, updatedAt: Date.now() },
            { new: true }
        );
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' });
            return;
        }
        res.json(blog);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' });
            return;
        }
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
