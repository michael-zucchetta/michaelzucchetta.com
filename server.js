var express = require('express'),
	fs = require('fs'),
	http = require('http'),
	mime = require('mime'),
	compression = require('compression');
var app = express();
app.use(compression());
console.log(__dirname + '/dist');
app.use(express.static(__dirname + '/dist'));

var basePath = "/dist";
var port = process.env.PORT || 8000;

app.use(function(request, response) {
	console.log("Request is: " + request.url);
	//Set to the default page
	request.url = request.url === "/" ? "/index.html" : request.url;
	if ( request.url.indexOf("/lib/") !== 0 && request.url.indexOf("/src/") !== 0 ) {
		request.url = basePath + request.url;
	}
	var requestedPath = __dirname + request.url;
	fs.readFile(__dirname + request.url, function (err, data) {
		console.log(err, data);
		if (err) {
			response.writeHead(404);
			//response.end(JSON.stringify(err));
			response.end();
			return;
		}
		if (data) {
			console.log("resolving file: " + request.url);
			var code = 200;
			//Write response
			response.writeHead(code, mime.lookup(requestedPath));
			response.end(data);
			return;
		}
	});
	return;
	var code = 200;
	response.writeHead(code, mime.lookup(requestedPath));
	response.end("");
});
var httpServer = http.createServer(app);
httpServer.listen(port);
console.log("Initialisation on port: " + port);
