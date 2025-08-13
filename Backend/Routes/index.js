import express from 'express'
import dotenv from 'dotenv';
import {signup ,Login ,SaveHistory ,GetHistory,verify} from '../Controller/taskController.js';

dotenv.config();
const router = express.Router();


router.post('/signup',signup)
router.post('/login', Login)
router.post('/History',SaveHistory)
router.post('/getHistory',GetHistory)
router.post('/verify',verify)


export default router;
