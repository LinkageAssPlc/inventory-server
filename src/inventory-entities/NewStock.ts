import {Schema, Document, model} from 'mongoose'
import {ObjectId} from 'mongodb'
import { ModelNames } from './models.names';

import { Units } from '../types/user';


export class NewStock extends Document {
    userID: ObjectId;
    itemList: {
        productID: ObjectId;
        categoryID: ObjectId;
        brandID: ObjectId;
        quantity: number;
        price: number;
        unit: Units;
        isInStock: boolean 
    }[]
}

export const NewStockSchema = new Schema(
    {
        userID: {type: ObjectId, required: true, ref: ModelNames.USER},
        itemList: [{
            productID: {type: ObjectId, required: true, ref: ModelNames.PRODUCT},
            categoryID: {type: ObjectId, required: true, ref: ModelNames.CATEGORY},
            brandID: {type: ObjectId, required: true, ref: ModelNames.BRAND},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true},
            unit: {type: String, enum: [Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS], default: Units.UNIT, required: true},
            isInStock: {type: Boolean, default: true}
        }],
    },
    {
        timestamps: true
    }

)

export const NewStockModel = model<NewStock>(ModelNames.NEWSTOCK, NewStockSchema)