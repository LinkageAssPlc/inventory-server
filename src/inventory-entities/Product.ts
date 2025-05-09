import { Schema, Document, model } from "mongoose";

import { ModelNames } from "./models.names";
import { ObjectId } from "mongodb";
import { Units } from "../types/user";


export class Product extends Document {
    userID: ObjectId;
    name: string;
    brandID: ObjectId;
    categoryID: ObjectId;
    quantity: number;
    unit: Units;
    isInStock: boolean;
}

export const ProductSchema  = new Schema (
    {
        userID: {type: ObjectId, required: true, ref: ModelNames.USER},
        name: {type: String, required: true, trim: true},
        brandID: {type: ObjectId, required: true, ref: ModelNames.BRAND},
        categoryID: {type: ObjectId, required: true, ref: ModelNames.CATEGORY},
        quantity: {type: Number, required: true, default: 0},
        unit: {type: String, enum: [Units.UNIT, Units.CARTONS, Units.GALLONS, Units.PACK, Units.PIECES, Units.RIMS, Units.BOOKLET], default: Units.UNIT, required: true},
        isInStock: {type: Boolean, required: true, default: true}
    },
    {
        timestamps: true
    }
)

export const ProductModel = model<Product>(ModelNames.PRODUCT, ProductSchema)

