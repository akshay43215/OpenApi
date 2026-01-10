
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
    // Mongo duplicate index fallback
    if (err.code === 11000) {
      return next(
        new ApiError(
          409, `Affiliate product with this ASIN :${req.body.payload?.Asin} already exists`)
      );
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

export const getAffiliateByAsin = async (req, res, next) => {
  try {
    const asin = req.params.asin.trim().toUpperCase();

    const doc = await AffiliateProduct.findOne({ asin }).lean();

    if (!doc) {
      return next(new ApiError(404, "Product not found"));
    }

    res.status(200).json(ApiResponse.ok(doc));
  } catch (err) {
    next(err);
  }
};

export const updateAffiliateProduct = async (req, res, next) => {
  try {
    const asin = req.params.asin.trim().toUpperCase();
    const incomingPayload = req.body.payload;

    if (!incomingPayload || typeof incomingPayload !== "object") {
      return next(new ApiError(400, "payload object required"));
    }

    const existing = await AffiliateProduct.findOne({ asin });

    if (!existing) {
      return next(new ApiError(404, "Product not found"));
    }

    // Merge only modified fields
    const updatedPayload = {
      ...existing.payload,
      ...incomingPayload,
    };

    existing.payload = updatedPayload;

    await existing.save();

    res.status(200).json(
      ApiResponse.ok(existing, "Product updated successfully")
    );
  } catch (err) {
    next(err);
  }
};

