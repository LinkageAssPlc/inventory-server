import { Joi } from "celebrate";

import { toObjectId } from "../../../inventory-shared/validateAndConvertToObjectID";


export default{
    newStock: {
        body: Joi.object({
            itemsListID: Joi.string().min(24).max(24).custom(toObjectId),
        })
    }
}