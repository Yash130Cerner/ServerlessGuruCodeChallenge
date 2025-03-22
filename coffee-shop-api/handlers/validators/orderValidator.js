import Joi from 'joi';

export const createOrderSchema = Joi.object({
  order_id: Joi.string().required(),
  customer_name: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      size: Joi.string().required(),
      price: Joi.number().required()
    })
  ).required(),
  total_price: Joi.number().required()
});