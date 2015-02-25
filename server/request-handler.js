var database = require('./database.js');
var dataMachine = require('./data-machine.js');
var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";

  // response.writeHead(statusCode, headers);
  var generalResponse = function(request) {
    response.writeHead(statusCode, headers);
    response.write(JSON.stringify(database));
    response.end();
  }

  var optionsResponse = function(request) {
    if(request.headers['access-control-request-method'] === "GET"){
      generalResponse.call(this);
    } else if(request.headers['access-control-request-method'] === "POST"){
      console.log(request.data);
      // dataMachine(request);
      generalResponse();
    } else {
      console.log("Still working on it");
    }
  }

  var requestIdentifier = function(request, response){
    var body = '';
    if (request.method === 'OPTIONS'){
      optionsResponse(request);
    } else if (request.method === "GET") {
      generalResponse();
    } else if (request.method === "POST") {
      console.log('its a post request')
      // console.log(response);
      request.on('data', function(data){
        body += data;
      })
      request.on('end', function(){
        // console.log('body within request.on("end") ', body);
        // console.log('within request.on("end") ', response.data)
        dataMachine(JSON.parse(body));
      })
      // dataMachine(request);
    } else {
      console.log("what is happening?");
    }
  };

  // Where is the data on our request? How to accesss it.
  // Use response on to retrieve data

  // var options = {
  //   method: 'POST';
  // }

  // var req = http.request(options, function(res) {
  //   console.log('STATUS: ' + res.statusCode);
  //   console.log('HEADERS: ' + JSON.stringify(res.headers));
  //   res.setEncoding('utf8');
  //   res.on('data', function (chunk) {
  //     console.log('BODY: ' + chunk);
  //   });
  // });

  requestIdentifier(request, response);
}

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

// GET

// POST

// Exports
module.exports = requestHandler;

