import { ObjectId } from "mongodb";


export type AddCategoryDTO = {
    userID: ObjectId;
    name: string;
    parent: string;
}