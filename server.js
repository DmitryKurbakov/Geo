

var express = require('express');
var app = express();

app.get('/', function (req, res) {

    var request = require('request');
    request('http://www.ads-api.ru/main/api?user=deimys96@gmail.com&token=1d7439a26dd29f79fea615e13d3d1af9&category_id=7&city=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&nedvigimost_type=2', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync('C:/Users/Dmitry/WebstormProjects/gf/html/avitoo.json', JSON.parse(body));
            console.log();
            res.send(JSON.parse(body));
        }
    })

});

app.listen(3000, function () {

    console.log('Example app listening on port 3000!');
});