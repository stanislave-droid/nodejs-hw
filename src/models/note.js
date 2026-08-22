import { model, Schema } from 'mongoose';

const noteSchema = new Schema(
  {
    title: { type: String, require: true, trim: true },
    content: { type: String, trim: true, default: '' },
    tag: {
      type: String,
      enum: [
        'Todo',
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
      ],
      default: 'Todo',
    },
  },
  { timestamps: true, versionKey: false },
);

export const noteModel = model('Note', noteSchema);
