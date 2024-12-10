import Question from '../models/Question.js';
import Category from '../models/Category.js';
import asyncHandler from 'express-async-handler';

// @desc    Search questions
// @route   GET /api/search/questions
// @access  Public
export const searchQuestions = asyncHandler(async (req, res) => {
    const { query, category, difficulty } = req.query;
    
    const searchQuery = {};
    
    // Add text search if query is provided
    if (query) {
        searchQuery.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ];
    }
    
    // Add category filter if provided
    if (category) {
        searchQuery.category = category;
    }
    
    // Add difficulty filter if provided
    if (difficulty) {
        searchQuery.difficulty = difficulty;
    }
    
    const questions = await Question.find(searchQuery)
        .populate('category', 'name')
        .select('-correctAnswer'); // Exclude correct answer from results
        
    res.json({
        success: true,
        count: questions.length,
        data: questions
    });
});

// @desc    Search categories
// @route   GET /api/search/categories
// @access  Public
export const searchCategories = asyncHandler(async (req, res) => {
    const { query } = req.query;
    
    const searchQuery = {};
    
    if (query) {
        searchQuery.$or = [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ];
    }
    
    const categories = await Category.find(searchQuery);
    
    res.json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// @desc    Advanced search with aggregation
// @route   GET /api/search/advanced
// @access  Public
export const advancedSearch = asyncHandler(async (req, res) => {
    const { query, category, difficulty, sortBy, limit = 10, page = 1 } = req.query;
    
    const searchQuery = {};
    
    if (query) {
        searchQuery.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ];
    }
    
    if (category) {
        searchQuery.category = category;
    }
    
    if (difficulty) {
        searchQuery.difficulty = difficulty;
    }
    
    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sortOptions = {};
    if (sortBy) {
        const [field, order] = sortBy.split(':');
        sortOptions[field] = order === 'desc' ? -1 : 1;
    }
    
    const questions = await Question.find(searchQuery)
        .populate('category', 'name')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-correctAnswer');
        
    // Get total count for pagination
    const total = await Question.countDocuments(searchQuery);
    
    res.json({
        success: true,
        count: questions.length,
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
        currentPage: parseInt(page),
        data: questions
    });
});
