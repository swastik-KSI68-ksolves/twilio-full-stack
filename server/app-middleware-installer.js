import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const appMiddlewareInstaller = async (app) => {
  // Middleware setup
  app.use(express.json({ limit: "1mb" }));
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
      limit: "1mb",
    })
  );

  // API's
  app.use("/", router);
};

export default appMiddlewareInstaller;
