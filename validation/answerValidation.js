import Joi from "joi";

export const answerValidation = Joi.object({
    answer_text: Joi.string().required(),
    question_id: Joi.string()
})