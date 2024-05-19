import { createLogger, format, transports } from "winston";

export const errorLogger = createLogger({
  level: "error",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: "logs/error.log",
    }),
  ],
});

export const infoLogger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      filename: "logs/info.log",
    }),
  ],
});
