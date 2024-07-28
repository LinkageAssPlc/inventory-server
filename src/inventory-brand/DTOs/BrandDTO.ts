import { ObjectId } from "mongodb";


export type AddBrandDTO = {
    userID: ObjectId;
    name: string;
}