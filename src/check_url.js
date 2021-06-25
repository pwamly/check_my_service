/** @format */

"use strict";
import save from "./save_reports";
const isReachable = require("is-reachable");

// urls to be checked

const urls = ["https://www.google.com", "www.google.com", "8o8.8.8"];

module.exports = async function check_url(myCache, timestamp) {
  // check if reachable
  urls.forEach(async (url) => {
    const isresachable = await isReachable(url);
    if (isresachable) {
    } else {
      save({ url, isresachable, timestamp }, myCache);
    }
  });
};
