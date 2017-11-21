import * as $ from 'jquery';

export default (function () {
    $('.make-call').on('click', e => {
        $.ajax({
            method: 'GET',
            url: 'http://192.168.56.101:8080/firewall/module/status',
            datatype: 'jsonp',
            crossDomain: true,
            success: function (data) {
                alert("Success");
                console.log(data);
            },
            error: function () {
                alert('Failed!');
            },
        });
    });
}());
