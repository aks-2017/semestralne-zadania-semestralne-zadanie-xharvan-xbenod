import * as $ from 'jquery';


function initIp() {
    if (Cookies.get('ip_saved') === 'true') {
        $('.ip-address').css("display", "none")
        $('.ip-address-show').html('IP address: ' + Cookies.get('ip'));
    } else {
        $('.switch').css("display", "none")
    }
}

function initDashboard() {
    $.ajax({
        method: 'GET',
        url: 'http://' + Cookies.get('ip') + '/firewall/module/status',
        datatype: 'jsonp',
        crossDomain: true,
        success: function (data) {
            parseResponseForDashboard(data);
            console.log(data);
        },
        error: function (data) {
            alert('Failed!');
            console.log(data);
        },
    });
}


function initRules() {
    $.ajax({
        method: 'GET',
        url: 'http://' + Cookies.get('ip') + '/firewall/module/status',
        datatype: 'jsonp',
        crossDomain: true,
        success: function (data) {
            parseSwitchesResponseForRules(data);
            console.log(data);
        },
        error: function (data) {
            alert('Failed!');
            console.log(data);
        },
    });
}

export default (function () {
    $(document).ready(e => {
        if ($('#dashboard-flag').length > 0) {
            initIp();
            initDashboard();
        } else if ($('#rules-flag').length > 0) {
            initIp();
            initRules();
        }
    });

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
}());


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


function parseResponseForDashboard(json) {


    $('.switch-body').remove();
    $('.switch-table').append('<tbody class="switch-body"></tbody>');
    let switchTable = $('.switch-body');
    for (let i = 0; i < json.length; i++) {
        let enable = 'enable';
        if (json[i].status === 'enable') {
            enable = 'disable'
        }
        switchTable.append('<tr id="switch-' + json[i].switch_id + '"><td>' + json[i].switch_id + '</td><td>' + json[i].status + 'd</td><td><a href="#" class="btn btn-sm btn-primary enable-switch-' + json[i].switch_id + '">' + enable + '</a></td></tr>')
        switchTable.find('.enable-switch-' + json[i].switch_id).click(function (e) {
            enableSwitch(enable, json[i].switch_id);
        })
    }
}

function parseSwitchesResponseForRules(json) {
    let showFirstEnabled = 0;
    $('.switch-body').remove();
    $('.switch-table').append('<tbody class="switch-body"></tbody>');
    let switchTable = $('.switch-body');
    for (let i = 0; i < json.length; i++) {
        if (json[i].status === 'disable') {
            continue;
        }
        if (showFirstEnabled === 0) {
            showRulesForSwitch(json[i].switch_id);
            showFirstEnabled = 1;
        }
        switchTable.append('<tr id="switch-' + json[i].switch_id + '"><td>' + json[i].switch_id + '</td><td><a href="#" class="btn btn-sm btn-primary show-switch-rules' + json[i].switch_id + '">show</a></td></tr>')
        switchTable.find('.show-switch-rules' + json[i].switch_id).click(function (e) {
            showRulesForSwitch(json[i].switch_id);
        })
    }
}

function deleteRule(switch_id, rule_id) {
    $.ajax({
        method: 'DELETE',
        url: 'http://' + Cookies.get('ip') + '/firewall/rules/' + switch_id,
        dataType: 'application/json',
        data: JSON.stringify({'rule_id': rule_id}),
        crossDomain: true,
        success: function (data) {
            initRules();
            console.log(data);
        },
        error: function (data) {
            initRules();
            console.log(data);
        },
    });
}

function sendRule(switch_id, modal) {
    let src = $('#rule-src').val();
    let dst = $('#rule-dst').val();
    let prot = $('#rule-prot').val();
    let type = $('#rule-type').val();
    let prior = $('#rule-priority').val();
    let action = $('#rule-action').val();


    var dataString = JSON.stringify({
        nw_src : src,
        nw_dst : dst,
        nw_proto: prot,
        dl_type: type,
        priority: prior,
        actions: action,
    });

    console.log(dataString);

    $.ajax({
        method: 'POST',
        url: 'http://' + Cookies.get('ip') + '/firewall/rules/' + switch_id,
        dataType: 'application/json',
        data: dataString,
        crossDomain: true,
        success: function (data) {
            modal.modal('hide');
            showRulesForSwitch(switch_id);
            console.log(data);
        },
        error: function (data) {
            modal.modal('hide');
            showRulesForSwitch(switch_id);
            console.log(data);
        },
    });

}

function parseRulesResponseForRules(switch_id, json) {

    $('.add-firewall').remove();
    $('.add-rule-cell').append('<a href="#" class="btn btn-sm btn-success add-firewall add-firewall-' + switch_id + '" data-toggle="modal" data-switch-id="' + switch_id + '" data-target="#add-firewall-rule-modal">Add rule</a>')
    $('.rules-table').find('.add-firewall-' + switch_id).click(function (e) {
        let modal = $('#add-firewall-rule-modal');
        modal.trigger('focus');
        modal.attr('data-switch-id', switch_id);
        modal.find('.add-rule-form-button').click(function (e) {
            sendRule(modal.data('switchId'), modal);
        })
    })

    $('.rules-body').remove();
    $('.rules-table').append('<tbody class="rules-body"></tbody>');
    let rulesTable = $('.rules-body');
    let rules = json[0].access_control_list[0].rules;

    for (let i = 0; i < rules.length; i++) {
        rulesTable.append('<tr id="rule-' + rules[i].rule_id + '"><td>' + rules[i].rule_id + '</td><td>' + rules[i].priority + '</td><td>' + rules[i].nw_src + '</td><td>' + rules[i].nw_dst + '</td><td>' + rules[i].dl_type + '</td><td>' + rules[i].nw_proto + '</td><td>' + rules[i].actions + '</td><td><a href="#" class="btn btn-sm btn-danger delete-rule-' + rules[i].rule_id + '">delete</a></td></tr>')
        rulesTable.find('.delete-rule-' + rules[i].rule_id).click(function (e) {
            deleteRule(switch_id, rules[i].rule_id);
        })
    }
}

function showRulesForSwitch(switch_id) {
    $.ajax({
        method: 'GET',
        url: 'http://' + Cookies.get('ip') + '/firewall/rules/' + switch_id,
        datatype: 'jsonp',
        crossDomain: true,
        success: function (data) {
            parseRulesResponseForRules(switch_id, data);
            console.log(data);
        },
        error: function (data) {
            alert('Failed!');
            console.log(data);
        },
    });
}
