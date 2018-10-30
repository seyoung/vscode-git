<?php
/*  Prototype Dreamtech Kiosk, version 1.0.0.0
 *  (c) 2018-2019 Seyoung Park.
 *
 *
 *
 */

echo $_POST["method"]();

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function Connect_Databases_res_sch(){
    $conn = null;

    if(isset($_POST['server'])) {
        $server = json_decode($_POST['server']);
    }
    if(isset($_POST['username'])) {
        $username = json_decode($_POST['username']);
    }
    if(isset($_POST['password'])) {
        $password = json_decode($_POST['password']);
    }
    /*
    if(isset($_POST['portnumber'])) {
        $portnumber = json_decode($_POST['portnumber']);
    }
    */
    if(isset($_POST['dbname'])) {
        $dbname = json_decode($_POST['dbname']);
    }
    /*
    if(isset($_POST['adate'])) {
        $portnumber = json_decode($_POST['adate']);
    }
    if(isset($_POST['edate'])) {
        $portnumber = json_decode($_POST['edate']);
    }
    if(isset($_POST['res_seq'])) {
        $portnumber = json_decode($_POST['res_seq']);
    }
    */

    $connectionTimeoutSeconds = 15;  // Default of 15 seconds is too short over the Internet, sometimes.
    $serverName = $server;
    $connectionOptions = array(
        "Database"=>$dbname,
        "UID"=>$username,
        "PWD"=>$password,
        "CharacterSet" => "UTF-8",
        "LoginTimeout" => $connectionTimeoutSeconds);


    //debug_to_console($connectionOptions);

    //sqlsrv_configure('WarningsReturnAsErrors', true);
    //sqlsrv_configure('LogSubsystems', SQLSRV_LOG_SYSTEM_ALL);
    //sqlsrv_configure('LogSeverity', SQLSRV_LOG_SEVERITY_ALL);

    //echo "connet to: $serverName\n";
    $conn = sqlsrv_connect( $serverName, $connectionOptions);

    if( $conn == true ) {
       // echo "Connection established.\n";
    }else{
        //echo "Connection could not be established.\n";
        die( print_r( sqlsrv_errors(), true));
    }

    $sql = "SELECT * FROM dbo.cal_res_sch";
    $params = array();
    $options = array(
        /*"Scrollable" => 'static'*/
    );

    $stmt = sqlsrv_query($conn, $sql, $params, $options);
    if( $stmt === false ) {
        if( ($errors = sqlsrv_errors() ) != null) {
            foreach( $errors as $error ) {
                echo "SQLSTATE: ".$error[ 'SQLSTATE']."\n";
                echo "code: ".$error[ 'code']."\n";
                echo "message: ".$error[ 'message']."\n";
            }
        }
    }
    $row_count = sqlsrv_num_rows( $stmt );
    //echo "Row count result = $row_count\n";

    $field_count = sqlsrv_num_fields( $stmt );
    //echo "Field count result = $row_count\n";

    $databaseNames = array();

    while( $row = sqlsrv_fetch_array( $stmt) ) {
        array_push($databaseNames, $row['actor']);
        /*
        $sdate_string = date_format( $row['sdate'], 'jS, F Y' );
        $edate_string = date_format( $row['edate'], 'jS, F Y' );
        $repeat_end_date_string = date_format( $row['repeat_end_date'], 'jS, F Y' );

        echo
        $row['schedule_seq'].", ".
        $row['resource_seq'].", ".
        $row['calendar_seq'].", ".
        $row['user_seq'].", ".
        $row['actor'].", ".
        $sdate_string.",".
        $edate_string.",".
        $row['title'].", ".
        $row['body'].", ".
        $row['repeat_type'].", ".
        $row['repeat_day'].", ".
        $row['repeat_week'].", ".
        $row['repeat_month'].", ".
        $row['repeat_wd'].", ".
        $repeat_end_date_string.",".
        "\n";
        */
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close( $conn);

    $return = new stdClass;
    $return->success = true;
    $return->errorMessage = "";
    $return->data['database_names'] = $databaseNames;
    $json = json_encode($return);
    echo $json;
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function Disconnect_Databases()
{
    sqlsrv_free_stmt($stmt);
    sqlsrv_close( $conn);
}

/*************************************************************************
NAME
DESCRIPTION
RETURNS
*/
function Connect_Databases_res(){
    $conn = null;
    $return = new stdClass;

    if(isset($_POST['server'])) {
        $server = json_decode($_POST['server']);
    }
    if(isset($_POST['username'])) {
        $username = json_decode($_POST['username']);
    }
    if(isset($_POST['password'])) {
        $password = json_decode($_POST['password']);
    }
    /*
    if(isset($_POST['portnumber'])) {
        $portnumber = json_decode($_POST['portnumber']);
    }
    */
    if(isset($_POST['dbname'])) {
        $dbname = json_decode($_POST['dbname']);
    }
    /*
    if(isset($_POST['adate'])) {
        $portnumber = json_decode($_POST['adate']);
    }
    if(isset($_POST['edate'])) {
        $portnumber = json_decode($_POST['edate']);
    }
    if(isset($_POST['res_seq'])) {
        $portnumber = json_decode($_POST['res_seq']);
    }
    */

    $connectionTimeoutSeconds = 15;  // Default of 15 seconds is too short over the Internet, sometimes.
    $serverName = $server;
    $connectionOptions = array(
        "Database"=>$dbname,
        "UID"=>$username,
        "PWD"=>$password,
        "CharacterSet" => "UTF-8",
        "LoginTimeout" => $connectionTimeoutSeconds);


    //debug_to_console($connectionOptions);

    //sqlsrv_configure('WarningsReturnAsErrors', true);
    //sqlsrv_configure('LogSubsystems', SQLSRV_LOG_SYSTEM_ALL);
    //sqlsrv_configure('LogSeverity', SQLSRV_LOG_SEVERITY_ALL);

    //echo "connet to: $serverName\n";
    $conn = sqlsrv_connect( $serverName, $connectionOptions);

    if( $conn == true ) {
       // echo "Connection established.\n";
    }else{
        //echo "Connection could not be established.\n";
        die( print_r( sqlsrv_errors(), true));
    }

    $sql = "SELECT * FROM dbo.cal_res";
    $params = array();
    $options = array(
        /*"Scrollable" => 'static'*/
    );

    $stmt = sqlsrv_query($conn, $sql, $params, $options);
    if( $stmt === false ) {
        if( ($errors = sqlsrv_errors() ) != null) {
            foreach( $errors as $error ) {
                //echo "SQLSTATE: ".$error[ 'SQLSTATE']."\n";
                //echo "code: ".$error[ 'code']."\n";
                //echo "message: ".$error[ 'message']."\n";
            }
        }
    }
    //$row_count = sqlsrv_num_rows( $stmt );
    //echo "Row count result = $row_count\n";

    //$field_count = sqlsrv_num_fields( $stmt );
    //echo "Field count result = $row_count\n";

    $databaseNames = [
        'resource_seq' => [],
        'info' => [],
        'position' => []
    ];

    while( $row = sqlsrv_fetch_array( $stmt) ) {
        array_push($databaseNames['resource_seq'], $row[0]);
        array_push($databaseNames['info'], $row[1]);
        array_push($databaseNames['position'], $row[2]);
    }
    sqlsrv_free_stmt($stmt);
    sqlsrv_close( $conn);

    $return->success = true;
    $return->errorMessage = "";
    $return->data['database_names'] = $databaseNames;
    $json = json_encode($return);
    echo $json;
}
?>