<?php
/*  Prototype Dreamtech Kiosk, version 1.0.0.0
 *  (c) 2018-2019 Seyoung Park.
 *
 *
 *
 */
//$object = new mssql_db;
//$object->Connect_Databases();
echo $_POST["method"]();

//$row_count = sqlsrv_num_rows( $stmt );
//echo "Row count result = $row_count\n";

//$field_count = sqlsrv_num_fields( $stmt );
//echo "Field count result = $row_count\n";

//class mssql_db{
//    public $conn;
//    public $msg;
//    public $name;

    /*************************************************************************
    NAME
    DESCRIPTION
    RETURNS
    */
    function Connect_Databases()
    {
        if(isset($_POST['server'])) {
            $server = json_decode($_POST['server']);
        }
        if(isset($_POST['username'])) {
            $username = json_decode($_POST['username']);
        }
        if(isset($_POST['password'])) {
            $password = json_decode($_POST['password']);
        }
        if(isset($_POST['portnumber'])) {
            $portnumber = json_decode($_POST['portnumber']);
        }
        if(isset($_POST['dbname'])) {
            $dbname = json_decode($_POST['dbname']);
        }

        $connectionTimeoutSeconds = 15;  // Default of 15 seconds
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

        $conn = sqlsrv_connect( $serverName, $connectionOptions);
        return $conn;
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
    function Get_DB_cal_res(){
        $return = new stdClass;

        // Connection DB
        if(($conn = Connect_Databases()) == true ) {
            $return->success = true;
        }else{
            $return->success = false;
        }

        if($conn == true) {
            // primary key : schedule_seq
            $sql = "SELECT * FROM dbo.cal_res";
            $params = array();
            $options = array(
                //"Scrollable" => 'static'
            );
            $stmt = sqlsrv_query($conn, $sql, $params, $options);
            if( $stmt === false ) {
                $return->success = false;
            }
            else{
                $databaseNames = [
                    'resource_seq' => [],
                    'info' => [],
                    'position' => []
                ];

                while( $row = sqlsrv_fetch_array( $stmt) ) {
                    array_push($databaseNames['resource_seq'], $row['resource_seq']);
                    array_push($databaseNames['info'], $row['info']);
                    array_push($databaseNames['position'], $row['position']);
                }
                $return->success = true;
            }
        }
        $return->errorMessage = sqlsrv_errors();
        $return->data['database'] = $databaseNames;
        $json = json_encode($return);
        Disconnect_Databases();
        echo $json;
    }

    /*************************************************************************
    NAME
    DESCRIPTION
    RETURNS
    */
    function Get_DB_cal_res_sch(){
        $return = new stdClass;

        // Connection DB
        if(($conn = Connect_Databases()) == true ) {
            $return->success = true;
        }else{
            $return->success = false;
        }

        if(isset($_POST['sdate'])) {
            $sdate = json_decode($_POST['sdate']);
        }
        if(isset($_POST['edate'])) {
            $edate = json_decode($_POST['edate']);
        }
        /*
        if(isset($_POST['res_seq'])) {
            $res_seq = json_decode($_POST['res_seq']);
        }
        if(isset($_POST['schedule_seq'])) {
            $schedule_seq = json_decode($_POST['schedule_seq']);
        }
        */
        if($conn == true) {
            //$sql = "SELECT * FROM dbo.cal_res_sch WHERE resource_seq = $res_seq and schedule_seq = $schedule_seq";
            $sql = "SELECT * FROM dbo.cal_res_sch WHERE sdate BETWEEN '$sdate' and '$edate' ORDER BY sdate asc";
            $params = array();
            $options = array(
                /*"Scrollable" => 'static'*/
            );

            $stmt = sqlsrv_query($conn, $sql, $params, $options);
            if( $stmt === false ) {
                $return->success = false;
            }
            else{
                $databaseNames = [
                    'schedule_seq' => [],
                    'resource_seq' => [],
                    'actor' => [],
                    'sdate' => [],
                    'edate' => [],
                    'body' => []
                ];

                while( $row = sqlsrv_fetch_array( $stmt) ) {
                    array_push($databaseNames['schedule_seq'], $row['schedule_seq']);
                    array_push($databaseNames['resource_seq'], $row['resource_seq']);
                    array_push($databaseNames['actor'], $row['actor']);
                    array_push($databaseNames['sdate'], $row['sdate']);
                    array_push($databaseNames['edate'], $row['edate']);
                    array_push($databaseNames['body'], $row['body']);
                    //$sdate_string = date_format( $row['sdate'], 'jS, F Y' );
                    //$edate_string = date_format( $row['edate'], 'jS, F Y' );
                    //$repeat_end_date_string = date_format( $row['repeat_end_date'], 'jS, F Y' );
                }
                $return->success = true;
            }
        }
        $return->errorMessage = sqlsrv_errors();
        $return->data['database'] = $databaseNames;
        $json = json_encode($return);
        Disconnect_Databases();
        echo $json;
    }

    /*************************************************************************
    NAME
    DESCRIPTION
    RETURNS
    */
    function Get_DB_cal_res_view(){
        $return = new stdClass;

        // Connection DB
        if(($conn = Connect_Databases()) == true ) {
            $return->success = true;
        }else{
            $return->success = false;
        }

        if(isset($_POST['sdate'])) {
            $sdate = json_decode($_POST['sdate']);
        }
        if(isset($_POST['edate'])) {
            $edate = json_decode($_POST['edate']);
        }

        if($conn == true)
        {
            // primary key : view_start_date BETWEEN '2018-10-31 00:30:00.000' and '2018-10-31 23:30:00' ORDER BY view_start_date asc
            $sql = "SELECT * FROM dbo.cal_res_view WHERE view_start_date BETWEEN '$sdate' and '$edate' ORDER BY view_start_date asc";
            $params = array();
            $options = array(
                //"Scrollable" => 'static'
            );
            $stmt = sqlsrv_query($conn, $sql, $params, $options);
            if( $stmt === false ) {
                $return->success = false;
            }
            else{
                $databaseNames = [
                    'resource_view_seq' => [],
                    'schedule_seq' => [],
                    'view_start_date' => [],
                    'view_end_date' => []
                ];

                while( $row = sqlsrv_fetch_array( $stmt) ) {
                    array_push($databaseNames['resource_view_seq'], $row['resource_view_seq']);
                    array_push($databaseNames['schedule_seq'], $row['schedule_seq']);
                    array_push($databaseNames['view_start_date'], $row['view_start_date']);
                    array_push($databaseNames['view_end_date'], $row['view_end_date']);
                }
                $return->success = true;
            }
        }
        $return->errorMessage = sqlsrv_errors();
        $return->data['database'] = $databaseNames;
        $json = json_encode($return);
        Disconnect_Databases();
        echo $json;
    }
//}
?>