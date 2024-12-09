import Question from '../models/Question.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
export const getQuestions = asyncHandler(async (req, res) => {
    const { category, difficulty } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter)
        .populate('category', 'name')
        .populate('createdBy', 'name')
        .select('-correctAnswer -explanation');
    
    res.json(questions);
});

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Public
export const getQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id)
        .populate('category', 'name')
        .populate('createdBy', 'name')
        .select('-correctAnswer -explanation');
    
    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }
    
    res.json(question);
});

// @desc    Create question
// @route   POST /api/questions
// @access  Private/Admin
export const createQuestion = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        category,
        difficulty,
        points,
        correctAnswer,
        options,
        explanation
    } = req.body;

    const question = await Question.create({
        title,
        description,
        category,
        difficulty,
        points,
        correctAnswer,
        options,
        explanation,
        createdBy: req.user.id
    });

    res.status(201).json(question);
});

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private/Admin
export const updateQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);

    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    res.json(updatedQuestion);
});

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
export const deleteQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);

    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    await question.remove();
    res.json({ message: 'Question removed' });
});

// @desc    Check answer
// @route   POST /api/questions/:id/check
// @access  Private
export const checkAnswer = asyncHandler(async (req, res) => {
    const { answer } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    const isCorrect = answer === question.correctAnswer;
    
    res.json({
        isCorrect,
        explanation: isCorrect ? question.explanation : null,
        points: isCorrect ? question.points : 0
    });
});
