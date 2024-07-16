import { ObjectId } from "mongoose";
import { ModelNames } from "../inventory-entities";

export type UserMetaDataGeneral = {
    _id: ObjectId;
    collectionName: ModelNames.USER;
    collectionID: ObjectId;
    associatedData: {
        type: 'metaData',
        metaData: {
            userID: ObjectId;
            lastloginDate: Date;
            passwordChangedAt: Date[],
            verifiedAt: Date,
            disabledAt: Date,
            suspendedAt: Date,
            deletedAt: Date,
        }
    }
};


