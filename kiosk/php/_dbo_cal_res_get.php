<?php
$number1 = $_POST['number1'];
$number2 = $_POST['number2'];
$result = $number1 + $number2;
echo "더한값은 $result 입니다";

function hello(){
    echo "hello";
}
function get_sql()
{
    $o = array();
    $connectionTimeoutSeconds = 30;  // Default of 15 seconds is too short over the Internet, sometimes.

    $serverName = "192.168.1.200, 1433";
    $connectionOptions = array(
        "Database"=>"WO2011",
        "UID"=>"dreamtech01",
        "PWD"=>"dreamtech01",
        "CharacterSet" => "UTF-8",
        "LoginTimeout" => $connectionTimeoutSeconds);
    $conn = null;

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
    $options =  array(
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


    while( $row = sqlsrv_fetch_array( $stmt) ) {

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
    }

    sqlsrv_free_stmt($stmt);
    sqlsrv_close( $conn);
}
?>