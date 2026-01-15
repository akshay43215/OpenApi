
import { ApiError } from "../utils/ApiError.js";
import { AffiliateProduct } from "../models/AffiliateProduct.model.js";

export const validatePayload = async(req, res, next) => {
  if (!req.body || typeof req.body !== "object") {
    return next(new ApiError(400, "Request body must be JSON"));
  }
  
  const { payload } = req.body;
  if (!payload || typeof payload !== "object") {
    return next(
      new ApiError(400, "`payload` is required and must be an object")
    );
  }

  // ASIN mandatory
  if (!payload.Asin || typeof payload.Asin !== "string") {
    return next(new ApiError(400, "`payload.Asin` is required"));
  }

  // Normalize ASIN
  payload.Asin = payload.Asin.trim().toUpperCase();

   // ✅ Correct duplicate check
  // const exists = await AffiliateProduct
  //   .findOne({ "payload.Asin": payload.Asin })
  //   .lean();

  // if (exists) {
  //   return next(
  //     new ApiError( 
  //       409, `Affiliate product with ASIN ${payload.Asin} already exists`
  //     )
  //   );
  // }
  
  next();
};
