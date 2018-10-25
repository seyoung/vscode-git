<?php

function get_sql(){

// mysql 접속 계정 정보
$mysql_host = '192.168.1.200';
$mysql_user = 'dreamtech01';
$mysql_password = 'dreamtech01';
$mysql_db = 'dbo.cal_res_sch';

// 접속
$conn = mysql_connect($mysql_host, $mysql_user, $mysql_password);
$dbconn = mysql_select_db($mysql_db, $conn);

// charset 설정, 설정하지 않으면 기본 mysql 설정으로 됨, 대체적으로 euc-kr를 많이 사용
mysql_query("set names utf8"); // charset UTF8

//쿼리, news 라는 테이블이 존재, id, title, content 필드가 존재할 경우
$query = "select * from dbo.cal_res_sch";

//쿼리 성공시 쿼리 리소스 가져옴
$res = mysql_query($query, $conn);

// 리소를 이용하여 $row 변수에 모든 레코드를 배열로 가져와서 while 문을 이용하여 출력
while($row= mysql_fetch_array($result)){
   // 아래 코드 id 와 title 는 위 쿼리의 필드명입니다.
  echo "1:".$row[0].",2:".$row[1];

  // 배열 내의 모든 값을 확인할 경우
  // print_r( $row );

 };
}

// 단일 row 결과값일 경우 while 대신 list 함수 이용
// list( $id, $title, $content ) = mysql_fetch_array($result);

