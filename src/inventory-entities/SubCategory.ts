import { Schema, Document, model } from "mongoose";
import { ModelNames } from "./models.names";
import { ObjectId } from "mongodb";

export class SubCategory extends Document {
    userID: ObjectId;
    categoryID: ObjectId;
    name: string;
}

export const SubCategorySchema = new Schema(
    {
        userID: {type: ObjectId, required: true, ref: ModelNames.USER},
        categoryID: {type: ObjectId, ref: ModelNames.CATEGORY},
        name: {type: String, required: true, trim: true},
    },
    {
        timestamps: true
    }
)

export const SubCategoryModel = model<SubCategory>(ModelNames.SUBCATEGORY, SubCategorySchema)