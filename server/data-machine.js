var dataMachine = function(data) {
  console.log(data);
  data.createdAt = data.createdAt || new Date.toISOString();
  data.objectId = Date.parse(new Date());
  data.roomname = data.roomname || "everywhere";
  data.text = data.text || "";
  data.updatedAt = data.updatedAt || new Date.toISOString();
  data.username = data.username || "David";
  database.push(data);
}

module.exports = dataMachine;
