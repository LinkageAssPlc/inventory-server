import {Schema, Document, model} from 'mongoose';
import { ModelNames } from './models.names';


export class Brand extends Document {
    name: string
}

const BrandSchema = new Schema (
    {
        name: {type: String, required: true, trim: true}
    },
    {
        timestamps: true
    }
);

export const BrandModel = model<Brand>(ModelNames.BRAND, BrandSchema)

