import express from 'express';
import {createNote} from '../controllers/note.js';

const router = express.Router();


router.post(`/create`, createNote);




module.exports = router;
