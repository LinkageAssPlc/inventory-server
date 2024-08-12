import { Joi } from "celebrate";
import { toObjectId } from "../../../inventory-shared/validateAndConvertToObjectID";

export default{
    subCategory: {
        body: Joi.object({
            name: Joi.string().min(2).max(24).required(),
            categoryID: Joi.string().min(24).max(24).custom(toObjectId),
        })
    }
}