import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { ShipmentStatus } from "../../../types/emums";
import { User } from "./User";

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("bigint", { nullable: false, unique: true })
  wayBillNumber: number;

  @Column({ default: ShipmentStatus.PENDING })
  status: ShipmentStatus;

  @ManyToOne(() => User, (owner) => owner.shipments, { eager: true })
  owner: User;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  cost: number;

  @Column("decimal", { precision: 10, scale: 2 })
  weight: number;

  @Column({ length: 200 })
  recipientName: string;

  @Column({ length: 400 })
  recipientAddress: string;

  @Column({ length: 400 })
  collectionAddress: string;

  @Column({ nullable: true })
  collectedOn: Date;

  @Column({ length: 400, nullable: true })
  instructions: string;

  @Column({ length: 200, nullable: true })
  deliveryPerson: string;

  @Column({ nullable: true })
  deliveredOn: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
