
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AffiliateProductSchema = new Schema(
  {
    payload: {
      type: Schema.Types.Mixed, // fully dynamic JSON
      required: true,
    },
    
  },
  {
    timestamps: true,
    minimize: false, // keep empty objects if sent
  }
);

// Optional but HIGHLY recommended for performance
AffiliateProductSchema.index({ "payload.Asin": 1 }, { unique: true });

export const AffiliateProduct = model(
  "AffiliateProduct",
  AffiliateProductSchema
);

