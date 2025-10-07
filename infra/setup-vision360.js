"use strict";
const db = require("@arangodb").db;

// create DB if missing, then use it
if (!db._databases().includes("vision360")) { db._createDatabase("vision360"); }
db._useDatabase("vision360");

// vertex collections (idempotent)
["companies","persons","addresses","phones","vehicles","cities","sectors"]
  .forEach(n => db._create(n, {}, true));

// edge collections (idempotent)
["employs","ownsVehicle","hasAddress","hasPhone","locatedIn","partnersWith","belongsToSector"]
  .forEach(n => db._createEdgeCollection(n, {}, true));

// named graph via pure AQL (no JS modules)
db._query(`
LET g = FIRST(FOR g IN _graphs FILTER g._key == "vision360" RETURN g)
RETURN g ? g : (
  GRAPH_CREATE(
    "vision360",
    [
      { collection: "employs",          from: ["companies"],            to: ["persons"] },
      { collection: "ownsVehicle",      from: ["persons"],              to: ["vehicles"] },
      { collection: "hasAddress",       from: ["persons","companies"],  to: ["addresses"] },
      { collection: "hasPhone",         from: ["persons","companies"],  to: ["phones"] },
      { collection: "locatedIn",        from: ["addresses"],            to: ["cities"] },
      { collection: "partnersWith",     from: ["companies"],            to: ["companies"] },
      { collection: "belongsToSector",  from: ["companies"],            to: ["sectors"] }
    ],
    []
  )
)
`);

// seed small sample (idempotent inserts)
db.companies.insert({_key:"RENACO", name:"RENACO SA", taxId:"IF123456"}, {overwriteMode:"ignore"});
db.persons.insert({_key:"p1", fullName:"Amine R.", role:"Manager"}, {overwriteMode:"ignore"});
db.phones.insert({_key:"ph1", number:"+212611223344"}, {overwriteMode:"ignore"});
db.addresses.insert({_key:"addr1", line:"10 Rue Atlas"}, {overwriteMode:"ignore"});

db.employs.insert({_from:"companies/RENACO", _to:"persons/p1", title:"Manager"}, {overwriteMode:"ignore"});
db.hasPhone.insert({_from:"companies/RENACO", _to:"phones/ph1"}, {overwriteMode:"ignore"});
db.hasAddress.insert({_from:"companies/RENACO", _to:"addresses/addr1"}, {overwriteMode:"ignore"});

print("✅ vision360 graph ready");
