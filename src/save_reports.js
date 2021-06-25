/** @format */

"use strict";

module.exports = async function save_reports(reports, myCache) {
  let trial = 0,
    failure = 0;
  const { url } = reports;
  let value = await myCache.get(url);
  if (value === undefined || value === null) {
    reports = { ...reports, trial: 0, failure: 0 };
    const success = await myCache.set(url, reports, 65646445754754);
    if (success) {
      let value2 = await myCache.get(url);
    }
  } else {
    let { trial: newtrial, failure: newfailure, url } = value;
    if (
      (newfailure === 3 && newtrial === 3) ||
      (newfailure > 3 && newtrial === 3)
    ) {
      console.log("Not reachable 3 times consecutively", url, reports);
      reports = { ...reports, trial: 0, failure: 0 };
      const success = myCache.set(url, reports, 100000000);
    } else {
      newfailure = +newfailure + 1;
      newtrial = +newtrial + 1;
      reports.trial = +newtrial;
      reports.failure = +newfailure;
      const update = await myCache.set(url, reports, 100000000);

      if (update) {
      }
    }
  }
};
