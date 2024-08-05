import { Joi } from "celebrate";


export default{
    category: {
        body: Joi.object({
            name: Joi.string().min(3).max(24).required(),
            parent: Joi.string().min(3).max(24).required()
        })
    }
}