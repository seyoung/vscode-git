<?php
echo $_POST["method"]();
//getDatabases();
/*************************************************************************
NAME

DESCRIPTION

RETURNS

*/
function getDatabases(){
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

    $connectionTimeoutSeconds = 15;  // Default of 15 seconds is too short over the Internet, sometimes.
    $serverName = $server;
    $connectionOptions = array(
        "Database"=>$dbname,
        "UID"=>$username,
        "PWD"=>$password,
        "CharacterSet" => "UTF-8",
        "LoginTimeout" => $connectionTimeoutSeconds);
    $conn = null;

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

    /*
    $arr = array( // 1차원 배열을 3개 갖는 2차원 배열 선언
        array(),
        array(),
        array()
    );


    $arr[0][0] = "apple"; // 배열 요소 입력
    $arr[0][1] = "korea";
    $arr[0][2] = 1000;


    $arr[1][0] = "banana";
    $arr[1][1] = "philippines";
    $arr[1][2] = 2000;


    $arr[2][0] = "orange";
    $arr[2][1] = "us";
    $arr[2][2] = 1500;


    echo $arr[0][0].", ".$arr[0][1].", ".$arr[0][2]."<br>";
    echo $arr[1][0].", ".$arr[1][1].", ".$arr[1][2]."<br>";
    echo $arr[2][0].", ".$arr[2][1].", ".$arr[2][2]";
    */
    /*
    row0: int- schedule_seq
    row1: int- resource_seq
    row2: int- calendar_seq
    row3: int- user_seq
    row4: char- actor
    row5: date- sdate
    row6: date- edate
    row7: char- title
    row8: char- body
    row9: int- repeat_type
    row10: int- repeat_day
    row11: int- repeat_week
    row12: int- repeat_month
    row13: int- repeat_wd
    row14: date- repeat_end_date
    */
    $databaseNames = array();
    $databaseNames[] = array();
    $databaseNames[] = array();

    while( $row = sqlsrv_fetch_array( $stmt) ) {
        array_push($databaseNames[0], $row['actor']);
        array_push($databaseNames[1], $row['actor']);
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
?>