

window.onload = function () {
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
                alert('отправили данные')

            }
        }
    }
}
