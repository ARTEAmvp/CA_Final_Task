import express from 'express'
import { answerValidation } from '../../validation/answerValidation.js'
import validateData from '../middleware/validation.js'
import { auth } from '../middleware/auth.js'
import { GET_ANSWERS, POST_ANSWER, DELETE_ANSWER } from '../controllers/answer.js'

const router = express.Router()

router.get('/question/:id/answers', GET_ANSWERS);
router.post('/question/:id/answer', validateData(answerValidation), POST_ANSWER);
router.delete('/answer/:id', auth, DELETE_ANSWER);

export default router