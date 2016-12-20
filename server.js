

var http = require('http');
var static = require('node-static');
var file = new static.Server('.');
//var geojson = require('geojson-helpers')
//var i = geojson.readFileSync('./shoes.geojson')


//var f = geojson.readFileSync('./shoes.geojson')
http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(8080);



console.log('Server running on port 8080');


