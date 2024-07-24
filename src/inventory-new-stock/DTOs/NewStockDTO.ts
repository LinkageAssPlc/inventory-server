import { ObjectId } from "mongodb";
import { Units } from "../../types/user";


export type NewStockDTO = {
    userID: ObjectId;
    itemList: {
        productID: ObjectId;
        categoryID: ObjectId;
        brandID: ObjectId;
        quantity: number;
        price: number;
        unit: Units;
        isInStock: boolean 
    }[]
}