"use strict";
const db = require("@arangodb").db;

// 1) Ensure DB exists, then use it
if (!db._databases().includes("vision360")) { db._createDatabase("vision360"); }
db._useDatabase("vision360");

// 2) Create vertex collections if missing
const vertices = ["companies","persons","addresses","phones","vehicles","cities","sectors"];
vertices.forEach(n => { if (!db._collection(n)) db._create(n); });

// 3) Create edge collections if missing
const edges = ["employs","ownsVehicle","hasAddress","hasPhone","locatedIn","partnersWith","belongsToSector"];
edges.forEach(n => { if (!db._collection(n)) db._createEdgeCollection(n); });

// 4) Create named graph via AQL only if missing
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

// 5) Seed data (safe to re-run)
const opts = { overwriteMode: "ignore" };
db.companies.insert({_key:"RENACO", name:"RENACO SA", taxId:"IF123456"}, opts);
db.persons.insert({_key:"p1", fullName:"Amine R.", role:"Manager"}, opts);
db.phones.insert({_key:"ph1", number:"+212611223344"}, opts);
db.addresses.insert({_key:"addr1", line:"10 Rue Atlas"}, opts);

db.employs.insert({_from:"companies/RENACO", _to:"persons/p1", title:"Manager"}, opts);
db.hasPhone.insert({_from:"companies/RENACO", _to:"phones/ph1"}, opts);
db.hasAddress.insert({_from:"companies/RENACO", _to:"addresses/addr1"}, opts);

print("✅ vision360 graph ready (idempotent)");
