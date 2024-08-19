import { ObjectId } from "mongodb";


export type AddSubCategoryDTO = {
    userID: ObjectId;
    categoryID: ObjectId;
    name: string;
}