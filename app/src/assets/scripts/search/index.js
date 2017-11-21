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
                //var switchStatus = "Switch id: "+data[0].switch_id+" is "+data[0].status;
                var ol = document.getElementById('switch_status_list');
              /*  for(var i=1; i<data.length; i++){
                  var id = "sw";
                  id += i;
                  id = id.toString();
                  var element = "<li id=\""+id+"\"></li>"
                  ol.append(element.toString());
                }*/

                for(var i=1; i<data.length+1; i++){
                  var switchStatus = "Switch id: "+data[i-1].switch_id+" is "+data[i-1].status;
                  var id = "sw";
                  id += i;
                  id = id.toString();
                  var p = document.getElementById(id);
                  p.innerHTML += switchStatus;
                }

                console.log(data);
            },
            error: function () {
                alert('Failed!');
            },
        });
    });
}());
