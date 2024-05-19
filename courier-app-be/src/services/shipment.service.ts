import db from "../db";
import { Shipment } from "../db/models/Shipment";
import { User } from "../db/models/User";

const getWayBillNumber = async () => {
  let billNo = new Date().getTime(); // Note: This is not a good way to generate a bill no.
  if (!(await getShipmentByWayBillNumber(billNo))) {
    return billNo;
  }
  do {
    billNo++;
  } while (await getShipmentByWayBillNumber(billNo));
  return billNo;
};

export const createShipment = async (shipmentData, owner) => {
  return db.manager.save(
    db.manager.create(Shipment, {
      ...shipmentData,
      wayBillNumber: await getWayBillNumber(),
      owner,
    }),
  );
};

export const updateShipment = async (shipmentData, shipment: Shipment) => {
  shipment.cost = shipmentData.cost;
  shipment.status = shipmentData.status;
  shipment.deliveryPerson = shipmentData.deliveryPerson;
  shipment.collectedOn = shipmentData.collectedOn;
  shipment.deliveredOn = shipmentData.deliveredOn;
  return db.manager.save(shipment);
};

export const getShipmentByWayBillNumber = (billNo: number) => {
  return db.manager.findOneBy(Shipment, { wayBillNumber: billNo });
};

export const getShipment = (id: string) => {
  return db.manager.findOneBy(Shipment, { id });
};

export const getAllShipments = async () => {
  return await db.getRepository(Shipment).createQueryBuilder("shipment").getMany();
};

export const getMyShipments = async (user: User) => {
  return await db
    .getRepository(Shipment)
    .createQueryBuilder("shipment")
    .where("shipment.ownerId = :id", { id: user.id })
    .getMany();
};
