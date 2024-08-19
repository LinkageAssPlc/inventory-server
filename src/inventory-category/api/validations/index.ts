import { Joi } from "celebrate";


export default{
    category: {
        body: Joi.object({
            name: Joi.string().min(2).max(24).required(),
        })
    }
}