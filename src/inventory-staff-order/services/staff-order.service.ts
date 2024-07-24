// import httpStatus from "http-status";

// import { StaffOrderDTO } from "../DTOs/StaffOrderDTO";
// import { getUser } from "../../inventory-accounts/user/services";
// import { NewStockModel } from "../../inventory-entities/NewStock";
// import { ProductModel } from "../../inventory-entities/Product";
// import { CategoryModel } from "../../inventory-entities/Category";
// import { BrandModel } from "../../inventory-entities/Brand";


// export const StaffOrderService = async ({staffID, department, inStock, notInStock}: StaffOrderDTO) => {
//     const user = await getUser({userID: staffID});
//     if (!user) return {success: false, status: httpStatus.NOT_FOUND, message: `user not found`, data: null}

//     let shouldError = false;
//     let errors: any = [];

//     await Promise.all(
//         itemList.map(
//             async(item, index) => {
//                 const productExist = await ProductModel.find({_id: item.productID})
//                 const categoryExist = await CategoryModel.find({_id: item.categoryID})
//                 const brandExist = await BrandModel.find({_id: item.brandID})

//                 if (!productExist || !categoryExist || !brandExist) {
//                     shouldError = true;
//                 }

//                 if (!productExist[index]) {
//                     errors.push(`ProductID of item ${index} is invalid or empty`)
//                     shouldError = true;

//                 } else if (!categoryExist[index]) {
//                     errors.push(`CategoryID of item ${index} is invalid or empty`)
//                     shouldError = true;

//                 } else if (!brandExist[index]) {
//                     errors.push(`BrandID of item ${index} is invalid or empty`)
//                     shouldError = true;

//                 }
//             }
//         )
//     )

//     // const productExist = await ProductModel.find({_id: productID})
//     // if(!productExist) return {success: false, status: httpStatus.NOT_FOUND, message: `Product doesn't exist`, data: productExist}

//     // const categoryExist = await CategoryModel.find({_id: categoryID})
//     // if(!categoryExist) return {success: true, status: httpStatus.NOT_FOUND, message: `Category doesn't exist`, data: categoryExist}

//     // const brandExist = await BrandModel.find({_id: brandID})
//     // if(!brandExist) return {success: true, status: httpStatus.NOT_FOUND, message: `Brand doesn't exist`, data: brandExist}

//     if (shouldError) return {success: false, status: httpStatus.BAD_REQUEST, message: `invalid stock items`, data: errors};
    

//     const newStock = await NewStockModel.create({userID, itemList});
//     return {success: true, status: httpStatus.CREATED, message: `NewStock created!`, data: newStock};

// }
