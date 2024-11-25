import { ObjectId } from "mongodb";
import { Units } from "../../types/user";


export type AddProductDTO = {
    userID: ObjectId;
    name: string;
    brandID: ObjectId;
    categoryID: ObjectId;
    quantity: number;
    unit: Units;
    isInStock: boolean;
}