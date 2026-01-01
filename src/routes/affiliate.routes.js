
import { Router } from "express";
import { validatePayload } from "../middlewares/mongooseValidate.middleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  createAffiliateProduct,
  getAffiliateProducts,
  getLatestAffiliateProduct,
} from "../controllers/affiliate.controller.js";

const router = Router();

router.post(
  "/",
  validatePayload,            // 👈 NO ZOD HERE
  asyncHandler(createAffiliateProduct)
);
router.get("/", asyncHandler(getAffiliateProducts));
router.get("/latest", asyncHandler(getLatestAffiliateProduct));

export default router;
