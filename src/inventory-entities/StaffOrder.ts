import { ObjectId } from 'mongodb'
import {Schema, Document, model} from 'mongoose'
import { ItemsInStock, ItemsNotInStock } from '../types/user';
import { ModelNames } from './models.names';

// staffID: ObjectId;
//   departmentID: ObjectId;
//   inStock: ItemsInStock[];
//   notInStock: ItemsNotInStock[];

export class StaffOrder extends Document {
    staffID: ObjectId;
    department: string;
    inStock: ItemsInStock[]
    notInStock: ItemsNotInStock[]
}

export const StaffOrderSchema = new Schema(
    {
        staffID: {type: ObjectId, ref: ModelNames.USER},
        department: {type: String, required: true},
        inStock: [{
            productID: {type: ObjectId, ref: ModelNames.PRODUCT},
            quantity: {type: Number, required: true},
            unit: {type: String, required: true}
        }],
        notInStock: [{
            productName: {type: String},
            quantity: {type: Number},
            unit: {type: String}
        }]
    }
)

export const StaffOrderModel = model<StaffOrder>(ModelNames.STAFFORDER, StaffOrderSchema)