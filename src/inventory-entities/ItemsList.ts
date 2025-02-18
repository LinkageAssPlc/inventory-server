import {Schema, Document, model} from 'mongoose'
import { ObjectId } from 'mongodb'
import { Units } from '../types/user';
import { ModelNames } from './models.names';


export class ItemsList extends Document {
    userID: ObjectId;
    lists: {
        productID: ObjectId;
        categoryID: ObjectId;
        brandID: ObjectId;
        quantity: number;
        price: number;
        unit: Units;
        isInStock: boolean 
    }[]
}

export const ItemsListSchema = new Schema(
    {
        userID: {type: ObjectId, required: true, ref: ModelNames.USER},
        lists: [{
            productID: {type: ObjectId, required: true, ref: ModelNames.PRODUCT},
            categoryID: {type: ObjectId, required: true, ref: ModelNames.CATEGORY},
            brandID: {type: ObjectId, required: true, ref: ModelNames.BRAND},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true},
            unit: {type: String, enum: [Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS, Units.BOOKLET], default: Units.UNIT, required: true},
            isInStock: {type: Boolean, default: true}
        }],
    },
    {
        timestamps: true,
    }
)

export const ItemsListModel = model<ItemsList>(ModelNames.ITEMSLIST, ItemsListSchema)