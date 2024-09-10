import app from './app';
import dotenv from 'dotenv';

dotenv.config(); 
// Define port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
