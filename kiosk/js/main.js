/*  Prototype Dreamtech Kiosk, version 1.0.0.0
 *  (c) 2018-2019 Seyoung Park.
 *
 *
 *
 */

var response;
var uniq;
var resource_id;
var today;

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function today_time(){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) { dd='0'+dd }
    if(mm<10) {mm='0'+mm }
    today = yyyy+'-'+mm+'-'+dd;
    console.log('>'+today);
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function theAjax(method, url, server, username, password, portnum, dbname/*, adate, edate, res_seq*/) {
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
            /*
            adate: adate,
            edate: edate,
            res_seq: res_seq,
            */
        }
    });
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function doAjax(method, func) {
    console.log('>doAjax');
    var server, username, password, portnumber, dbname;
    server = JSON.stringify($('#server').val());
    username = JSON.stringify($('#username').val());
    password = JSON.stringify($('#password').val());
    portnumber = JSON.stringify($('#portnumber').val());
    dbname = JSON.stringify($('#dbname').val());
    /*
    adate = JSON.stringify($('#adate').val());
    edate = JSON.stringify($('#edate').val());
    res_seq = JSON.stringify($('#res_seq').val());
    */
    console.log(server.concat("/", username, "/", password, "/", portnumber, "/", dbname));

    ajax = theAjax(method, 'http://localhost/vscode-git/kiosk/php/GetDatabases.php',
                   server, username, password, portnumber, dbname/*,adate, edate, res_seq*/);
    ajax.done(func);
    ajax.fail(function () { alert("Failure"); });
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function changeLang_1_Select(){
    console.log(">database changeLangSelect");
    $("#databases1 option").remove();

    for(var i = 0; i < response.data['database_names']['position'].length; i++) {
        if($("#databases option:selected").val() == response.data['database_names']['position'][i]){
            $("#databases1")
            .append($('<option>', {text: response.data['database_names']['info'][i]}));
        }
    }
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function changeLang_2_Select(){
    console.log(">database1 changeLangSelect");

    for(var i = 0; i < response.data['database_names']['position'].length; i++) {
        if($("#databases option:selected").val() == response.data['database_names']['position'][i] &&
           $("#databases1 option:selected").val() == response.data['database_names']['info'][i]){
           console.log(response.data['database_names']['resource_seq'][i]);

           //document.getElementById($("#resource_id")).value = response.data['database_names']['resource_seq'][i];
        }
    }
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function processData(response_in) {
    console.log('>processData');
    response = JSON.parse(response_in);
    console.log(response);

    uniq = response.data['database_names']['position'].reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
    },[]);
    //console.log(uniq, response.data['database_names']['position']) // [ 'Mike', 'Matt', 'Nancy', 'Adam', 'Jenny', 'Carl' ]

    resource_id = $("#resource_id").val();
    console.log(resource_id);

    $.each(uniq, function(key, value)
    {
        $("#databases")
        .append($('<option>', {
            value: value.toString(),
            text: value.toString()}));
    });

    for(var i = 0; i < response.data['database_names']['position'].length; i++) {
        if($("#databases option:selected").val() == response.data['database_names']['position'][i]){
            $("#databases1")
            .append($('<option>', {text: response.data['database_names']['info'][i]}));
        }
    }

    for(var i = 0; i < response.data['database_names']['position'].length; i++) {
        if($("#databases option:selected").val() == response.data['database_names']['position'][i] &&
           $("#databases1 option:selected").val() == response.data['database_names']['info'][i]){
           console.log(response.data['database_names']['resource_seq'][i]);
           $("#resource_id").val = response.data['database_names']['resource_seq'][i];
        }
    }
    /*
    $.each(response.data['database_names']['info'], function(key, value)
    {
        console.log($("#databases option:selected").val());
        //if()

        $("#databases1")
        .append($('<option>', {
            value: value.toString(),
            text: value.toString()}));
    });
    */
    /*
    console.log(response.data['database_names']['info']);
    $.each(response.data['database_names']['info'], function(key, value)
    {
        $("#databases1")
        .append($('<option>', {
            value: value.toString(),
            text: value.toString()}));
    });
    console.log(response.data['database_names']['resource_seq']);
    $.each(response.data['database_names']['resource_seq'], function(key, value)
    {
        $("#databases2")
        .append($('<option>', {
            value: value.toString(),
            text: value.toString()}));
    });
    */
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
$(function () {
    // get today
    today_time();

    // database init resource load
    doAjax("Connect_Databases_res", processData);

    var duration = 300;
    //
    // buttons1 ----------------------------------------
    // buttons1  1행
    $('#buttons1 button:nth-child(-n+3)')
        .on('click', function () {
            doAjax("Connect_Databases_res");

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
