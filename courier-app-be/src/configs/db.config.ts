import dotenv from "dotenv";

type DbConnection = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  dbLogging: boolean;
};

dotenv.config();

const connection: DbConnection = {
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  dbLogging: false,
};

export default connection;
