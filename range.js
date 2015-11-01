/**
 * Created by arearae on 10/8/15.
 */
var range_el = document.querySelector('input[type=range]'),
    style_el = document.createElement('style'),
    range_style = getComputedStyle(range_el),
    pad = range_style.paddingTop.split('px')[0],
    w = range_style.width.split('px')[0],
    fill_max_w = w - 2*pad,
    messages = [
        'minutes ago',
        'hours ago',
        'days ago',
        'days ago',
        'days ago',
        'start to view',
    ];

document.body.appendChild(style_el);
    var str_date1 = document.getElementById('startdate');
    var str_date2 = document.getElementById('enddate');
//str_date1.addEventListener('input', function() {
//
//    var str1 = this.value;
//},false)
//str_date2.addEventListener('input', function() {
//
//    var str2 = this.value;
//},false)
//console.log(str1)
var currenttime=''
var str_date1 = document.getElementById('startdate');
var str_date2 = document.getElementById('enddate');
var str1 = str_date1.value;
var str2 = str_date2.value;
var str1_list = str1.split('-'), str2_list = str2.split('-');
var time1 = new Date(parseInt(str1_list[0]), parseInt(str1_list[1]), parseInt(str1_list[2])),
    time2 = new Date(parseInt(str2_list[0]), parseInt(str2_list[1]), parseInt(str2_list[2]));
var time_diff = Math.floor((time2-time1)/(60*60*24*1000));

str_date1.addEventListener("change", myFunction2);
str_date2.addEventListener("change", myFunction3);

function myFunction2() {
    str1 = str_date1.value;
    str1_list = str1.split('-');
    time1 = new Date(parseInt(str1_list[0]), parseInt(str1_list[1]), parseInt(str1_list[2]));
    time_diff = Math.floor((time2-time1)/(60*60*24*1000));

}

function myFunction3(){
    str2 = str_date2.value;
    str2_list = str2.split('-');
    time2 = new Date(parseInt(str2_list[0]), parseInt(str2_list[1]), parseInt(str2_list[2]));
    time_diff = Math.floor((time2-time1)/(60*60*24*1000));
}

var dd, mm, yy;

range_el.addEventListener('input', function() {
    // str1 and str2 are start and end of time
    // 11/17/2015

    //var perc = this.value, dec = perc/100,
    //    fill_w = Math.round(dec*fill_max_w);
    //var time1 = new Date(parseInt(str1_list[2]), parseInt(str1_list[0]), parseInt(str1_list[1])),
    //    time2 = new Date(parseInt(str2_list[2]), parseInt(str2_list[0]), parseInt(str2_list[1]));
    //// diff of number of days
    //var time_diff = Math.floor((time2-time1)/(60*60*24*1000));
    //var time_chosen = new Date(Math.floor(dec*time_diff)*24*60*60*1000+time1.getTime());
    //var time_day = time_chose.getDate();
    //var time_month = time_chosen.getMonth()+1;
    //var time_year = time_chosen.getFullYear();
    //var mssg = time_month.toString()+'/'+time_day.toString()+'/'+time_year.toString();


    msg = messages[6];
    var perc = this.value, dec = perc/100,
        fill_w = Math.round(dec*fill_max_w);
    var frac = Math.floor(perc/25);
    var time_chosen = new Date(Math.floor(dec*time_diff)*24*60*60*1000+time1.getTime());
     dd = time_chosen.getDate().toString();
     mm = time_chosen.getMonth();
     if(mm==0){
         mm=12;
         mm=mm.toString();
     }
     yy = time_chosen.getFullYear().toString();
    var res_str = mm+"/"+dd;
    msg = messages[frac];
    var mssg = str1;
    if (perc==0){
        msg=messages[5];
    }
    var num = 0;
    if (perc<25){
        num = Math.floor(perc/25*60);
        if (num==1){
            msg=yy.toString();
        }
        mssg=res_str;
    }
    else if(perc<50){
        num = Math.floor((perc-25)/25*23)+1;
        if (num==1){
            msg =yy.toString();
        }
        mssg=res_str;
    }
    else{
        num=Math.floor((perc-50)/50*9)+1;
        if (num==1){
            msg = yy.toString();
        }
        mssg=res_str;
    }

    for(var i = 0; i < 4; i++) {
        if(perc > i*25 && i <= (i + 1)*25) {
            msg = yy.toString();
        }
    }

    style_el.textContent =
        '.js input[type=range]::-webkit-slider-runnable-track:before,' +
        '.js input[type=range] /deep/ #track:before{width:' + fill_w + 'px}' +
        '.js input[type=range]::-webkit-slider-thumb:before,' +
        '.js input[type=range] /deep/ #thumb:before{content:"' + mssg + '"}' +
        '.js input[type=range]::-webkit-slider-thumb:after,' +
        '.js input[type=range] /deep/ #thumb:after{content:"' + msg + '"}';
}, false);