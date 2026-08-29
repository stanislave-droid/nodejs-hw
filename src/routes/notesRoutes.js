import { Router } from 'express';
import {
  getNoteById,
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const notesRouter = new Router();

notesRouter.get(
  '/notes',
  celebrate(getAllNotesSchema, { abortEarly: false }),
  getAllNotes,
);

notesRouter.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

notesRouter.post('/notes', celebrate(createNoteSchema), createNote);

notesRouter.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

notesRouter.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default notesRouter;
