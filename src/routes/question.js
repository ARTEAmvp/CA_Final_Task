import express from 'express'
import { questionValidation } from '../../validation/questionValidation.js'
import validateData from '../middleware/validation.js'
import {auth} from '../middleware/auth.js'
import { DELETE_QUESTION_BY_ID, GET_ALL_QUESTIONS, CREATE_QUESTION, GET_QUESTION_BY_ID } from '../controllers/question.js'

const router = express.Router()

router.get('/questions', GET_ALL_QUESTIONS)
router.get('/question/:id', auth, GET_QUESTION_BY_ID)
router.post('/question', validateData(questionValidation), auth, CREATE_QUESTION)
router.delete('/question/:id', auth, DELETE_QUESTION_BY_ID)

export default router