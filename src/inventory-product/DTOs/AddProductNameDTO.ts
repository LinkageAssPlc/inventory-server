import { ObjectId } from "mongodb";

export type AddProductNameDTO = {
    userID: ObjectId;
    name: string;
}