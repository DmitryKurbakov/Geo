

var data = require('./shoes2.json');

var yandex_id = [];
var yandex_name = [];
var yandex_address = [];
var yandex_url = [];
var yandex_point = [];
var yandex_coord_x = [];
var yandex_coord_y = [];
var yandex_point_str = [];
var request = 'Магазин обуви';


// for (var i = 0; i < data.features.length; i++){
//     yandex_id.push(parseInt(data.features[i].properties.CompanyMetaData.id));
//     yandex_name.push(data.features[i].properties.CompanyMetaData.name);
//     yandex_address.push(data.features[i].properties.CompanyMetaData.address);
//     yandex_url.push(data.features[i].properties.CompanyMetaData.url);
//     yandex_point.push(data.features[i].geometry.coordinates);
//     yandex_coord_x.push(yandex_point[i][0]);
//     yandex_coord_y.push(yandex_point[i][1]);
//     yandex_point_str.push(new String(yandex_coord_x[i].toString() + ', ' + yandex_coord_y[i].toString()));
// }



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
var smth;

function doAsync(callback) {
    var query = client.query('select id from yandex', function (err, result) {
        callback(err, result)
    });
}

doAsync(function (err, result) {
    var temp = [];
    for (var i = 0; i < result.rows.length; i++){
        temp.push(result.rows[i].id);
    }

    for (var i = 0; i < data.features.length; i++){
        if (temp.indexOf(parseInt(data.features[i].properties.CompanyMetaData.id)) == -1){
            yandex_id.push(parseInt(data.features[i].properties.CompanyMetaData.id));
            yandex_name.push(data.features[i].properties.CompanyMetaData.name);
            yandex_address.push(data.features[i].properties.CompanyMetaData.address);
            yandex_url.push(data.features[i].properties.CompanyMetaData.url);
            yandex_point.push(data.features[i].geometry.coordinates.toString());
        }
    }

    for (var i = 0; i < yandex_id.length; i++){
        for (var j = 0; j < yandex_id.length; j++){
            if (parseInt(yandex_id[i]) == parseInt(yandex_id[j])){
                yandex_id.splice(j, 1);
                yandex_name.splice(j, 1);
                yandex_address.splice(j, 1);
                yandex_url.splice(j, 1);
                yandex_point.splice(j, 1);
            }
        }
    }


    for (var i = 0; i < yandex_id.length; i++) {
        client.query("INSERT INTO public.yandex(id, name, address, url, point, request) VALUES('" + yandex_id[i] + "', '" + yandex_name[i] + "', '" + yandex_address[i] + "', '" + yandex_url[i] + "', '" + yandex_point[i] + "', '" + request + "');");
    }

})

    //
    //     , function (err, result) {
    //
    //         //console.log(result.rows.indexOf());
    //         for (var i = 0; i < data.features.length; i++){
    //
    //             if (result.rows.contains(parseInt(data.features[i].properties.CompanyMetaData.id)) == -1){
    //                 console.log(result.rows.indexOf(parseInt(data.features[i].properties.CompanyMetaData.id)));
    //                 yandex_id.push(parseInt(data.features[i].properties.CompanyMetaData.id));
    //                 yandex_name.push(data.features[i].properties.CompanyMetaData.name);
    //                 yandex_address.push(data.features[i].properties.CompanyMetaData.address);
    //                 yandex_url.push(data.features[i].properties.CompanyMetaData.url);
    //                 yandex_point.push(data.features[i].geometry.coordinates);
    //                 yandex_coord_x.push(yandex_point[i][0]);
    //                 yandex_coord_y.push(yandex_point[i][1]);
    //                 yandex_point_str.push(new String(yandex_coord_x[i].toString() + ', ' + yandex_coord_y[i].toString()));
    //             }
    //         }
    //     });
    //     done();
    // });

    // pool.connect(function(err, client, done) {
    //     for (var i = 0; i < yandex_id.length; i++){
    //         //client.query('INSERT INTO public.yandex(id, name, address, url, point) VALUES(1, \'1\', \'1\',\'1\',\'1, 3\')');
    //         client.query("INSERT INTO public.yandex(id, name, address, url, point, request) VALUES('" + yandex_id[i] + "', '" + yandex_name[i].toString() + "', '" + yandex_address[i].toString() + "', '" + yandex_url[i].toString() + "', '" + yandex_point_str[i] + "', '" + request.toString()+"');");
    //     }
    //     console.log(yandex_id.length);
    //     done();
    // });



