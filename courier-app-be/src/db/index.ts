import { DataSource } from "typeorm";
import connection from "../configs/db.config";
import { User } from "./models/User";
import { Shipment } from "./models/Shipment";

const { database, user, password, host, port, dbLogging } = connection;

const db = new DataSource({
  type: "postgres",
  host,
  port,
  username: user,
  password,
  database,
  synchronize: true,
  logging: dbLogging || false,
  migrations: [],
  subscribers: [],
  entities: [User, Shipment],
});

export default db;
