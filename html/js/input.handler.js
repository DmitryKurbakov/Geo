

window.onload = function () {




    var markerGroup = new L.FeatureGroup();
    $('#request_name').empty();
    var request_name = document.getElementById('request_name');
    request_name.value = '';
    var flag;

    request_name.onkeydown = function () {
        flag = request_name.value.length;
    }

    request_name.onkeyup = function(e) {
        e = e || event;
        if (e.keyCode == 13) {
            if (request_name.value.length != flag) {
                return;
            } else {
                var mapCenter = map.getCenter();
                console.log(mapCenter);
                var mapCenterReq = mapCenter.lng.toFixed(6).toString() + "," + mapCenter.lat.toFixed(6).toString();
                $.ajax({
                    url: "https://search-maps.yandex.ru/v1/?text="+request_name.value.toString()+"&apikey=9857be1c-6fa0-4710-ad0a-83f162a1abd7&lang=ru_RU&ll=37.618920,55.756994&spn=0.552069,0.400552&results=500",
                    dataType: "jsonp",
                    // Work with the response
                    success: function( result ) {
                        markerGroup.eachLayer(function (layer) {
                            markerGroup.removeLayer(layer);
                        });

                        var pointArr = [];
                        for (var i = 0; i < result.data.features.length; i++) {
                            var point = [];
                            point.push(parseFloat(result.data.features[i].geometry.coordinates[1]));
                            point.push(parseFloat(result.data.features[i].geometry.coordinates[0]));
                            pointArr.push(point);
                        }

                        for (var k = 0; k < pointArr.length - 1; k++){
                            for (var j = k + 1; j < pointArr.length; j++){
                                var r = 2;
                                if ((pointArr[k][0].toFixed(r) == pointArr[j][0].toFixed(r))
                                    && (pointArr[k][1].toFixed(r) == pointArr[j][1].toFixed(r))){
                                    drawMarker(result, k, pointArr[k]);
                                    drawMarker(result, j, pointArr[j]);
                                    break;
                                }
                            }
                        }

                        function drawMarker(result, k, point) {
                            var res = [];
                            res.push(result.data.features[k].properties.CompanyMetaData.name);
                            res.push(result.data.features[k].properties.CompanyMetaData.address);
                            res.push(result.data.features[k].properties.CompanyMetaData.url);
                            addMarkerYandex(res, point, markerGroup);
                        }
                        map.addLayer(markerGroup);
                    }
                });
            }
        }
    }


}
