import express from "express";
import appMiddlewareInstaller from "./app-middleware-installer.js";
import { configurations } from "./app-configs.js";

const app = express();

// for injecting middleware
await appMiddlewareInstaller(app);

app
  .listen(configurations.app.port, () => {
    console.log(
      `server started on ${configurations.app.port} and host ${configurations.app.host} `
    );
  })
  .on("error", (err) => {
    console.log("Error", err.message);
    process.exit();
  });
