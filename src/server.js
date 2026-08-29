import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import notesRouter from './routes/notesRoutes.js';
import { errors } from 'celebrate';

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

app.use(cors());

app.use(logger);

app.use(notesRouter);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => {
  console.log('Server is running on a port: ' + port);
});
