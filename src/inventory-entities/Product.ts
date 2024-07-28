import { Schema, Document, model } from "mongoose";

import { ModelNames } from "./models.names";


export class Product extends Document {
    name: string;
}

export const ProductSchema  = new Schema (
    {
        name: {type: String, required: true, trim: true},
    },
    {
        timestamps: true
    }
)

export const ProductModel = model<Product>(ModelNames.PRODUCT, ProductSchema)

