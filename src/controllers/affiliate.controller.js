
import { AffiliateProduct } from "../models/AffiliateProduct.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createAffiliateProduct = async (req, res, next) => {
  try {
    const doc = await AffiliateProduct.create(req.body);
    res
      .status(201)
      .json(ApiResponse.created(doc, "Affiliate product created"));
  } catch (err) {
    // Catch Mongoose validation / cast errors
    if (err.name === "ValidationError") {
      return next(new ApiError(400, "Invalid payload", err.errors));
    }
    next(err);
  }
};

/* -----------------------------------------------------
   GET ALL AFFILIATE PRODUCTS (paginated, public-safe)
   ----------------------------------------------------- */
export const getAffiliateProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10); // hard cap
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      AffiliateProduct.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(), // faster + safer for public APIs

      AffiliateProduct.countDocuments(),
    ]);

    res.status(200).json(
      ApiResponse.ok(
        {
          items,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
        "Affiliate products fetched"
      )
    );
  } catch (err) {
    next(err);
  }
};

/* -----------------------------------------------------
   GET LATEST AFFILIATE PRODUCT (public endpoint)
   ----------------------------------------------------- */
export const getLatestAffiliateProduct = async (req, res, next) => {
  try {
    const latest = await AffiliateProduct.findOne({})
      .sort({ createdAt: -1 })
      .lean();

    if (!latest) {
      return next(new ApiError(404, "No affiliate product found"));
    }

    res
      .status(200)
      .json(ApiResponse.ok(latest, "Latest affiliate product fetched"));
  } catch (err) {
    next(err);
  }
};
