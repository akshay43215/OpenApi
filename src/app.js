
import express from 'express';
import helmet  from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import dataRoutes from './routes/affiliate.routes.js';
import {limiter} from  './middlewares/rateLimiter.middleware.js';
import {errorHandler} from './middlewares/error.middleware.js'; 



const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(limiter);

app.use(
  "/public",
  express.static(path.join(__dirname, "../public"))
);

app.use('/api/v1/data', dataRoutes);
app.use(errorHandler);

export default app;