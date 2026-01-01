
import {env} from  '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  const errorCode = err.statusCode || 500;
  res.status(errorCode).json({
    sucess: false,
    message: err.message || 'Internal Server Error',
    errors: env.NODE_ENV === 'development' ? err.errors || err.stack : undefined,
  });
};