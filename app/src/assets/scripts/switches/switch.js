function initIp() {
    if (Cookies.get('ip_saved') === 'true') {
        $('.ip-address').css("display", "none")
        $('.ip-address-show').html('IP address: ' + Cookies.get('ip'));
    } else {
        $('.switch').css("display", "none")
    }
}


$(document).ready(e => {
    initIp();
    initDashboard();
    $('.enable-switch-all').click(function () {
        enableSwitch('enable', 'all');
    })

    $('.put-ip').click(function () {
        let ipAddress = $('#inputIp').val();
        console.log(ipAddress);
        if (validateIpAndPort(ipAddress)) {
            Cookies.set('ip_saved', true);
            Cookies.set('ip', ipAddress);
            initIp();
        } else {
            alert("You have entered invalid IP address.\nYou have to enter IP with Port");
        }
    })
});

function validateIpAndPort(input) {
    var parts = input.split(":");
    var ip = parts[0].split(".");
    var port = parts[1];
    return validateNum(port, 1, 65535) &&
        ip.length == 4 &&
        ip.every(function (segment) {
            return validateNum(segment, 0, 255);
        });
}

function validateNum(input, min, max) {
    var num = +input;
    return num >= min && num <= max && input === num.toString();
}

function enableSwitch(enable, switchId) {
    $.ajax({
        method: 'PUT',
        url: 'http://' + Cookies.get('ip') + '/firewall/module/' + enable + '/' + switchId,
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
        url: 'http://' + Cookies.get('ip') + '/firewall/module/status',
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
