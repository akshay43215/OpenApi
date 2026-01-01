
// import mongoose, { mongo } from 'mongoose';

// const DataSchema = new mongoose.Schema({
//   payload: {
//     type: mongoose.Schema.Types.Mixed, // any JSON data
//     required: true
//   }
// },
//   { timestamp: true }
// );

// export const Data = mongoose.model('Data', DataSchema);

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
AffiliateProductSchema.index({ "payload.asin": 1 });

export const AffiliateProduct = model(
  "AffiliateProduct",
  AffiliateProductSchema
);

