import { Joi } from "celebrate";


export default{
    brand: {
        body: Joi.object({
            name: Joi.string().min(2).max(24).required(),
        })
    }
}