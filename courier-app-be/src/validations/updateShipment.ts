import Joi from "joi";

const updateShipmentSchema = Joi.object({
  cost: Joi.number().allow(null),
  status: Joi.string().required(),
  deliveryPerson: Joi.string().allow(null),
  collectedOn: Joi.date().allow(null),
  deliveredOn: Joi.date().allow(null),
});

export default updateShipmentSchema;
