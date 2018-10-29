/*
   example: https://www.youtube.com/watch?v=G9jz9mdblgs
*/

/*************************************************************************
NAME

DESCRIPTION

RETURNS

*/
function loadDatabaseList() {
    console.log('>loadDatabaseList\n');
    doAjax();
    return;
}

/*************************************************************************
NAME

DESCRIPTION

RETURNS

*/
function theAjax(method, server, username, password, portnum, dbname) {
    console.log('>theAjax\n');
    return $.ajax({
        type: 'POST',
        url: 'http://localhost/vscode-git/kiosk/php/GetDatabases.php',
        data: { method: method,
            server: server,
            username: username,
            password: password,
            portnum: portnum,
            dbname: dbname
        }
    });
}

/*************************************************************************
NAME

DESCRIPTION

RETURNS

*/
function doAjax() {
    console.log('>doAjax\n');
    var server, username, password, portnumber, dbname;
    server = JSON.stringify($('#server').val());
    username = JSON.stringify($('#username').val());
    password = JSON.stringify($('#password').val());
    portnumber = JSON.stringify($('#portnumber').val());
    dbname = JSON.stringify($('#dbname').val());

    console.log(server.concat("/", username, "/", password, "/", portnumber, "/", dbname));

    ajax = theAjax("getDatabases", server, username, password, portnumber, dbname);
    ajax.done(processData);
    ajax.fail(function () { alert("Failure"); });
}

/*************************************************************************
NAME

DESCRIPTION

RETURNS

*/
function processData(response_in) {
    console.log('>processData\n');
    var response = JSON.parse(response_in);

    $.each(response.data['database_names'], function(key, value)
    {
        $("#databases")
        .append($('<option>', {
            value: value.toString(),
            text: value.toString()}));

        $("#databases1")
        .append($('<option>', {
            value: value.toString(),
            text: value.toString()}));
    });

}

/*************************************************************************
NAME

DESCRIPTION

RETURNS

*/
$(function () {
    var duration = 300;
    //
    // buttons1 ----------------------------------------
    // buttons1  1행
    $('#buttons1 button:nth-child(-n+3)')
        .on('click', function () {
            //var myvar = '<?php echo $var;?>';
            //alert(myvar);
            console.log("test");
            loadDatabaseList();

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
