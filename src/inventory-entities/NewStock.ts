import {Schema, Document, model} from 'mongoose'
import { ModelNames } from './models.names';

// itemList: {
//     name: string;
//     category: string;
//     brand: string;
//     quantity: number;
//     price: number;
//     unit: string
//   }[]

export class NewStock extends Document {
    itemList: {
        name: string;
        category: string;
        brand: string;
        quantity: number;
        price: number;
        unit: string;
        isInStock: boolean 
    }
}

export const NewStockSchema = new Schema(
    {
        itemList: [{
            name: {type: String, required: true, trim: true},
            category: {type: String, required: true},
            brand: {type: String, required: true},
            quantity: {type: String, required: true},
            price: {type: Number, required: true},
            unit: {type: String, required: true},
            isInStock: {type: Boolean, default: false}
        }],
    }
)

export const NewStockModel = model<NewStock>(ModelNames.NEWSTOCK, NewStockSchema)