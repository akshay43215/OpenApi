
// // import {Router} from 'express'
// // import {dataSchema} from '../validators/data.validator'
// // import {asyncHandler} from '../middlewares/asyncHandler';
// // import { validate } from '../middlewares/validate.middleware';

// // import {
// //   createData,
// //   getAllData,
// //   getLatestData,
// //   updateData,
// //   deleteData
// // } from '../controllers/data.controller';

// // const router = Router();

// // router.post('/', validate(dataSchema), asyncHandler(createData));
// // router.post('/', asyncHandler(getAllData));
// // router.get('/latest', asyncHandler(getLatestData));
// // router.put('/:id', validate(dataSchema), asyncHandler(updateData));
// // router.put('/:id', asyncHandler(deleteData));

// // export default router;

// import { Router } from "express";
// import { asyncHandler } from "../middlewares/asyncHandler.js";
// import { validate } from "../middlewares/validate.middleware.js";
// import { dataSchema } from "../validators/data.validator.js";
// import {
//   createData,
//   getAllData,
//   getLatestData,
//   updateData,
//   deleteData,
// } from "../controllers/data.controller.js";

// const router = Router();

// // router.post("/", validate(dataSchema), asyncHandler(createData));
// router.post(
//   "/",
//   validate(dataSchema),
//   asyncHandler(createData)
// );

// router.get("/", asyncHandler(getAllData));
// router.get("/latest", asyncHandler(getLatestData));
// router.put("/:id", validate(dataSchema), asyncHandler(updateData));
// router.delete("/:id", asyncHandler(deleteData));

// // console.log("dataSchema:", dataSchema);

// export default router;
