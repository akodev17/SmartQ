import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a question title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    difficulty: {
        type: String,
        required: [true, 'Please add difficulty level'],
        enum: ['easy', 'medium', 'hard']
    },
    points: {
        type: Number,
        required: [true, 'Please add points for this question'],
        min: [1, 'Points must be at least 1'],
        max: [100, 'Points cannot exceed 100']
    },
    correctAnswer: {
        type: String,
        required: [true, 'Please specify the correct answer']
    },
    options: [{
        text: {
            type: String,
            required: [true, 'Please add option text']
        },
        isCorrect: {
            type: Boolean,
            default: false
        }
    }],
    explanation: {
        type: String,
        required: [true, 'Please add an explanation for the correct answer']
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate with user answers
questionSchema.virtual('userAnswers', {
    ref: 'UserAnswer',
    localField: '_id',
    foreignField: 'question',
    justOne: false
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
