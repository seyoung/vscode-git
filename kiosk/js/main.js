/**************************************************************************************
 *  Prototype Dreamtech Kiosk, version 1.0.0.0
 *  (c) 2018-2019 Seyoung Park.
 *
 *
 *
 **************************************************************************************/

 /*
    Global Define Enable/Disable
 */

 // true: console.log enable, false: console.log disable
var DEBUG_EN = true;

// true: python, false: php
var CODE_RUN_PY = true;

// true: windows, false: raspberry pi 3
// If used with php (CODE_RUN_PY = false), CODE_RUN_WINDOWS value is meaningless.
var CODE_RUN_WINDOWS = false;

/*
    Global Variables
*/
var response, response2, response3, response4;
var uniq;
var resource_id;
var today;
var fromtime = {
    current_year_start: 1,
    current_year_end: 2,
    current_day: 3,
    current_day_time: 4,
    current_day_time_start: 5,
    current_day_time_end: 6,
    current_time: 7,
    before_aweek_today: 8,
    after_aweek_today: 9,
};
var table;
var alertX = null;
var getlistDB = false;

/**
The data that will be show by the data table
*/
var dataSet = [
    ["준비중", "준비중", "준비중", "준비중"]
];

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function get_dayoftheweek() {
    var week = ['일', '월', '화', '수', '목', '금', '토'];
    var dayOfWeek = week[new Date().getDay()];
    return dayOfWeek;
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function get_a_week_afterbefore_from_today(type){
    var date = new Date();
    var result;
    if (type == fromtime.before_aweek_today) {
        date.setDate(date.getDate() - 7);
    }
    else if(type == fromtime.after_aweek_today){
        date.setDate(date.getDate() + 7);
    }
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    if (m < 10) {
        m = '0' + m
    }
    if (s < 10) {
        s = '0' + s
    }

    // 2018-11-07 00:30:00.000
    if (type == fromtime.before_aweek_today) {
        result = yyyy + '-' + mm + '-' + dd + ' ' + '00' + ':' + '00' + ':' + '00';
    }
    // 2018-11-21 23:30:00.000
    else if (type == fromtime.after_aweek_today) {
        result = yyyy + '-' + mm + '-' + dd + ' ' + '23' + ':' + '59' + ':' + '00';
    }
    //if(DEBUG_EN) console.log('> result time : ' + result);
    return result;
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function today_time(type) {
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    if (m < 10) {
        m = '0' + m
    }
    if (s < 10) {
        s = '0' + s
    }

    // 2018-01-01
    if (type == fromtime.current_year_start) {
        today = yyyy + '-' + '01' + '-' + '01';
    }
    // 2018-01-01
    else if (type == fromtime.current_year_end) {
        today = yyyy + 2 + '-' + '01' + '-' + '01';
    }
    // 2018-11-01
    else if (type == fromtime.current_day) {
        today = yyyy + '-' + mm + '-' + dd;
    }
    // 2018-11-01(화) 오후 1:54:49
    else if (type == fromtime.current_day_time) {
        if (h >= 12 && h <= 24) {
            today = yyyy + '-' + mm + '-' + dd + '('+get_dayoftheweek()+')' + ' 오후 ' + (h - 12) + ':' + m + ':' + s;
        } else {
            today = yyyy + '-' + mm + '-' + dd + '('+get_dayoftheweek()+')' + ' 오전 ' + h + ':' + m + ':' + s;
        }
    }
    // 2018-10-31 00:30:00.000
    else if (type == fromtime.current_day_time_start) {
        today = yyyy + '-' + mm + '-' + dd + ' ' + '00' + ':' + '00' + ':' + '00';
    }
    // 2018-10-31 23:30:00.000
    else if (type == fromtime.current_day_time_end) {
        today = yyyy + '-' + mm + '-' + dd + ' ' + '23' + ':' + '59' + ':' + '00';
    }
    // 23:30:00
    else if(type == fromtime.current_time) {
        if (h < 10) {
            h = '0' + h
        }
        today = h + ':' + m;
    }
    //if(DEBUG_EN) console.log('>' + today);
    return today;
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function doAjax(method, func, sdate, edate, res_seq, schedule_seq) {
    if(DEBUG_EN) console.log('>doAjax: ' + method);

    var server, username, password, portnumber, dbname;
    var jsdate, jedate, jres_seq, jschedule_seq;
    server = JSON.stringify($('#server').val());
    username = JSON.stringify($('#username').val());
    password = JSON.stringify($('#password').val());
    portnumber = JSON.stringify($('#portnumber').val());
    dbname = JSON.stringify($('#dbname').val());
    jsdate = JSON.stringify(sdate);
    jedate = JSON.stringify(edate);
    jres_seq = JSON.stringify(res_seq);
    jschedule_seq = JSON.stringify(schedule_seq);

    if(DEBUG_EN) console.log(server.concat("/", username, "/", password, "/", portnumber, "/", dbname));

    ajax = theAjax(method, 'http://localhost/vscode-git/kiosk/php/GetDatabases.php',
        server, username, password, portnumber, dbname, jsdate, jedate, jres_seq, jschedule_seq);
    ajax.done(func);
    ajax.fail(function(msg){
        if(DEBUG_EN) console.log('ajax fail');
        //alert("error occured");
    });
    ajax.always(function(msg){
        //if(DEBUG_EN) console.log('ajax always');
        //alert("always occured");
    });
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function theAjax(method, url, server, username, password, portnum, dbname, sdate, edate, res_seq, schedule_seq) {
    if(DEBUG_EN) console.log('>theAjax');
    return $.ajax({
        type: 'POST',
        url: url,
        data: {
            method: method,
            server: server,
            username: username,
            password: password,
            portnum: portnum,
            dbname: dbname,
            sdate: sdate,
            edate: edate,
            res_seq: res_seq,
            schedule_seq: schedule_seq
        },
        cache: false
    });
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function doAjax_py(method=null, func=null, sdate=null, edate=null, res_seq=null, schedule_seq=null) {
    if(DEBUG_EN) console.log('>doAjax_py: ' + method);

    var server, username, password, portnumber, dbname;
    var jsdate, jedate, jres_seq, jschedule_seq;
    server = JSON.stringify($('#server').val());
    username = JSON.stringify($('#username').val());
    password = JSON.stringify($('#password').val());
    portnumber = JSON.stringify($('#portnumber').val());
    dbname = JSON.stringify($('#dbname').val());
    jsdate = JSON.stringify(sdate);
    jedate = JSON.stringify(edate);
    jres_seq = JSON.stringify(res_seq);
    jschedule_seq = JSON.stringify(schedule_seq);

    if(DEBUG_EN) console.log(server.concat("/", username, "/", password, "/", portnumber, "/", dbname));

    ajax = theAjax_py(/*method,*/ 'http://127.0.0.1:5000/'+method,
        server, username, password, portnumber, dbname, jsdate, jedate, jres_seq, jschedule_seq);
    ajax.done(func);
    ajax.fail(function(msg){
        if(DEBUG_EN) console.log('ajax fail');
        //alert("error occured");
    });
    ajax.always(function(msg){
        //if(DEBUG_EN) console.log('ajax always');
        //alert("always occured");
    });
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function theAjax_py(/*method, */url, server, username, password, portnum, dbname, sdate, edate, res_seq, schedule_seq) {
    if(DEBUG_EN) console.log('>theAjax_py');
    return $.ajax({
        type: 'POST',//'POST' 'GET',
        url: url,
        dataType: "json",
        data: {
            /*method: method,*/
            server: server,
            username: username,
            password: password,
            portnum: portnum,
            dbname: dbname,
            sdate: sdate,
            edate: edate,
            res_seq: res_seq,
            schedule_seq: schedule_seq,
            run: CODE_RUN_WINDOWS,
        },
        crossDomain: true,
        cache: false
    });
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function changeLang_1_Select() {
    if(!getlistDB) return;

    //if(DEBUG_EN) console.log(">database changeLang_1_Select");
    $("#databases1 option").remove();
    text_clear();

    if(response){
        for (var i = 0; i < response.data['database']['position'].length; i++) {
            if ($("#databases option:selected").val() == response.data['database']['position'][i]) {
                //if(DEBUG_EN) console.log("1."+i)
                $("#databases1")
                    .append($('<option>', {
                        text: response.data['database']['info'][i]
                    }));
            }
            if ($("#databases option:selected").val() == response.data['database']['position'][i] &&
                $("#databases1 option:selected").val() == response.data['database']['info'][i]) {
                if(DEBUG_EN) console.log(response.data['database']['resource_seq'][i]);
                resource_id = response.data['database']['resource_seq'][i];
            }
        }
        text_display();
    }
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function changeLang_2_Select() {
    if(!getlistDB) return;

    //if(DEBUG_EN) console.log(">database1 changeLang_2_Select");
    text_clear();

    if(response){
        for (var i = 0; i < response.data['database']['position'].length; i++) {
            if ($("#databases option:selected").val() == response.data['database']['position'][i] &&
                $("#databases1 option:selected").val() == response.data['database']['info'][i]) {
                if(DEBUG_EN) console.log(response.data['database']['resource_seq'][i]);
                resource_id = response.data['database']['resource_seq'][i];
            }
        }
        text_display();
    }
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function text_display() {
    var text_array = new Array();
    var text_cnt = 0;
    var index = 0;
    var status;
    var res_seq, schedule_seq, sdate, edate, actor, body;
    //if(DEBUG_EN) console.log(">text_display");

    if(response2 && response3){
        for (var i = 0; i < response3.data['database']['schedule_seq'].length; i++) {
            //response3.data['database']['schedule_seq'][i]
            //response3.data['database']['view_start_date'][i].date
            //response3.data['database']['view_end_date'][i].date
            for (var k = 0; k < response2.data['database']['schedule_seq'].length; k++) {
                //response2.data['database']['schedule_seq'][k]
                //response2.data['database']['resource_seq'][k]
                //response2.data['database']['actor'][k]
                //response2.data['database']['body'][k]

                if (response3.data['database']['schedule_seq'][i] === response2.data['database']['schedule_seq'][k] && response2.data['database']['resource_seq'][k] == resource_id) {
                    res_seq = response2.data['database']['resource_seq'][k];
                    schedule_seq = response3.data['database']['schedule_seq'][i];

                    if(CODE_RUN_PY == true){
                        sdate = response3.data['database']['view_start_date'][i].substring(0/*11*/,16);
                        edate = response3.data['database']['view_end_date'][i].substring(0/*11*/,16);
                    }
                    else{
                        sdate = response3.data['database']['view_start_date'][i].date.substring(0/*11*/,16);
                        edate = response3.data['database']['view_end_date'][i].date.substring(0/*11*/,16);
                    }

                    actor = response2.data['database']['actor'][k].replace(/▒/gi, ' ');
                    body = response2.data['database']['body'][k];

                    // 2018-11-01 // 23:30:00
                    var now = today_time(fromtime.current_day) + ' ' + today_time(fromtime.current_time);

                    // schedule start ---- now ---- schedule stop
                    if(sdate <= now && now < edate){
                        status = "진행중";
                    }
                    // ---- now ------------------- schedule stop
                    else if(now >= edate){
                        // only today
                        if(sdate.substring(0, 10) == today_time(fromtime.current_day))
                        {
                            status = "완료";
                        }
                        else{
                            continue;
                        }
                    }
                    // ---------------------------- schedule stop ---- now
                    else if (now < edate){
                        if(sdate.substring(0, 10) == today_time(fromtime.current_day))
                        {
                            status = "예정";
                        }
                        else{
                            continue;
                        }
                    }
                    // insert data
                    text_array[text_cnt] = new Array(4);
                    text_array[text_cnt][0] = sdate + ' ~ ' + edate;
                    text_array[text_cnt][1] = actor;
                    text_array[text_cnt][2] = body;
                    text_array[text_cnt][3] = status;

                    // index value is fist of remain schedule
                    if(now < edate && index == 0){
                        index = text_cnt/10;
                        if(index < 1) index = 0;
                        //if(DEBUG_EN) console.log('current position: '+text_cnt+', page number: '+index);
                    }
                    text_cnt++;
                    /*var text_str =
                        ' ' + res_seq + ',' +
                        ' ' + schedule_seq + ',' +
                        ' ' + sdate + ',' +
                        ' ' + edate + ',' +
                        ' ' + actor + ',' +
                        ' ' + body;
                    if(DEBUG_EN) console.log(text_str);*/
                }
            };
        };
        // display list
        RemoveTable();
        table = MakeMeetingRoomTable(text_array);

        // highlight the current meeting room
        for(var i=0; i<text_array.length; i++){
            if(text_array[i][3] == "진행중"){
                table.$('td', i).css('backgroundColor', 'blue');
                table.$('td', i).css('color', 'white');
                //table.$('tr:odd').css('backgroundColor', 'blue');
            }
            else{
                table.$('td', i).css('backgroundColor', 'white');
                table.$('td', i).css('color', 'black');
                //table.$('tr:odd').css('backgroundColor', 'blue');

            }
        }
        // going current page
        table.page(index).draw('page');
    }
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function text_init() {
    $('#total_text').prop('readonly', true);
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function text_clear() {
    $("#total_text").empty();
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function text_add(num) {
    var $textarea = $('#total_text');
    var $test = num + '\n';
    //if(DEBUG_EN) console.log(num);
    $textarea.append($test);
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function ret_Get_DB_cal_res(response_in) {
    if(DEBUG_EN) console.log('>ret_Get_DB_cal_res');
    if(CODE_RUN_PY == true){ response = response_in; }
    else{ response = JSON.parse(response_in); }
    if(DEBUG_EN) console.log(response);

    // return error
    if(response.success == false){
        if(CODE_RUN_PY == true){
            $('#error_info').text(response.errorMessage);
        }
        else {
            $.each(response.errorMessage, function (key, value) {
                $('#error_info').text(response.errorMessage);
            });
        }
        return;
    }
    else{
        $('#error_info').text('');
    }

    /* delete meeting room position */
    $("#databases option").remove();
    $("#databases1 option").remove();

    /* sorting meeting room position */
    uniq = response.data['database']['position'].reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);

    /* insert meeting room position */
    $.each(uniq, function (key, value) {
        $("#databases")
            .append($('<option>', {
                value: value.toString(),
                text: value.toString()
            }));
    });

    if(resource_id != null){
        /* select previous meeting room position */
        for (var i = 0; i < response.data['database']['position'].length; i++) {
            if (resource_id == response.data['database']['resource_seq'][i]) {
                $('#databases').val(response.data['database']['position'][i]);
            }
        }
        for (var i = 0; i < response.data['database']['position'].length; i++) {
            if ($("#databases option:selected").val() == response.data['database']['position'][i]) {
                $("#databases1")
                    .append($('<option>', {
                        text: response.data['database']['info'][i]
                    }));
            }
        }
        for (var i = 0; i < response.data['database']['position'].length; i++) {
            if (resource_id == response.data['database']['resource_seq'][i]) {
                $('#databases1').val(response.data['database']['info'][i]);
            }
        }
    }
    else{
        /* insert meeting room info */
        for (var i = 0; i < response.data['database']['position'].length; i++) {
            if ($("#databases option:selected").val() == response.data['database']['position'][i]) {
                $("#databases1")
                    .append($('<option>', {
                        text: response.data['database']['info'][i]
                    }));
            }
        }
        for (var i = 0; i < response.data['database']['position'].length; i++) {
            if ($("#databases option:selected").val() == response.data['database']['position'][i] &&
                $("#databases1 option:selected").val() == response.data['database']['info'][i]) {
                if(DEBUG_EN) console.log(response.data['database']['resource_seq'][i]);
                resource_id = response.data['database']['resource_seq'][i];
            }
        }
    }

    // get meeting room schedule list of database
    if(CODE_RUN_PY == true){
        doAjax_py("Get_DB_cal_res_view", ret_Get_DB_cal_res_view, get_a_week_afterbefore_from_today(fromtime.before_aweek_today), get_a_week_afterbefore_from_today(fromtime.after_aweek_today));
    }
    else{
        //doAjax("Get_DB_cal_res_view", ret_Get_DB_cal_res_view, today_time(fromtime.current_day_time_start), today_time(fromtime.current_day_time_end));
        //doAjax("Get_DB_cal_res_view", ret_Get_DB_cal_res_view, '2018-11-06 00:30:00.000', '2018-11-20 23:30:00.000');
        doAjax("Get_DB_cal_res_view", ret_Get_DB_cal_res_view, get_a_week_afterbefore_from_today(fromtime.before_aweek_today), get_a_week_afterbefore_from_today(fromtime.after_aweek_today));
    }
    getlistDB = true;
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function ret_Get_DB_cal_res_sch(response_in) {
    if(DEBUG_EN) console.log('>ret_Get_DB_cal_res_sch');
    if(CODE_RUN_PY == true){ response2 = response_in; }
    else{ response2 = JSON.parse(response_in); }
    if(DEBUG_EN) console.log(response2);

    // return error
    if(response2.success == false){
        if(CODE_RUN_PY == true){
            $('#error_info').text(response.errorMessage);
        }
        else {
            $.each(response.errorMessage, function (key, value) {
                $('#error_info').text(response.errorMessage);
            });
        }
        return;
    }
    else{
        $('#error_info').text('');
    }
    /*
    for(var i = 0; i < response2.data['database']['resource_seq'].length; i++)
    {
        var text_str = '1: '+response2.data['database']['schedule_seq'][i]+','+
                       '2: '+response2.data['database']['resource_seq'][i]+','+
                       '3: '+response2.data['database']['actor'][i]+','+
                       '4: '+response2.data['database']['sdate'][i].date+','+
                       '5: '+response2.data['database']['edate'][i].date+','+
                       '6: '+response2.data['database']['body'][i];
        if(DEBUG_EN) console.log(i);
    };
    */
    text_clear();
    text_display();
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function ret_Get_DB_cal_res_view(response_in) {
    if(DEBUG_EN) console.log('>ret_Get_DB_cal_res_view');
    if(CODE_RUN_PY == true){ response3 = response_in; }
    else{ response3 = JSON.parse(response_in); }
    if(DEBUG_EN) console.log(response3);

    // return error
    if(response3.success == false){
        if(CODE_RUN_PY == true){
            $('#error_info').text(response.errorMessage);
        }
        else {
            $.each(response.errorMessage, function (key, value) {
                $('#error_info').text(response.errorMessage);
            });
        }
        return;
    }
    else{
        $('#error_info').text('');
    }
    /*
    for(var i = 0; i < response3.data['database']['schedule_seq'].length; i++)
    {
        var text_str = '1: '+response3.data['database']['resource_view_seq'][i]+','+
                       '2: '+response3.data['database']['schedule_seq'][i]+','+
                       '3: '+response3.data['database']['view_start_date'][i].date+','+
                       '4: '+response3.data['database']['view_end_date'][i].date;
         if(DEBUG_EN) console.log(i);
    };
    */
    if(CODE_RUN_PY == true){
        doAjax_py("Get_DB_cal_res_sch", ret_Get_DB_cal_res_sch, today_time(fromtime.current_year_start), today_time(fromtime.current_year_end));
    }
    else{
        doAjax("Get_DB_cal_res_sch", ret_Get_DB_cal_res_sch, today_time(fromtime.current_year_start), today_time(fromtime.current_year_end));
    }
}


/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
/* function ret_py_Get_DB_cal_res(response_in) {
    if(DEBUG_EN) console.log('>ret_py_Get_DB_cal_res');
    response = response_in;
    if(DEBUG_EN) console.log(response);
} */

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
/* function ret_py_Get_DB_cal_res_sch(response_in) {
    if(DEBUG_EN) console.log('>ret_py_Get_DB_cal_res_sch');
    response2 = response_in;
    if(DEBUG_EN) console.log(response2);
} */

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
/* function ret_py_Get_DB_cal_res_view(response_in) {
    if(DEBUG_EN) console.log('>ret_py_Get_DB_cal_res_view');
    response3 = response_in;
    if(DEBUG_EN) console.log(response3);
} */

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function MakeMeetingRoomTable(data_array){
    return $('#wgc_table').DataTable( {
       "scrollY": "420px",
       "scrollX": false,
       "autoWidth": true,
       "fixedHeader": {
           "header": false,
           "footer": false
       },
        "columnDefs": [
            { "width": "100px", "targets": 0 },  // 예약 시간
            { "width": "100px", "targets": 1 },  // 주관자
            { "width": "220px", "targets": 2 }, // 회의 제목
            { "width": "100px", "targets": 3 },  // 진행 상황
        ],
        "language": {
            "paginate": {
                "previous": "이전",
                "next": "다음"
            },
            "info": "", /* Remove info */
            "lengthMenu": "", /* Remove Length Menu */
            "emptyTable": "일정이 없습니다.",
            "sInfoEmpty": "",
        },
        data: data_array, //data used by the data table
        columns: [
            { title: "예약 시간" },
            { title: "주관자" },
            { title: "회의 제목" },
            { title: "진행 상황"}
        ]
    });
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function RemoveTable()
{
    table.destroy();
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
$(function () {
    $(document).ready(function () {
        if(DEBUG_EN) console.log('ready');
        // init resource load ----------------------------
        // ui_init
        text_init();
        if(CODE_RUN_PY == true){ doAjax_py("Get_DB_cal_res", ret_Get_DB_cal_res); }
        else{ doAjax("Get_DB_cal_res", ret_Get_DB_cal_res); }

        // time display
        setInterval(function(){
            var timer = new Date();
            var h = timer.getHours();
            var m = timer.getMinutes();
            var s = timer.getSeconds();
            document.getElementById('clock').innerHTML = today_time(fromtime.current_day_time);
        },1000);

        setInterval(function(){
            // get meeting room list of database
            if(CODE_RUN_PY == true){ doAjax_py("Get_DB_cal_res", ret_Get_DB_cal_res); }
            else{ doAjax("Get_DB_cal_res", ret_Get_DB_cal_res); }
        },1000*(60*1)/*30초*/);

        // alarm setting
        alertX = $.dialog.alert;
    });
    /*
     * Tabs
     */
    $('#work').each(function () {
        // 탭의 각 요소를 jQuery 객체 화
        var $tabList = $(this).find('.tabs-nav'), // 탭의 목록
            $tabAnchors = $tabList.find('a'), // 탭 (링크)
            $tabPanels = $(this).find('.tabs-panel'); // 패널

        // 탭이 클릭되었을 때의 처리
        // 인자로 이벤트 객체를 받는다.
        $tabList.on('click', 'a', function (event) {

            // 링크 클릭에 대한 기본 동작을 취소
            event.preventDefault();

            // 클릭 된 탭을 jQuery 오브젝트화
            var $this = $(this);

            // 만약 이미 선택된 탭이라면 아무것도하지 않고 처리를 중지
            if ($this.hasClass('active')) {
                return;
            }

            // 모든 탭의 선택 상태를 해제 한,
            // 클릭 된 탭을 선택 상태로
            $tabAnchors.removeClass('active');
            $this.addClass('active');

            // 모든 패널을 일단 비 표시로하고
            // 클릭 된 탭에 대응하는 패널을 표시
            $tabPanels.hide();
            $($this.attr('href')).show();

        });
        // 첫 번째 탭을 선택 상태로
        $tabAnchors.eq(0).trigger('click');
    });
    /**
    When the DOM is ready, we use the data table API to create a new one
    based on a javascript array that provides the data.
    */
    $(document).ready(function() {
        table = MakeMeetingRoomTable(dataSet);
        /*
        $('.marquee').marquee({
            //speed in milliseconds of the marquee
            loop: -1,
            duration: 10000,
            //gap in pixels between the tickers
            gap: 10,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 0,
            //'left' or 'right'
            direction: 'left',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true
        });
        */
        $('.marquee')
        .bind('beforeStarting', function () {
            //code you want to execute before starting the animations
        })
        .bind('finished', function () {
            //code you want to execute before after each animation loop
        })
        //Apply plugin
        .marquee({
            duration: 10000
        });

        $('#alertXX').bind('click', function () {
            //if(CODE_RUN_PY == true){ doAjax_py("Get_DB_cal_res", ret_Get_DB_cal_res); }
            //else{ doAjax("Get_DB_cal_res", ret_Get_DB_cal_res); }
            //alert('Im going to start processing');
            //doAjax_py("Get_DB_cal_res", ret_Get_DB_cal_res);
            /* table.page(1).draw('page'); */
            /* table.page('next').draw('page');
            table.page('previous').draw('page'); */
            /*alertX("회의실 시작 10분전", "08:30 ~ 15:30 <br> 품질보증팀 조우규 주임 <br> 품질보증팀 계측기 관리방안 회의", function () {
                //$.dialog.alert("Alert", "Closed");
            });*/
        });
    });
});
