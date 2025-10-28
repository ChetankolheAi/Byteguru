import express from 'express'
import dotenv from 'dotenv';
import {signup ,Login ,SaveHistory ,GetHistory,verify,CodeAnalyser ,SaveTestScore , RetriveTestScore} from '../Controller/taskController.js';

dotenv.config();
const router = express.Router();


router.post('/signup',signup)
router.post('/login', Login)
router.post('/History',SaveHistory)
router.post('/getHistory',GetHistory)
router.post('/verify',verify)
router.post('/CodeAnalyser',CodeAnalyser)

//Test
router.post('/addTestScore',SaveTestScore)
router.get("/getTestScores/:userid",RetriveTestScore );




export default router;
