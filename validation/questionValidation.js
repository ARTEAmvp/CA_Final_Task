import Joi from "joi";

export const questionValidation = Joi.object({
    question_text: Joi.string().required(),
    question_title: Joi.string().required()
})