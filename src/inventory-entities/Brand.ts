import {Schema, Document, model} from 'mongoose';
import { ModelNames } from './models.names';
import { ObjectId } from 'mongodb';


export class Brand extends Document {
    userID: ObjectId;
    name: string;
}

const BrandSchema = new Schema (
    {
        userID: {type: String, required: true, ref: ModelNames.USER},
        name: {type: String, required: true, trim: true}
    },
    {
        timestamps: true
    }
);

export const BrandModel = model<Brand>(ModelNames.BRAND, BrandSchema)

