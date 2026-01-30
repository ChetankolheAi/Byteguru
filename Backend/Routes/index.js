import express from 'express'
import dotenv from 'dotenv';
import {SaveHistory ,GetHistory,CodeAnalyser ,GeminiAPI} from '../Controller/taskController.js';
import {signup ,Login ,verify} from '../Controller/LoginSignup.js'
import { TestGenerator , TestScoreCalculator , RetriveTestScore , SaveTestScore } from '../Controller/TestController.js'

dotenv.config();
const router = express.Router();


router.post('/signup',signup)
router.post('/login', Login)
router.post('/History',SaveHistory)
router.post('/getHistory',GetHistory)
router.post('/verify',verify)
router.post('/CodeAnalyser',CodeAnalyser)
router.post('/gemini',GeminiAPI)

//Test
router.post('/addTestScore',SaveTestScore)
router.get("/getTestScores/:userid",RetriveTestScore );
router.post('/TestScoreCalculator',TestScoreCalculator)
router.get('/questions/:level',TestGenerator)




export default router;
