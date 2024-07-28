import { ObjectId } from "mongodb";
import { ItemsInStock, ItemsNotInStock } from "../../types/user";


export type StaffOrderDTO = {
    staffID: ObjectId;
    department: string;
    branch: string;
    inStock: ItemsInStock[]
    notInStock: ItemsNotInStock[]
}