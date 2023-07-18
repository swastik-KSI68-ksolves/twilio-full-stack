import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/index.js";

const appMiddlewareInstaller = async (app) => {
  // Middleware setup
  app.use(cors());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // app.use(express.json({ limit: "1mb" }));
  // app.use(
  //   express.urlencoded({
  //     extended: true,
  //     limit: "1mb",
  //   })
  // );

  // API's
  app.use("/", router);
};

export default appMiddlewareInstaller;
