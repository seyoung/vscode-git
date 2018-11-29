#!/usr/bin/python
#  Prototype Dreamtech Kiosk, version 1.0.0.0
#  (c) 2018-2019 Seyoung Park.
#
#
#
#
import sys
import os
import json
import pyodbc
import cgi
import app
import collections
import flask
import flask_cors

from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from datetime import datetime
from json import dumps

app = Flask(__name__)
CORS(app)

conn = None
rMsg = ''
server = '192.168.1.200'
database = 'WO2011'
username = 'dreamtech01'
password = 'dreamtech01'
port = '1433'

"""
    NAME
    DESCRIPTION
    RETURNS
"""
def Disconnect_Databases(con):
    #print('Disconnect_Databases')
    con.close()
    return

"""
    NAME
    DESCRIPTION
    RETURNS
"""
@app.route('/Get_DB_cal_res', methods = ['POST', 'GET'])
def Get_DB_cal_res():
    #print('Get_DB_cal_res')

    ##### create dictionary #####
    objects_list = {'data':{}, 'errorMessage':None, 'success':True}
    objects_list['data'].setdefault('database', {})

    ##### connect mssql #####
    try:
        if request.form['run'] == 'true':
            # for windows ODBC Driver 17 for SQL Server
            info = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER='+request.form['server'].replace("\"", "")+';PORT='+request.form['portnum'].replace("\"", "")+';DATABASE='+request.form['dbname'].replace("\"", "")+';UID='+request.form['username'].replace("\"", "")+';PWD='+ request.form['password'].replace("\"", "")

        else:
            # for raspberrypi FreeTDS Server
            info = 'DRIVER={FreeTDS};SERVER='+request.form['server'].replace("\"", "")+';PORT='+request.form['portnum'].replace("\"", "")+';DATABASE='+request.form['dbname'].replace("\"", "")+';UID='+request.form['username'].replace("\"", "")+';PWD='+ request.form['password'].replace("\"", "")

        conn = pyodbc.connect(info)

    except pyodbc.Error as ex:
        objects_list['errorMessage'] = ex.args[1]
        objects_list['success'] = False

    ##### check the result #####
    if (objects_list['success'] == True):
        cursor = conn.cursor()
        sql_text = 'select * from dbo.cal_res'
        cursor.execute(sql_text)
        result = cursor.fetchall()

        objects_list['data']['database'].setdefault('resource_seq', [])
        objects_list['data']['database'].setdefault('info', [])
        objects_list['data']['database'].setdefault('position', [])

        for row in result:
            objects_list['data']['database']['resource_seq'].append(row.resource_seq)
            objects_list['data']['database']['info'].append(row.info)
            objects_list['data']['database']['position'].append(row.position)

        objects_list['success'] = True
        j = json.dumps(objects_list)
        Disconnect_Databases(conn)
        return j
    else:
        objects_list['success'] = False
        j = json.dumps(objects_list)
        return j

"""
    NAME
    DESCRIPTION
    RETURNS
"""
@app.route('/Get_DB_cal_res_sch', methods = ['POST', 'GET'])
def Get_DB_cal_res_sch():
    #print('Get_DB_cal_res_sch')

    ##### create dictionary #####
    objects_list = {'data':{}, 'errorMessage':None, 'success':True}
    objects_list['data'].setdefault('database', {})

    ##### connect mssql #####
    try:
        if request.form['run'] == 'true':
            # for windows ODBC Driver 17 for SQL Server
            info = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER='+request.form['server'].replace("\"", "")+';PORT='+request.form['portnum'].replace("\"", "")+';DATABASE='+request.form['dbname'].replace("\"", "")+';UID='+request.form['username'].replace("\"", "")+';PWD='+ request.form['password'].replace("\"", "")

        else:
            # for raspberrypi FreeTDS Server
            info = 'DRIVER={FreeTDS};SERVER='+request.form['server'].replace("\"", "")+';PORT='+request.form['portnum'].replace("\"", "")+';DATABASE='+request.form['dbname'].replace("\"", "")+';UID='+request.form['username'].replace("\"", "")+';PWD='+ request.form['password'].replace("\"", "")

        conn = pyodbc.connect(info)

    except pyodbc.Error as ex:
        objects_list['errorMessage'] = ex.args[1]
        objects_list['success'] = False

    ##### check the result #####
    if (objects_list['success'] == True):
        cursor = conn.cursor()

        #print(request.form['sdate'])
        #print(request.form['edate'])

        '''
        d['sdate'] = request.form['sdate']
        d['edate'] = request.form['edate']
        '''
        # $sql = "SELECT * FROM dbo.cal_res_sch WHERE sdate BETWEEN '$sdate' and '$edate' ORDER BY sdate asc";
        # sql_text = 'select * from dbo.cal_res'
        sql_text = 'select * from dbo.cal_res_sch where sdate between '+'\''+request.form['sdate'].replace("\"", "")+'\''+' and '+'\''+request.form['edate'].replace("\"", "")+'\''+' order by sdate asc'

        #print(sql_text)

        cursor.execute(sql_text)
        result = cursor.fetchall()

        objects_list['data']['database'].setdefault('schedule_seq', [])
        objects_list['data']['database'].setdefault('resource_seq', [])
        objects_list['data']['database'].setdefault('actor', [])
        objects_list['data']['database'].setdefault('sdate', [])
        objects_list['data']['database'].setdefault('edate', [])
        objects_list['data']['database'].setdefault('body', [])

        for row in result:
            objects_list['data']['database']['schedule_seq'].append(row.schedule_seq)
            objects_list['data']['database']['resource_seq'].append(row.resource_seq)
            objects_list['data']['database']['actor'].append(row.actor)
            objects_list['data']['database']['sdate'].append(row.sdate.strftime("%Y-%m-%d %H:%M:%S"))
            objects_list['data']['database']['edate'].append(row.edate.strftime("%Y-%m-%d %H:%M:%S"))
            objects_list['data']['database']['body'].append(row.body)

        objects_list['success'] = True
        j = json.dumps(objects_list)
        Disconnect_Databases(conn)
        return j
    else:
        objects_list['success'] = False
        j = json.dumps(objects_list)
        return j

"""
    NAME
    DESCRIPTION
    RETURNS
"""
@app.route('/Get_DB_cal_res_view', methods = ['POST', 'GET'])
def Get_DB_cal_res_view():
    #print('Get_DB_cal_res_view')

    ##### create dictionary #####
    objects_list = {'data':{}, 'errorMessage':None, 'success':True}
    objects_list['data'].setdefault('database', {})

    ##### connect mssql #####
    try:
        if request.form['run'] == 'true':
            # for windows ODBC Driver 17 for SQL Server
            info = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER='+request.form['server'].replace("\"", "")+';PORT='+request.form['portnum'].replace("\"", "")+';DATABASE='+request.form['dbname'].replace("\"", "")+';UID='+request.form['username'].replace("\"", "")+';PWD='+ request.form['password'].replace("\"", "")
        else:
            # for raspberrypi FreeTDS Server
            info = 'DRIVER={FreeTDS};SERVER='+request.form['server'].replace("\"", "")+';PORT='+request.form['portnum'].replace("\"", "")+';DATABASE='+request.form['dbname'].replace("\"", "")+';UID='+request.form['username'].replace("\"", "")+';PWD='+ request.form['password'].replace("\"", "")

        conn = pyodbc.connect(info)

    except pyodbc.Error as ex:
        objects_list['errorMessage'] = ex.args[1]
        objects_list['success'] = False

    ##### check the result #####
    if (objects_list['success'] == True):
        cursor = conn.cursor()

        #print(request.form['sdate'])
        #print(request.form['edate'])

        '''
        d['sdate'] = request.form['sdate']
        d['edate'] = request.form['edate']
        '''

        # $sql = "SELECT * FROM dbo.cal_res_view WHERE view_start_date BETWEEN '$sdate' and '$edate' ORDER BY view_start_date asc";
        # sql_text = 'select * from dbo.cal_res'

        sql_text = 'select * from dbo.cal_res_view where view_start_date between '+'\''+request.form['sdate'].replace("\"", "")+'\''+' and '+'\''+request.form['edate'].replace("\"", "")+'\''+' order by view_start_date asc'

        #print(sql_text)

        cursor.execute(sql_text)
        result = cursor.fetchall()

        objects_list['data']['database'].setdefault('resource_view_seq', [])
        objects_list['data']['database'].setdefault('schedule_seq', [])
        objects_list['data']['database'].setdefault('view_start_date', [])
        objects_list['data']['database'].setdefault('view_end_date', [])

        for row in result:
            objects_list['data']['database']['resource_view_seq'].append(row.resource_view_seq)
            objects_list['data']['database']['schedule_seq'].append(row.schedule_seq)
            objects_list['data']['database']['view_start_date'].append(row.view_start_date.strftime("%Y-%m-%d %H:%M:%S"))
            objects_list['data']['database']['view_end_date'].append(row.view_end_date.strftime("%Y-%m-%d %H:%M:%S"))

        objects_list['success'] = True
        j = json.dumps(objects_list)
        Disconnect_Databases(conn)
        return j
    else:
        objects_list['success'] = False
        j = json.dumps(objects_list)
        return j

"""
    NAME
    DESCRIPTION
    RETURNS
"""
if __name__ == '__main__':
    app.run(debug=True)


'''

conn = Connect_Databases(request.form['server'], request.form['portnum'], request.form['dbname'], request.form['username'], request.form['password'])

#'DRIVER=FreeTDS;SERVER=192.168.1.200;PORT=1433;DATABASE=WO2011;UID=dreamtech01;PWD=dreamtech01;TDS_Version=4.2;'
#'DRIVER={ODBC Driver 17 for SQL Server};SERVER=192.168.1.200;PORT=1433;DATABASE=WO2011;UID=dreamtech01;PWD=dreamtech01;TDS_Version=4.2;'

# for raspberrypi FreeTDS Server
#conn = pyodbc.connect('DRIVER={FreeTDS};SERVER='+server+';PORT='+port+';DATABASE='+database+';UID='+username+';PWD='+ password)

objects_list = []
d = collections.OrderedDict()
d['method'] = request.form['method']
d['server'] = request.form['server']
d['username'] = request.form['username']
d['password'] = request.form['password']
d['portnum'] = request.form['portnum']
d['dbname'] = request.form['dbname']
d['sdate'] = request.form['sdate']
d['edate'] = request.form['edate']
d['res_seq'] = request.form['res_seq']
d['schedule_seq'] = request.form['schedule_seq']
objects_list.append(d)
j = json.dumps(objects_list)
return j '''


'''
@app.route('/Get_DB_cal_res', methods = ['POST', 'GET'])
@app.route('/Get_DB_cal_res_sch', methods = ['POST', 'GET'])
@app.route('/Get_DB_cal_res_view', methods = ['POST', 'GET'])
'''