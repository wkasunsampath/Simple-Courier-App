import Joi from "joi";

const createShipmentSchema = Joi.object({
  weight: Joi.number().required(),
  recipientName: Joi.string().required(),
  recipientAddress: Joi.string().required(),
  collectionAddress: Joi.string().required(),
  instructions: Joi.string().required(),
});

export default createShipmentSchema;
