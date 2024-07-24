import { ObjectId } from 'mongodb'
import {Schema, Document, model} from 'mongoose'
import { ItemsInStock, ItemsNotInStock, Units } from '../types/user';
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
        staffID: {type: ObjectId, required: true, ref: ModelNames.USER},
        department: {type: String, required: true},
        inStock: [{
            productID: {type: ObjectId,required: true, ref: ModelNames.PRODUCT},
            quantity: {type: Number, required: true, default: 1},
            unit: {type: String, enum: [Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS], default: Units.UNIT, required: true},
        }],
        notInStock: [{
            productName: {type: String},
            quantity: {type: Number},
            unit: {type: String, enum: [Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS], default: Units.UNIT},
        }]
    }
)

export const StaffOrderModel = model<StaffOrder>(ModelNames.STAFFORDER, StaffOrderSchema)