import express from "express";
import {
  CreateShipment,
  GetAllShipments,
  GetMyShipments,
  GetShipment,
  UpdateShipment,
} from "../controllers/shipment.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import UserMiddleware from "../middlewares/user.mddleware";
import AdminMiddleware from "../middlewares/admin.middleware";

const router = express.Router();

router.get("/all-shipments", AuthMiddleware, AdminMiddleware, GetAllShipments);
router.put("/shipment/:shipmentId", AuthMiddleware, AdminMiddleware, UpdateShipment);

router.get("/shipment", AuthMiddleware, UserMiddleware, GetMyShipments);
router.post("/shipment/create", AuthMiddleware, UserMiddleware, CreateShipment);
router.get("/shipment/:shipmentId", AuthMiddleware, GetShipment);

export default router;
