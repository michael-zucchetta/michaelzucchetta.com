'use strict';

var express = require('express'),
	fs = require('fs'),
	http = require('http'),
	mime = require('mime'),
	compression = require('compression'),
	httpRequest = require('request');

var app = express();
app.use(compression());
console.log(__dirname + '/dist');

var basePath = "/dist";
var port = process.env.PORT || 8888;

let servicePath = '/service/';

app.use(function(request, response) {
	console.log(`Request is:
		       Protocol: ${request.protocol}
			Host: ${request.headers.host}
			Referer: ${request.headers.referrer}
			secure: ${request.secure}
			secureForwardProto: ${request.headers['x-forwarded-proto']}
			${request.url}: ${Object.keys(request)}`);
	// ovh does use DNS redirection => https is not matched hence x-forward-proto is used
	if ( (!request.isSecure && request.headers['x-forwarded-proto'] !== 'https') && request.headers.host.indexOf('michaelzucchetta.com') !== -1 ) {
		response.redirect(301, `https://${request.headers.host}${request.url}`);
		return;
	}
	request.url = request.url === "/" ? "/index.html" : request.url;
	
	if ( request.url.indexOf(servicePath) == 0 ) {
		// request going to the BE
		// TBD: list of endpoints available
		let serverRequest = `http://localhost:9999/${request.url.replace(servicePath, '')}`;
		console.log(`Request changed to ${serverRequest}`);
		httpRequest(serverRequest, (error, response, body) => {
			console.log('error', error);
		});
	} else if ( request.url.indexOf("/lib/") !== 0 && request.url.indexOf("/src/") !== 0 ) {
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

app.use(express.static(__dirname + '/dist'));

app.use(function(err, req, res, next) {
	    console.log(err);
});

var httpServer = http.createServer(app);
httpServer.listen(port);
console.log("Initialisation on port: " + port);
