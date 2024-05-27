import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    answer_text: { type: String, required: true },
    date: { type: Date, required: true },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    question_id: { type: String, required: true }
});

export default mongoose.model('Answer', answerSchema);
