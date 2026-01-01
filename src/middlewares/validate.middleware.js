

// import { ApiError } from "../utils/ApiError.js";

// export const validate = (schema) => (req, res, next) => {
//   if (!schema || typeof schema.safeParse !== "function") {
//     return next(new ApiError(500, "Validation schema is undefined or invalid"));
//   }

//   // console.log("schem_ is \t"+JSON.stringify(schema));
//   console.log("schemaboy is \t"+JSON.stringify(req.body));

// // console.log("schema value:", schema);
// // console.log("has safeParse:", schema?.safeParse);


//   // const result = schema.safeParse(req.body);
//   const result = schema.safeParse(req.body['payload']);

//   console.log('got ccall back zod \t' + JSON.stringify(result));
  

//   if (!result.success) {
//     return next(
//       // new ApiError(400, "Validation failed", result.error.flatten())
//       new ApiError(400, "Validation failed", result.error._zodError)
//     );
//   }

//   req.body = result.data;
//   next();
// };
