"use strict";
require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const port = process.env.PORT;
const orig = "http://localhost:5500";
import report  from "./report";
import check_url from './check_url';
import save_report from './save_reports';

app.use(cors({ origin: orig, credentials: true }));

app.get("/", (req,res)=>{

res.json({})
});

app.listen(port, () => {
    check_url();
    // save_report();
    console.log("server started at http://localhost:" + port);
});