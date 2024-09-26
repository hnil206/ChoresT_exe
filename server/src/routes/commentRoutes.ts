import express from 'express';
import { createComment, getComments, updateComment, deleteComment } from '../controller/comment.Controller';
import { verifyToken } from '../middlewares';

const router = express.Router();

router.post('/', verifyToken, createComment);
router.get('/:housemaidId', getComments);
router.put('/:commentId', verifyToken, updateComment);
router.delete('/:commentId', verifyToken, deleteComment);

export default router;