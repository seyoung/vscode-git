#  Prototype Dreamtech Kiosk, version 1.0.0.0
#  (c) 2018-2019 Seyoung Park.
#
#
#
#
import os
import json
import pyodbc

conn = pyodbc.connect('DRIVER=FreeTDS;SERVER=192.168.1.200;PORT=1433;DATABASE=WO2011;UID=dreamtech01;PWD=dreamtech01;TDS_Version=4.2;')
cursor = conn.cursor()
sql_text = 'select * from dbo.cal_res'
cursor.execute(sql_text)

result=cursor.fetchall()

for row in result:
    p=row[1]
    print p

conn.close()
