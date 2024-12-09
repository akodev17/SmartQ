import mongoose from 'mongoose';

const userAnswerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  option_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option',
    required: true
  },
  is_correct: {
    type: Boolean
  }
});

export default mongoose.model('UserAnswer', userAnswerSchema);
