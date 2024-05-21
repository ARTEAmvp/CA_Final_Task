import Answer from '../models/answer.js';
import Question from '../models/question.js';
import { v4 as uuidv4 } from 'uuid';

export const GET_ANSWERS = async (req, res) => {
    try {
        const answers = await Answer.find({ question_id: req.params.id });
        res.status(200).json(answers);
    } catch (err) {
        console.log({ err: err });
        res.status(500).json({ message: 'Error retrieving answers' });
    }
};

export const POST_ANSWER = async (req, res) => {
    const answer_text = req.body.answer_text;
    const question_id = req.params.id;

    try {
        const question = await Question.findOne({ id: question_id });
        if (!question) {
            return res.status(404).json({ message: 'Question with such an ID was not found' });
        }

        const newAnswer = new Answer({
            id: uuidv4(),
            answer_text,
            date: new Date(),
            question_id
        });

        await newAnswer.save();
        res.status(201).json(newAnswer);
    } catch (err) {
        console.log({ err: err });
        res.status(500).json({ message: 'Error posting answer' });
    }
};

export const DELETE_ANSWER = async (req, res) => {
    try {
        const answer = await Answer.findOneAndDelete({id: req.params.id});
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        res.status(200).json({ message: 'Answer deleted successfully' });
    } catch (err) {
        console.log({ err: err });
        res.status(500).json({ message: 'Error deleting answer' });
    }
};