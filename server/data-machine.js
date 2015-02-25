var database = require('./database.js');

var count = 0;

var dataMachine = function(data) {
  console.log(data);
  // data.createdAt = data.createdAt || new Date.toISOString();
  data.objectId = ++count;
  console.log("object id count", data.objectId);
  // data.roomname = data.roomname || "everywhere";
  data.text = data.text || "";
  // data.updatedAt = data.updatedAt || new Date.toISOString();
  data.username = data.username || "David";
  database.results.push(data);
}

module.exports = dataMachine;
