"use strict";
const db = require("@arangodb").db;
db._useDatabase("vision360");
const aql = `
FOR v,e,p IN 1..2 ANY @start
  employs, hasPhone, hasAddress, ownsVehicle, locatedIn, partnersWith, belongsToSector
RETURN {v,e}`;
const res = db._query(aql, { start: "companies/RENACO" }).toArray();
print(JSON.stringify(res, null, 2));
