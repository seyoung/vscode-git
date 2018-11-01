/*  Prototype Dreamtech Kiosk, version 1.0.0.0
 *  (c) 2018-2019 Seyoung Park.
 *
 *
 *
 */
var response, response2, response3;
var uniq;
var resource_id;
var today;
var fromtime = {
    current_day : 1,
    current_day_time : 2,
    current_day_time_start : 3,
    current_day_time_end : 4
};

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function today_time(type){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}

    // 2018-11-01
    if(type == fromtime.current_day){
        today = yyyy+'-'+mm+'-'+dd;
    }
    // 2018-11-01 오후 1:54:49
    else if(type == fromtime.current_day_time){
        if (h>= 12 && h<=24) { today = yyyy+'-'+mm+'-'+dd+' 오후 '+(h-12)+':'+m+':'+s;}
        else { today = yyyy+'-'+mm+'-'+dd+' 오전 '+h+':'+m+':'+s;}
    }
    // 2018-10-31 00:30:00.000
    else if(type == fromtime.current_day_time_start){
        today = yyyy+'-'+mm+'-'+dd+' '+'00'+':'+'30'+':'+'00';
    }
    // 2018-10-31 23:30:00.000
    else if(type == fromtime.current_day_time_end){
        today = yyyy+'-'+mm+'-'+dd+' '+'23'+':'+'30'+':'+'00';
    }

    console.log('>'+today);
    return today;
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function doAjax(method, func, sdate, edate, res_seq) {
    console.log('>doAjax: '+method);

    var server, username, password, portnumber, dbname;
    var jsdate, jedate, jres_seq;
    server = JSON.stringify($('#server').val());
    username = JSON.stringify($('#username').val());
    password = JSON.stringify($('#password').val());
    portnumber = JSON.stringify($('#portnumber').val());
    dbname = JSON.stringify($('#dbname').val());
    jsdate = JSON.stringify(sdate);
    jedate = JSON.stringify(edate);
    jres_seq = JSON.stringify(res_seq);

    console.log(server.concat("/", username, "/", password, "/", portnumber, "/", dbname));

    ajax = theAjax(method, 'http://localhost/vscode-git/kiosk/php/GetDatabases.php',
                   server, username, password, portnumber, dbname ,jsdate, jedate, jres_seq);
    ajax.done(func);
    ajax.fail(function () { alert("Failure"); });
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function theAjax(method, url, server, username, password, portnum, dbname, sdate, edate, res_seq) {
    console.log('>theAjax');
    return $.ajax({
        type: 'POST',
        url: url,
        data: { method: method,
            server: server,
            username: username,
            password: password,
            portnum: portnum,
            dbname: dbname,
            sdate: sdate,
            edate: edate,
            res_seq: res_seq
        }
    });
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function changeLang_1_Select(){
    console.log(">database changeLangSelect");
    $("#databases1 option").remove();

    for(var i = 0; i < response.data['database']['position'].length; i++) {
        if($("#databases option:selected").val() == response.data['database']['position'][i]){
            $("#databases1")
            .append($('<option>', {text: response.data['database']['info'][i]}));
        }
        if($("#databases option:selected").val() == response.data['database']['position'][i] &&
           $("#databases1 option:selected").val() == response.data['database']['info'][i]){
           console.log(response.data['database']['resource_seq'][i]);
           resource_id = response.data['database']['resource_seq'][i];
        }
    }
    //'2018-10-31 01:00' and '2018-10-31 23:00'
    doAjax("Get_DB_cal_res_sch", ret_Get_DB_cal_res_sch, '2018-10-31 01:00', '2018-10-31 23:00', resource_id);
    //doAjax("Get_DB_cal_res_sch", ret_Get_DB_cal_res_sch, today_time(), today_time(), resource_id);
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function changeLang_2_Select(){
    console.log(">database1 changeLangSelect");

    for(var i = 0; i < response.data['database']['position'].length; i++) {
        if($("#databases option:selected").val() == response.data['database']['position'][i] &&
           $("#databases1 option:selected").val() == response.data['database']['info'][i]){
           console.log(response.data['database']['resource_seq'][i]);
           resource_id = response.data['database']['resource_seq'][i];
        }
    }
    //'2018-10-31 01:00' and '2018-10-31 23:00'
    doAjax("Get_DB_cal_res_sch", ret_Get_DB_cal_res_sch, '2018-10-31 01:00', '2018-10-31 23:00', resource_id);
    //doAjax("Get_DB_cal_res_sch", ret_Get_DB_cal_res_sch, today_time(), today_time(), resource_id);
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function text_add(num){
    var $textarea = $('#total_text');
    var $test = num+'\n';
    console.log(num);
    $textarea.append($test);
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function ret_Get_DB_cal_res(response_in) {
    console.log('>ret_Get_DB_cal_res');
    response = JSON.parse(response_in);
    console.log(response);

    uniq = response.data['database']['position'].reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
    },[]);

    $.each(uniq, function(key, value)
    {
        $("#databases")
        .append($('<option>', {
            value: value.toString(),
            text: value.toString()}));
    });

    for(var i = 0; i < response.data['database']['position'].length; i++) {
        if($("#databases option:selected").val() == response.data['database']['position'][i]){
            $("#databases1")
            .append($('<option>', {text: response.data['database']['info'][i]}));
        }
    }

    for(var i = 0; i < response.data['database']['position'].length; i++) {
        if($("#databases option:selected").val() == response.data['database']['position'][i] &&
           $("#databases1 option:selected").val() == response.data['database']['info'][i]){
           console.log(response.data['database']['resource_seq'][i]);
           resource_id = response.data['database']['resource_seq'][i];
        }
    }
    //'2018-10-31 01:00' and '2018-10-31 23:00'
    doAjax("Get_DB_cal_res_sch", ret_Get_DB_cal_res_sch, '2018-10-31 01:00', '2018-10-31 23:00', resource_id);
    //doAjax("Get_DB_cal_res_sch", ret_Get_DB_cal_res_sch, today_time(), today_time(), resource_id);
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function ret_Get_DB_cal_res_sch(response_in) {
    console.log('>ret_Get_DB_cal_res_sch');
    response2 = JSON.parse(response_in);
    console.log(response2);

    $("#total_text").empty();
    $('#total_text').prop('readonly', true);

    for(var i = 0; i < response2.data['database']['resource_seq'].length; i++)
    {
        console.log(i);
        var text_str = 'resource_seq: '+response2.data['database']['resource_seq'][i]+','+
                       'actor: '+response2.data['database']['actor'][i]+','+
                       'sdate: '+response2.data['database']['sdate'][i]+','+
                       'edate: '+response2.data['database']['edate'][i]+','+
                       'body: '+response2.data['database']['body'][i]+'\n';
        text_add(text_str);
    };
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function ret_Get_DB_cal_res_view(response_in) {
    console.log('>ret_Get_DB_cal_res_view');
    response3 = JSON.parse(response_in);
    console.log(response3);
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
$(function () {
    // init resource load ----------------------------
    // get today
    today_time(fromtime.current_day);
    today_time(fromtime.current_day_time);
    today_time(fromtime.current_day_time_start);
    today_time(fromtime.current_day_time_end);

    // get meeting room list of database
    doAjax("Get_DB_cal_res", ret_Get_DB_cal_res);

    // button ----------------------------------------
    var duration = 300;
    $('#buttons1 button:nth-child(-n+3)')
        .on('click', function () {

            //doAjax("Get_DB_cal_res_view", ret_Get_DB_cal_res_view, today_time(fromtime.current_day_time_start), today_time(fromtime.current_day_time_end));

            doAjax("Get_DB_cal_res_view", ret_Get_DB_cal_res_view,
            '2018-10-31 00:30:00.000', '2018-10-31 23:30:00.000');

            $(this).stop(true).animate({
                backgroundColor: '#ae5e9b',
                color: '#fff'
            }, duration);

        })
        .on('mouseout', function () {
            $(this).stop(true).animate({
                backgroundColor: '#fff',
                color: '#ebc000'
            }, duration);
        });

    // aside ----------------------------------------
    var $aside = $('.page-main > aside');
    var $asidButton = $aside.find('button')
        .on('click', function () {
            $aside.toggleClass('open');
            if ($aside.hasClass('open')) {
                $aside.stop(true).animate({ left: '-70px' }, duration, 'easeOutBack');
                $asidButton.find('img').attr('src', 'img/btn_close.png');
            } else {
                $aside.stop(true).animate({ left: '-350px' }, duration, 'easeInBack');
                $asidButton.find('img').attr('src', 'img/btn_open.png');
            };
        });
});
