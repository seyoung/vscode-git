<?php
$all = MSSQL_Query("select * from dbo.cal_res");

$tables = array();
$columns = array();

while($fet_tbl = MSSQL_Fetch_Assoc($all)) { // PUSH ALL TABLES AND COLUMNS INTO THE ARRAY
  $tables[] = $fet_tbl[TABLE_NAME];
  $columns[] = $fet_tbl[COLUMN_NAME];

}

$sltml = array_count_values($tables); // HOW MANY COLUMNS ARE IN THE TABLE

foreach($sltml as $table_name => $id) {

 echo "<h2>". $table_name ." (". $id .")</h2><ol>";

    for($i = 0; $i <= $id-1; $i++) {

    echo "<li>". $columns[$i] ."</li>";

    }

  echo"</ol>";
}
?>