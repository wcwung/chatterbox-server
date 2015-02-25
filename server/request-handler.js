var database = require('./database.js');
var dataMachine = require('./data-machine.js');
var urlParser = require('url');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"

};

var generalResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  console.log(response)
  response.writeHead(statusCode, headers);
  //response.write(JSON.stringify(database));
  response.end(JSON.stringify(data));
}

var actions = {
  GET: function(request, response) {
    generalResponse(request, response);
  },
  POST: function(request, response) {
    generalResponse(response, data, statusCode);
  },
  OPTIONS: function(request, response){
    // if(request.headers['access-control-request-method'] === "GET"){
    //   generalResponse.call(this);
    // } else if(request.headers['access-control-request-method'] === "POST"){
    //   generalResponse();
    // } else {
    //   console.log("Still working on it");
    // }
    generalResponse(request, response);
  }
}

exports.requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var collectData = function(request, callback) {
    var data = "";
    request.on('data', function(chunk){
      data += chunk;
    });
    request.on('end', function() {
      callback(JSON.parse(data));
    })
  }
  // response.writeHead(statusCode, headers);
  var action = actions[request.method];
  if (action){
    action(request, response)
  } else {
    generalResponse(response, "Not Found :(", 404)
  }
  // requestIdentifier(request, response);
}

// Exports
// module.exports = requestHandler;
