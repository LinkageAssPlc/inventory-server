import { Joi } from "celebrate";


export default{
    product: {
        body: Joi.object({
            name: Joi.string().min(2).max(24).required(),
        })
    }
}