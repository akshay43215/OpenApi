
// // import { Data } from "../models/Data.model.js";
// import { AffiliateProduct } from "../models/AffiliateProduct.model.js";

// import {ApiError} from "../utils/ApiError.js"

// export const createData = async (req, res)=> {
//   const doc = await AffiliateProduct.create(req.body);
//   res.status(201).json({success: true, data:doc});
// };

// export const  getAllData = async (req, res)=>{
//   const docs = await AffiliateProduct.find().sort({createdAt: -1});
//   req.json({success:true, data:docs})
// };

// export const getLatestData = async (req, res)=>   {
//   const doc =  await AffiliateProduct.findOne().sort({createdAt: -1});
//   if(!doc) throw new ApiError(404, 'No data found');
//   res.json({success:true, data:doc});
// };

// export const updateData = async (req,res)=> {
//   const doc = await AffiliateProduct.findByIdAndUpdate(
//     req.param.id,
//     req.body,
//     {new: true}
//   );
//   if(!doc) throw new ApiError(404, 'Data not found');
//   res.json({succees:true, data:doc});
// };

// export const deleteData = async (req, res)=> {
//   const doc = await AffiliateProduct.findOneAndDelete(req.param.id);
//   if(!doc) throw new ApiError(404, 'Data not found');
//   res.json({success:true, message: 'Detailed successfuly'});
// };
