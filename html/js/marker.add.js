function addMarkerAvito(arg, point) {

    var marker = L.marker(point).addTo(map);

    marker.on('click', function(){


        $('#modal_form').empty().css('display', 'block').animate({opacity: 0.8, top: '50%'}, 200);

        $("<span id='modal_close'>X</span>").appendTo('#modal_form');
        for (var i = 0; i < arg.length; i++){
            $("<div class = 'item_box_c'></div>").text(arg[i]).appendTo('#modal_form');
            //$('#modal_form').append("div class = 'item_box_c'").text(arg[0]);
            //$('#box_item').clone().addClass("item_box_c").appendTo('#modal_form').text(arg[i]);
        }


        $('#modal_close, #overlay').click( function(){
            $('#modal_form').animate({opacity: 0.8, top: '45%'}, 200, function(){
                    $(this).css('display', 'none');
                }
            );
        })
    })
}

function addMarkerYandex(arg, point, mg) {

    var yandexMarker = L.icon({
        iconUrl: 'map-marker.png',
        iconSize: [30,34]
    })

    var marker = L.marker(point, {icon: yandexMarker});

    mg.addLayer(marker);

    marker.on('click', function(){

        $('#modal_form_ya').empty().css('display', 'block').animate({opacity: 0.8, top: '50%'}, 200);

        $("<span id='modal_close_ya'>X</span>").appendTo('#modal_form_ya');
        for (var i = 0; i < arg.length; i++){
            $("<div class = 'item_box_c_ya'></div>").text(arg[i]).appendTo('#modal_form_ya');
            //$('#modal_form').append("div class = 'item_box_c'").text(arg[0]);
            //$('#box_item').clone().addClass("item_box_c").appendTo('#modal_form').text(arg[i]);
        }


        $('#modal_close_ya, #overlay').click( function(){
            $('#modal_form_ya').animate({opacity: 0.8, top: '45%'}, 200, function(){
                    $(this).css('display', 'none');
                }
            );
        })
    })
}
