import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import router from "./app/router";

const app = express();

app.set("port", process.env.PORT || 8003);
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "500mb" }));

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    safeFileNames: false,
    abortOnLimit: true,
  })
);

app.use(allowCors());

app.use(router);
// Test

export default app;
