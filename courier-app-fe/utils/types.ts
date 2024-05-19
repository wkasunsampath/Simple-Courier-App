export type ChildrenProps = string | JSX.Element | JSX.Element[];

export type UserData = { id: string; name: string; type: "ADMIN" | "USER"; mobile?: number; email?: string };

export enum ShipmentStatus {
  PENDING = "PENDING",
  COLLECTING = "COLLECTING",
  DELIVERING = "DELIVERING",
  DELIVERED = "DELIVERED",
}

export type Shipment = {
  id: string;
  owner: UserData;
  wayBillNumber: number;
  status: ShipmentStatus;
  cost: number;
  weight: number;
  recipientName: string;
  recipientAddress: string;
  collectionAddress: string;
  collectedOn: Date;
  instructions: string;
  deliveryPerson: string;
  deliveredOn: Date;
  created_at: Date;
  updated_at: Date;
};
