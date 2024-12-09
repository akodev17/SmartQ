import express from 'express';
import {
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    checkAnswer
} from '../controllers/questionController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
    .route('/')
    .get(getQuestions)
    .post(protect, authorize('admin'), createQuestion);

router
    .route('/:id')
    .get(getQuestion)
    .put(protect, authorize('admin'), updateQuestion)
    .delete(protect, authorize('admin'), deleteQuestion);

router.post('/:id/check', protect, checkAnswer);

export default router;
