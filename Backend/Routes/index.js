import express from 'express'
import dotenv from 'dotenv';
import {signup ,Login} from '../Controller/taskController.js';

dotenv.config();
const router = express.Router();


router.post('/signup',signup)
router.post('/login', Login)

export default router;
