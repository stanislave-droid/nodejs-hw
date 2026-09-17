import { Schema, model } from 'mongoose';
import { emailRegex } from '../constants/authConstants.js';

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: emailRegex,
    },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = model('User', userSchema);

export default User;
