
import express from 'express';
import helmet  from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

// import dataRoutes from './routes/data.routes.js';
import dataRoutes from './routes/affiliate.routes.js';
import {limiter} from  './middlewares/rateLimiter.middleware.js';
import {errorHandler} from './middlewares/error.middleware.js'; 

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(limiter);

app.use('/api/v1/data', dataRoutes);
app.use(errorHandler);

export default app;