import { ObjectId } from "mongodb";


export type CategoryDTO = {
    userID: ObjectId;
    name: String;
    parent: String;
}