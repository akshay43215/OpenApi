
import { ApiError } from "../utils/ApiError.js";

export const validatePayload = (req, res, next) => {
  if (!req.body || typeof req.body !== "object") {
    return next(new ApiError(400, "Request body must be JSON"));
  }

  if (!req.body.payload || typeof req.body.payload !== "object") {
    return next(
      new ApiError(400, "`payload` is required and must be an object")
    );
  }

  next();
};
