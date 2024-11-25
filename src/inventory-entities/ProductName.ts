import { Schema, Document, model } from "mongoose";

import { ModelNames } from "./models.names";
import { ObjectId } from "mongodb";


export class ProductName extends Document {
    userID: ObjectId;
    name: string;
}

export const ProductNameSchema  = new Schema (
    {
        userID: {type: ObjectId, required: true, ref: ModelNames.USER},
        name: {type: String, required: true, trim: true},
    },
    {
        timestamps: true
    }
)

export const ProductNameModel = model<ProductName>(ModelNames.PRODUCTNAME, ProductNameSchema)

