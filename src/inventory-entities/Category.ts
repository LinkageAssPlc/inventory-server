import { Schema, Document, model } from "mongoose";
import { ModelNames } from "./models.names";
import { ObjectId } from "mongodb";

export class Category extends Document {
    userID: ObjectId;
    name: string;
    parent: string;
}

export const CategorySchema = new Schema(
    {
        userID: {type: ObjectId, required: true, ref: ModelNames.USER},
        name: {type: String, required: true, trim: true},
        parent: {type: String, required: true}
    },
    {
        timestamps: true
    }
)

export const CategoryModel = model<Category>(ModelNames.CATEGORY, CategorySchema)