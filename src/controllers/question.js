import { v4 as uuidv4 } from 'uuid';
import questionModel from '../models/question.js'

export const CREATE_QUESTION = async (req, res) => {
    try {
        const question = new questionModel({
            id: uuidv4(),
            question_text: req.body.question_text,
            question_title: req.body.question_title,
            date: new Date(),
            user_id: req.user.user_id
        })

        const response = await question.save();

        return res.status(200).json({response: response})
    }catch(err){
        return console.log({err: err})
    }
};

export const GET_ALL_QUESTIONS = async (req, res) => {
    try {
        const questions = await questionModel.find()
        return res.status(200).json(questions)
    }catch(err){
        return console.log({err: err})
    }
};

export const DELETE_QUESTION_BY_ID = async (req, res) => {
    try {
        const question = await questionModel.findOneAndDelete({ id: req.params.id });

        if (!question) {
            return res.status(404).json('There is no question with such an id');
        }

        return res.status(200).json({ message: 'Question was deleted successfully', deletedQuestion: question });

    }catch(err){
        return console.log({err: err})
    }
}

export const GET_QUESTION_BY_ID = async (req, res) => {
    try {
        const question = await questionModel.findOne({ id: req.params.id });

        if (!question) {
            return res.status(404).json('There is no question with such an id');
        }

        return res.status(200).json({ message: 'Question retrieved successfully', question: question });

    } catch (err) {
        console.log({ err: err });
        return res.status(500).json('An error occurred while retrieving the question');
    }
}