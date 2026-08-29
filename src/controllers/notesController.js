import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { search, tag, page = 1, perPage = 10 } = req.query;

  const customQuery = Note.find();

  if (search) {
    customQuery.where({
      $or: [
        {
          title: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          content: {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    });
  }

  if (tag) {
    customQuery.where('tag').equals(tag);
  }

  const skip = (page - 1) * perPage;

  customQuery.skip(skip).limit(perPage);

  const [notes, totalNotes] = await Promise.all([
    customQuery.clone().sort({ _id: 'asc' }),
    customQuery.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({ page, perPage, totalNotes, totalPages, notes });
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
