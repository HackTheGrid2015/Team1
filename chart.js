/**
 * Created by arearae on 10/13/15.
 */
function disp(){
    var dis = document.getElementById("map").style.display;
    var dis1 = document.getElementById("list").style.display;
    dis = dis=="none"?"block":"none";
    dis1 = dis1 =="none"?"block":"none";
    document.getElementById("map").style.display=dis;
    document.getElementById("list").style.display=dis1;
}
function disp1(){
    $("#list").hide();
    $("#map").show();
}

var colour = ['#71c73e','#3399ff','#cc00cc','#ff8000']
function caldate(date2){
    date1 = "2014-01-01"
    date1 = date1.split('-');
    date2 = date2.split('-');
    date1 = new Date(date1[0], date1[1], date1[2]);
    date2 = new Date(date2[0], date2[1], date2[2]);
    date1_unixtime = parseInt(date1.getTime() / 1000);
    date2_unixtime = parseInt(date2.getTime() / 1000);
    var timeDifference = date2_unixtime - date1_unixtime;
    var timeDifferenceInHours = timeDifference / 60 / 60;

    var timeDifferenceInDays = timeDifferenceInHours  / 24;
    return timeDifferenceInDays;
}

function switch_time(date1){
    date1 = date1.split('-');
    date1 = new Date(date1[0], date1[1], date1[2]);
    date1_unixtime = parseInt(date1.getTime());
    return date1_unixtime-86400000*31;
}

var temp_6 = [
    [1391230800000, 60], [1391317200000, 100], [1391403600000, 18], [1391403600000+86400000, 50]
];
var temp_5 = [
    [1391230800000, 160], [1391317200000, 50], [1391403600000, 15], [1391403600000+86400000, 30]
];










var tmp_a;
var graphData;
$("#btn1").click(function () {
    disp();
    graphData = new Array();
    for(var i=0; i<clickedList.length; i++){
        var diff_ti = caldate(str1);
        var ma_key = clickedList[i]["key"];
        var tmp = myArr[ma_key];
        tmp_a = tmp.slice(diff_ti,diff_ti+9);
        var ref_tmp = tmp_a.map(function(arra){
            arra[0] = switch_time(arra[0]);
            return arra;
        })
        var obj = {};
        obj.data = ref_tmp;
        obj.color = colour[i];
        graphData.push(obj);
    }
    // Graph Data ##############################################
    //var graphData = [{
    //    // Visits
    //    data: buildings[0].temp,
    //    color: '#71c73e'
    //}, {
    //    // Returning Visits
    //    data: buildings[1].temp,
    //    color: '#77b7c5',
    //    points: { radius: 4, fillColor: '#77b7c5' }
    //}, {
    //    data: buildings[2].temp,
    //    color: '#CCFF66'
    //}
    //];
    //obj1 = {};
    //obj2 = {};
    //obj1.data = temp_6;
    //obj1.color = '#71c73e';
    //obj2.data = temp_5;
    //obj2.color = '#CCFF66';
    //graphData = [];
    //graphData.push(obj1);
    //graphData.push(obj2);
    //var graphData = [{
    //    // Visits
    //    data: temp_6,
    //    color: '#71c73e'
    //},{
    //    data: temp_5,
    //    color: '#CCFF66'
    //  }
    //];


    // Lines Graph #############################################
    $.plot($('#graph-lines'), graphData, {
        series: {
            points: {
                show: true,
                radius: 5
            },
            lines: {
                show: true
            },
            shadowSize: 0
        },
        grid: {
            color: '#646464',
            borderColor: 'transparent',
            borderWidth: 20,
            hoverable: true
        },
        xaxis: {
            timeformat: "%m/%d",
            mode: "time",
            tickColor: 'transparent',
            tickDecimals: 2
        },
        yaxis: {
            tickSize: 50
        }
    });

    // Bars Graph ##############################################
    $.plot($('#graph-bars'), graphData, {
        series: {
            bars: {
                show: true,
                barWidth: .9,
                align: 'center'
            },
            shadowSize: 0
        },
        grid: {
            color: '#646464',
            borderColor: 'transparent',
            borderWidth: 20,
            hoverable: true
        },
        xaxis: {
            timeformat: "%m/%d",
            mode: "time",
            tickColor: 'transparent',
            tickDecimals: 2
        },
        yaxis: {
            tickSize: 50
        }
    });

    // Graph Toggle ############################################
    $('#graph-bars').hide();

    $('#lines').on('click', function (e) {
        $('#bars').removeClass('active');
        $('#graph-bars').fadeOut();
        $(this).addClass('active');
        $('#graph-lines').fadeIn();
        e.preventDefault();
    });

    $('#bars').on('click', function (e) {
        $('#lines').removeClass('active');
        $('#graph-lines').fadeOut();
        $(this).addClass('active');
        $('#graph-bars').fadeIn();
//				.removeClass('hidden');
        e.preventDefault();
    });

    // Tooltip #################################################
    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
            top: y - 16,
            left: x + 20
        }).appendTo('body').fadeIn();
    }

    var previousPoint = null;

    $('#graph-lines, #graph-bars').bind('plothover', function (event, pos, item) {
        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;
                $('#tooltip').remove();
                var x = item.datapoint[0],
                    y = item.datapoint[1];
                y = y.toPrecision(5);
                showTooltip(item.pageX, item.pageY, y + ' kw ');
            }
        } else {
            $('#tooltip').remove();
            previousPoint = null;
        }
    });

});
