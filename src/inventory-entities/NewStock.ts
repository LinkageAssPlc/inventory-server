import {Schema, Document, model} from 'mongoose'
import {ObjectId} from 'mongodb'
import { ModelNames } from './models.names';


export class NewStock extends Document {
    userID: ObjectId;
    itemsListID: ObjectId;
}

export const NewStockSchema = new Schema(
    {
        userID: {type: ObjectId, required: true, ref: ModelNames.USER},
        itemsListID: {type: ObjectId, ref: ModelNames.USER},
    },
    {
        timestamps: true
    }

)

export const NewStockModel = model<NewStock>(ModelNames.NEWSTOCK, NewStockSchema)