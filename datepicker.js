$(".datepicker").datepicker({
    inline: true,
    showOtherMonths: true,
    dateFormat: 'yy-mm-dd',
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
});

$("button").click(function () {
    var first, second;
    first = $(".datepicker[name=datepicker1]").val();
    second = $(".datepicker[name=datepicker2]").val();
    alert(first + " , " + second);
    first = $(".datepicker[name=datepicker1]").datepicker('getDate');
    second = $(".datepicker[name=datepicker2]").datepicker('getDate');
    alert(first + " , " + second);
});