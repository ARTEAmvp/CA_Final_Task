import Answer from '../models/answer.js'

export const TOGGLE_LIKE_DISLIKE = async (req, res) => {
    const { action } = req.body;
    const userId = req.user.id;
    const answerId = req.params.id;

    try {
        const answerRecord = await Answer.findOne({ id: answerId });
        if (!answerRecord) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        const likeIndex = answerRecord.likes.indexOf(userId);
        const dislikeIndex = answerRecord.dislikes.indexOf(userId);

        if (action === 'like') {
            if (likeIndex !== -1) {
                answerRecord.likes.splice(likeIndex, 1);
            } else {
                answerRecord.likes.push(userId);
                if (dislikeIndex !== -1) {
                    answerRecord.dislikes.splice(dislikeIndex, 1);
                }
            }
        } else if (action === 'dislike') {
            if (dislikeIndex !== -1) {
                answerRecord.dislikes.splice(dislikeIndex, 1);
            } else {
                answerRecord.dislikes.push(userId);
                if (likeIndex !== -1) {
                    answerRecord.likes.splice(likeIndex, 1);
                }
            }
        }

        await answerRecord.save();
        res.status(200).json(answerRecord);
    } catch (err) {
        console.log({ err: err });
        res.status(500).json({ message: 'Error updating likes/dislikes' });
    }
};
