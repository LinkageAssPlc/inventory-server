import { Schema, Document, model } from "mongoose";

import { ModelNames } from "./models.names";
import { ObjectId } from "mongodb";


export class Product extends Document {
    userID: ObjectId;
    name: string;
}

export const ProductSchema  = new Schema (
    {
        userID: {type: ObjectId, required: true, ref: ModelNames.USER},
        name: {type: String, required: true, trim: true},
    }
)

export const ProductModel = model<Product>(ModelNames.PRODUCT, ProductSchema)

