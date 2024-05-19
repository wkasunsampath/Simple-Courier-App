import { NextFunction, Response, Request } from "express";
import createShipmentSchema from "../validations/craeteShipment.schema";
import { errorLogger } from "../services/logger.service";
import {
  createShipment,
  getAllShipments,
  getMyShipments,
  getShipment,
  updateShipment,
} from "../services/shipment.service";
import { AuthRequest } from "../../types/interfaces";
import { ResourceNotFoundException } from "../exceptions/ResourceNotFoundException";
import { UserType } from "../../types/emums";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";
import updateShipmentSchema from "../validations/updateShipment";

export const GetShipment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shipmentId = req.params.shipmentId;
    const shipment = await getShipment(shipmentId);
    if (!shipment) {
      throw new ResourceNotFoundException();
    }
    if ((req as AuthRequest).user.type === UserType.USER && (req as AuthRequest).user.id !== shipment.owner.id) {
      throw new UnauthorizedException();
    }
    return res.json(shipment);
  } catch (err) {
    errorLogger.error(err);
    next(err);
  }
};

export const GetAllShipments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shipments = await getAllShipments();
    return res.json(shipments);
  } catch (err) {
    errorLogger.error(err);
    next(err);
  }
};

export const GetMyShipments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shipments = await getMyShipments((req as AuthRequest).user);
    return res.json(shipments);
  } catch (err) {
    errorLogger.error(err);
    next(err);
  }
};

export const CreateShipment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedResults = await createShipmentSchema.validateAsync(req.body);
    const shipment = await createShipment(validatedResults, (req as AuthRequest).user);
    return res.json({ shipmentId: shipment.id });
  } catch (err) {
    errorLogger.error(err);
    next(err);
  }
};

export const UpdateShipment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shipmentId = req.params.shipmentId;
    const shipment = await getShipment(shipmentId);
    if (!shipment) {
      throw new ResourceNotFoundException();
    }
    const validatedResults = await updateShipmentSchema.validateAsync(req.body);
    await updateShipment(validatedResults, shipment);
    return res.json(true);
  } catch (err) {
    errorLogger.error(err);
    next(err);
  }
};
