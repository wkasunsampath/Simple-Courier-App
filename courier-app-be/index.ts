import "reflect-metadata";

import dotenv from "dotenv";
import express, { Request, Response, Application, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import { BaseResponseError } from "./src/exceptions/BaseResponseError";
import publicRouter from "./src/routes/public";
import apiRouter from "./src/routes/api";
import apiAuthRouter from "./src/routes/apiAuth";
import AuthMiddleware from "./src/middlewares/auth.middleware";
import { StatusCodes } from "http-status-codes";

dotenv.config();

import "./src/auth/strategies/local.strategy";
import "./src/auth/strategies/jwt.strategy";
import "./src/auth/strategies/jwt.strategy";

import db from "./src/db";

const port = process.env.PORT ?? 8000;

const app: Application = express();

app.use(helmet());
app.use(cors());
app.disable("x-powered-by");
app.use(compression());
app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use("/api", apiRouter);
app.use("/api", AuthMiddleware, apiAuthRouter);
app.use(publicRouter);

app.use((_, res) => {
  res.status(StatusCodes.NOT_FOUND).json("Sorry can't find that!");
});

app.use(
  (
    err: Error | BaseResponseError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    console.error(err);
    res
      .status(err instanceof BaseResponseError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message ?? "Something went wrong", stack: err });
  },
);

db.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is fired at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error("Unable to connect to the database:", e);
  });
