import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { search, tag, page = 1, perPage = 10 } = req.query;
  const userId = req.user._id;

  const customQuery = Note.find({ userId });

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

  if (!notes) {
    throw createHttpError(404, 'Note not found');
  }

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({ page, perPage, totalNotes, totalPages, notes });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;
  const note = await Note.findOne({ _id: noteId, userId });
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = req.body;
  const userId = req.user._id;
  const newNote = await Note.create({ ...note, userId });
  res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;
  const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId });
  if (!deletedNote) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(deletedNote);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user._id;
  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId, userId },
    req.body,
    {
      returnDocument: 'after',
    },
  );
  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updatedNote);
};
