import Category from '../models/Category.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().populate('createdBy', 'name email');
    res.json(categories);
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id).populate('createdBy', 'name email');

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    res.json(category);
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const category = await Category.create({
        name,
        description,
        createdBy: req.user.id
    });

    res.status(201).json(category);
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    category.name = name || category.name;
    category.description = description || category.description;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }

    await category.remove();
    res.json({ message: 'Category removed' });
});

export const searchCategory = asyncHandler(async (req, res) => {
    const { query } = req.query;
    const categories = await Category.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ]
    }).populate('createdBy', 'name email');
    res.json(categories);
})