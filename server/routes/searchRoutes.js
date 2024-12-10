import express from 'express';
import { searchQuestions, searchCategories, advancedSearch } from '../controllers/searchController.js';

const router = express.Router();

// Search routes
router.get('/questions', searchQuestions);
router.get('/categories', searchCategories);
router.get('/advanced', advancedSearch);

export default router;
