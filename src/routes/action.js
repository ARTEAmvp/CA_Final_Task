import express from 'express'
import { auth } from '../middleware/auth.js'
import { TOGGLE_LIKE_DISLIKE } from '../controllers/action.js';

const router = express.Router()

router.post('/answer/:id/toggle-like-dislike', auth, TOGGLE_LIKE_DISLIKE);

export default router