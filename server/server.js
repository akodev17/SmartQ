import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Import user routes
import searchRoutes from './routes/searchRoutes.js';
import errorHandler from './middleware/error.js';

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes); // Use user routes
app.use('/api/search', searchRoutes); // Add search routes

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});