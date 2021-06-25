"use strict";

require("dotenv").config();
import express from "express";
import NodeCache from "node-cache";
const myCache = new NodeCache();
var CronJob = require("cron").CronJob;

import cors from "cors";
const app = express();

const port = process.env.PORT;
const orig = "http://localhost:5500";
import check_url from "./check_url";
import save_report from "./save_reports";

app.use(cors({ origin: orig, credentials: true }));

app.get("/", (req, res) => {
  res.json({});
});

// you can check the value /2 to any aother value for delaying.

const job = new CronJob("0 */2 * * * *", function () {
  const d = new Date();
  console.log("...............", d);
  check_url(myCache);
});
job.start();
app.listen(port, () => {
  console.log("server started at http://localhost:" + port);
});
