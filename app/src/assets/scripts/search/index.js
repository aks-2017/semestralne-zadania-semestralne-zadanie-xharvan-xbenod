import * as $ from 'jquery';


function initIp() {
    if (Cookies.get('ip_saved') === true) {
        $('.ip-address').css("display", "none")
    }else {
        $('.switch').css("display", "none")
    }
}

export default (function () {
    $(document).ready(e => {
        initIp();
        initDashboard();
    });

    $('.enable-switch-all').click(function () {
        enableSwitch('enable', 'all');
    })


}());

function enableSwitch(enable, switchId) {
    $.ajax({
        method: 'PUT',
        url: 'http://192.168.56.101:8080/firewall/module/' + enable + '/' + switchId,
        datatype: 'jsonp',
        crossDomain: true,
        success: function (data) {
            initDashboard();
            console.log(data);
        },
        error: function (data) {
            alert('Failed!');
            console.log(data);
        },
    });
}

function initDashboard() {
    $.ajax({
        method: 'GET',
        url: 'http://192.168.56.101:8080/firewall/module/status',
        datatype: 'jsonp',
        crossDomain: true,
        success: function (data) {
            parseResponse(data);
            console.log(data);
        },
        error: function (data) {
            alert('Failed!');
            console.log(data);
        },
    });
}

function parseResponse(json) {


    $('.switch-body').remove();
    $('.switch-table').append('<tbody class="switch-body"></tbody>');
    let switchTable = $('.switch-body');
    for (let i = 0; i < json.length; i++) {
        let enable = 'enable';
        if (json[i].status === 'enable') {
            enable = 'disable'
        }
        switchTable.append('<tr id="switch-' + json[i].switch_id + '"><td>' + json[i].switch_id + '</td><td>' + json[i].status + 'd</td><td><a href="#" class="btn btn-sm btn-primary enable-switch-' + json[i].switch_id + '">' + enable + '</a></td></td></tr>')
        switchTable.find('.enable-switch-' + json[i].switch_id).click(function (e) {
            enableSwitch(enable, json[i].switch_id);
        })
    }
}
