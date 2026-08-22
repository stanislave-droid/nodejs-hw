import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    throw createHttpError({ status: 404, message: 'Note not found' });
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = req.body;
  const newNote = await Note.create(note);
  res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const deletedNote = await Note.findOneAndDelete({ _id: noteId });
  if (!deletedNote) {
    throw createHttpError({ status: 404, message: 'Note not found' });
  }
  res.status(200).json(deletedNote);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const updatedNote = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });
  if (!updatedNote) {
    throw createHttpError({ status: 404, message: 'Note not found' });
  }

  res.status(200).json(updatedNote);
};
