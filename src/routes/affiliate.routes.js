
import { Router } from "express";
import { validatePayload } from "../middlewares/mongooseValidate.middleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  createAffiliateProduct,
  getAffiliateByAsin,
  getAffiliateProducts,
  getLatestAffiliateProduct,
  updateAffiliateProduct,
} from "../controllers/affiliate.controller.js";

const router = Router();

router.get("/", asyncHandler(getAffiliateProducts));
router.get("/latest", asyncHandler(getLatestAffiliateProduct));

router.post(
  "/",
  validatePayload,            // 👈 NO ZOD HERE
  asyncHandler(createAffiliateProduct)
);

router.get(
  "/asin/:asin",
  asyncHandler(getAffiliateByAsin)
);

router.put(
  "/asin/:asin",
  validatePayload,
  asyncHandler(updateAffiliateProduct)
);

export default router;
