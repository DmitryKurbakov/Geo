

var express = require('express');
var app = express();

app.get('/', function (req, res) {

    var request = require('request');
    request('http://www.ads-api.ru/main/api?user=deimys96@gmail.com&token=1d7439a26dd29f79fea615e13d3d1af9&category_id=7&city=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&nedvigimost_type=2', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);

            var pg = require('pg');
            var config = {
                user: 'postgres', //env var: PGUSER
                database: 'yandex', //env var: PGDATABASE
                password: 'xxXX1234', //env var: PGPASSWORD
                host: 'localhost', // Server hosting the postgres database
                port: 5432, //env var: PGPORT
                max: 10, // max number of clients in the pool
                idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
            };

            var client = new pg.Client(config);
            client.connect();

            client.query('truncate table avito');

            for (var i = 0; i < result.data.length; i++){
                var point = [];
                var data = [];
                point.push(parseFloat(result.data[i].coords.lat));
                point.push(parseFloat(result.data[i].coords.lng));
                var tempstr = result.data[i].city + ", " + result.data[i].address;
                data.push(tempstr);
                data.push(result.data[i].time);
                data.push(result.data[i].description);
                data.push(result.data[i].url);

                client.query("INSERT INTO public.avito(address, time, description, url, point) VALUES('" + tempstr + "', '" + result.data[i].time + "', '" + result.data[i].description + "', '" + result.data[i].url + "', '(" + point[0] + ", " + point[1]+")');");
            }

            client.query("SELECT * FROM public.avito", function (err, resData) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(resData);
            });
        }
    })

});

app.listen(80, function () {

    console.log('Example app listening on port 3000!');
});