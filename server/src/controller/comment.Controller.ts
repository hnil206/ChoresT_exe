import { Request, Response } from 'express';
import { Comment } from '../model/comment.model';
import { User } from '../model/user.model';
export const createComment = async (req: Request, res: Response) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { housemaidId, content, rating } = req.body;

        // Validate request body
        if (!housemaidId || !content || rating === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Validate rating
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Invalid rating' });
        }

        // Check if housemaid exists
        const housemaid = await User.findById(housemaidId);
        if (!housemaid) {
            return res.status(404).json({ message: 'Housemaid not found' });
        }

        const newComment = new Comment({
            user: req.user.id,
            housemaid: housemaidId,
            content,
            rating
        });

        const createdComment = await newComment.save();

        res.status(201).json({ message: 'Comment created successfully', data: createdComment });
    } catch (error: any) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { housemaidId } = req.params;
    const comments = await Comment.find({ housemaid: housemaidId }).populate('user', 'username');
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content, rating } = req.body;
    const userId = req.user!.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.content = content;
    comment.rating = rating;
    await comment.save();

    res.status(200).json({ message: 'Comment updated successfully', data: comment });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating comment', error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.user!.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};