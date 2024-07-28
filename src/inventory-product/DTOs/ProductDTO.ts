import { ObjectId } from "mongodb";


export type AddProductDTO = {
    userID: ObjectId;
    name: string;
}