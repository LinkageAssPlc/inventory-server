import { ObjectId } from "mongodb";
import { Units } from "../../types/user";


export type AddNewItemsListDTO = {
    userID: ObjectId;
    lists: {
        productID: ObjectId;
        categoryID: ObjectId;
        brandID: ObjectId;
        quantity: number;
        price: number;
        unit: Units;
        isInStock: boolean 
    }[]
}