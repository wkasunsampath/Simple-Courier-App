import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { UserType } from "../../../types/emums";
import { Shipment } from "./Shipment";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column({ default: UserType.USER })
  type: UserType;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column()
  mobile: number;

  @Column({ length: 400 })
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Shipment, (shipment) => shipment.owner)
  shipments: Shipment[];
}
