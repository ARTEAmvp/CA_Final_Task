import express from 'express'
import { SIGN_UP, LOG_IN } from '../controllers/user.js'
import { userValidation } from '../../validation/userValidation.js'
import validateData from '../middleware/validation.js'

const router = express.Router()

router.post('/register', validateData(userValidation), SIGN_UP)
router.post('/login', LOG_IN)

export default router