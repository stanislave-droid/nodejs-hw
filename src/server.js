import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import notesRouter from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(logger);

app.use(cookieParser());

app.use(notesRouter);

app.use(authRouter);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => {
  console.log('Server is running on a port: ' + port);
});
