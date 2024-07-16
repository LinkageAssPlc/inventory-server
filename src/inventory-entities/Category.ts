import { Schema, Document, model } from "mongoose";
import { ModelNames } from "./models.names";

export class Category extends Document {
    name: string;
    parent: string;
}

export const CategorySchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        parent: {type: String, required: true}
    },
    {
        timestamps: true
    }
)

export const CategoryModel = model<Category>(ModelNames.CATEGORY, CategorySchema)