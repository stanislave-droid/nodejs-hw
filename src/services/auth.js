import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import Session from '../models/session.js';
import crypto from 'crypto';

export const createSession = (userId) => {
  const accessToken = crypto.randomUUID();
  const refreshToken = crypto.randomUUID();
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  const newSession = Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
  return newSession;
};

export const setSessionCookie = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });

  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: ONE_DAY,
  });
};
