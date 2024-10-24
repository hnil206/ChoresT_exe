import { Router } from 'express';

const router = Router();
//admin routes
// GET route for testing
router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;
