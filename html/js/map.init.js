var map = L.map('map').setView([55.726944, 37.6075], 10);

//Добавляем на нашу карту слой OpenStreetMap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker('xer', [55.726944, 37.6075]);
addMarker('jopa',[55.626944, 37.575]);

function addMarker(arg, point) {

    var marker = L.marker(point).addTo(map);

    marker.on('click', function(){

        $('#modal_form').css('display', 'block').animate({opacity: 0.8, top: '50%'}, 200);
        $('#text_in_modal_form').text(arg);

        $('#modal_close, #overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
            $('#modal_form').animate({opacity: 0.8, top: '45%'}, 200, function(){ // пoсле aнимaции
                    $(this).css('display', 'none'); // делaем ему display: none;
                }
            );
        })
    })


}



