<?php
$hostname = "192.168.1.200";
$username = "dreamtech01";
$password = "dreamtech01";
$databasename = "WO2011";


// Microsoft SQL Server using the SQL Native Client 10.0 ODBC Driver - allows connection to SQL 7, 2000, 2005 and 2008
$connect = odbc_connect($hostname, $username, $password);
$query = "select * from dbo.cal_res";
odbc_exec($connect,$query);


?>