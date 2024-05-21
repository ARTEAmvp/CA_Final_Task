import answer from '../models/answer.js';

export const GET_ANSWERS = async (req, res) => {
    try {
        const answers = await answer.find({ question_id: req.params.id });
        res.status(200).json(answers);
    } catch(err){
        return console.log({err: err})
    }
};

export const POST_ANSWER = async (req, res) => {
    const answer_text = req.body.answer_text;
    const question_id = req.params.id;

    try {
        const question = await question.findById(question_id);
        if (!question) {
            return res.status(404).json({ message: 'Question with such an ID was not found' });
        }

        const newAnswer = new answer({
            answer_text,
            date: new Date(),
            question_id
        });

        await newAnswer.save();
        res.status(201).json(newAnswer);
    } catch(err){
        return console.log({err: err})
    }
};

export const DELETE_ANSWER = async (req, res) => {
    try {
        const answer = await answer.findById(req.params.id);
        if (!answer) {
            return res.status(404).json({ message: 'answer not found' });
        }

        await answer.remove();
        res.status(200).json({ message: 'answer deleted successfully' });
    } catch(err){
        return console.log({err: err})
    }
};
