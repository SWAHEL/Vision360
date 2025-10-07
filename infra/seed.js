"use strict";
const db = require("@arangodb").db;
db._useDatabase("vision360");
const opts = { overwriteMode: "ignore" };

db.companies.insert({_key:"RENACO", name:"RENACO SA", taxId:"IF123456"}, opts);
db.persons.insert({_key:"p1", fullName:"Amine R.", role:"Manager"}, opts);
db.phones.insert({_key:"ph1", number:"+212611223344"}, opts);
db.addresses.insert({_key:"addr1", line:"10 Rue Atlas"}, opts);

db.employs.insert({_from:"companies/RENACO", _to:"persons/p1", title:"Manager"}, opts);
db.hasPhone.insert({_from:"companies/RENACO", _to:"phones/ph1"}, opts);
db.hasAddress.insert({_from:"companies/RENACO", _to:"addresses/addr1"}, opts);

print("✅ seed done");
