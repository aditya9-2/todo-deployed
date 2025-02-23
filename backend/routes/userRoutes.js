import express from "express";
import { createAccount } from "../controllers/userController.js";
import { loginUser } from "../controllers/loginController.js";
import addNote from "../controllers/addNoteController.js";
import authenticationToken from "../middlewares/authenticationToken.js";
import editNote from "../controllers/editNoteController.js";
import getAllNotes from "../controllers/getAllNotesController.js";
import deleteNote from "../controllers/deleteNoteController.js";
import isPinned from "../controllers/isPinnedNoteController.js";
import getUser from "../controllers/getUsersContoller.js";
import searchNotes from "../controllers/searchNotesController.js";


const router = express.Router();

router.post('/create-account', createAccount);
router.post('/login', loginUser);
router.post('/add-note', authenticationToken, addNote);
router.put('/edit-note/:noteId', authenticationToken, editNote);
router.put('/update-note-pinned/:noteId', authenticationToken, isPinned);
router.delete('/delete-note/:noteId', authenticationToken, deleteNote);
router.get('/get-all-notes', authenticationToken, getAllNotes);
router.get('/get-user', authenticationToken, getUser);
router.get('/search-notes', authenticationToken, searchNotes);


export default router;