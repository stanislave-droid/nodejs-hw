import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  res.status(500).json({
    message: 'Internal server error',
    error:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong, try again later'
        : err.message,
  });
};
