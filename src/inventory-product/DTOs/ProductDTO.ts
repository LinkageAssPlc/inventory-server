import { ObjectId } from "mongodb";


export type ProductDTO = {
    userID: ObjectId;
    name: String;
}