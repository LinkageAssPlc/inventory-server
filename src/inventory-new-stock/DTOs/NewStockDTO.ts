import { ObjectId } from "mongodb";


export type AddNewStockDTO = {
    userID: ObjectId;
    itemsListID: ObjectId;
}