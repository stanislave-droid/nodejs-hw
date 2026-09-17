import createHttpError from 'http-errors';
import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedType = 'image/';

    if (file.mimetype.startsWith(allowedType)) {
      cb(null, true);
    } else {
      cb(
        createHttpError(
          400,
          'Invalid file type. Only JPEG JPG PNG WEBP GIF are allowed',
        ),
        false,
      );
    }
  },
});
