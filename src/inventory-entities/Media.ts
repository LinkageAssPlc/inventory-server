import { model, Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { ModelNames } from "./models.names";
import { MediaTypes, MEDIA_FORMAT } from "../types/user";
//
export class Media extends Document {
    kind: MediaTypes;
    content: string;
    userID: ObjectId;

}

export const MediaSchema = new Schema({
    kind: {type: String, required: true, enum: [MEDIA_FORMAT.IMAGE, MEDIA_FORMAT.VIDEO, MEDIA_FORMAT.GIF]},
    content: {type: String},
    userID: {type: ObjectId, required: true, ref: ModelNames.USER},
});


export const MediaModel = model<Media>(ModelNames.MEDIA, MediaSchema);
