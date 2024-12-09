import mongoose from 'mongoose';

const userQuizSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: {
    type: Number
  },
  completed_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('UserQuiz', userQuizSchema);
