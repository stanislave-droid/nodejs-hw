import createHttpError from 'http-errors';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookie } from '../services/auth.js';
import Session from '../models/session.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });

  if (isUser) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword });

  const newSession = await createSession(newUser._id);
  setSessionCookie(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, isUser.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({ userId: isUser._id });

  const newSession = await createSession(isUser._id);
  setSessionCookie(res, newSession);

  res.status(200).json(isUser);
};

export const refreshUserSession = async (req, res) => {
  const { sessionId } = req.cookies;
  const session = await Session.findById(sessionId);

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const expireRefreshToken = session.refreshTokenValidUntil < new Date();

  if (expireRefreshToken) {
    throw createHttpError(401, 'Session token expired');
  }

  await Session.deleteOne({ _id: sessionId });

  const newSession = await createSession(session.userId);
  setSessionCookie(res, newSession);

  res.status(200).json({ message: 'Session refreshed' });
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
