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
app = Flask(__name__)
CORS(app)

conn = 0
server = '192.168.1.200'
database = 'WO2011'
username = 'dreamtech01'
password = 'dreamtech01'

"""
    NAME
    DESCRIPTION
    RETURNS
"""
'''
@app.route('/hello1')
def signUp():
    return "Hello World! - 1"

@app.route("/hello2")
def hello():
    return "Hello World! - 2"

@app.route('/test', methods=['GET', 'POST'])
def signUpUser():
    user =  request.args.get['username'];
    password = request.args.get['password'];
    return json.dumps({'status':'OK','user':user,'pass':password});

if __name__ == "__main__":
    app.run() '''

"""
    NAME
    DESCRIPTION
    RETURNS
"""
def Connect_Databases():
    print('Connect_Databases')
    try:
        connect = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    except pyodbc.Error as ex:
        sqlstate = ex.args[0]
        print("LDAP Connection failed: check password")
    return connect

"""
    NAME
    DESCRIPTION
    RETURNS
"""
def Disconnect_Databases(con):
    print('Disconnect_Databases')
    con.close()
    return

"""
    NAME
    DESCRIPTION
    RETURNS
"""
def Get_DB_cal_res():

    print('Get_DB_cal_res')
    ret = False
    cursor = False
    conn = Connect_Databases()
    if conn == True:
        ret = True
        print ('1')
    else:
        ret = False
        print ('2')

    cursor = conn.cursor()
    sql_text = 'select * from dbo.cal_res'
    cursor.execute(sql_text)
    result=cursor.fetchall()

    for row in result:
        p=row[1]
        print (p)

    Disconnect_Databases()
    return


"""
    NAME
    DESCRIPTION
    RETURNS
"""
@app.route('/get_db_cal_res')
def Get_DB_cal_res_OneShot():
    print('Get_DB_cal_res_OneShot')

    conn = Connect_Databases()

    if conn == True:
        ret = True
        print ('1>')
    else:
        ret = False
        print ('2>')

    # Convert query to objects of key-value pairs
    objects_list = []

    cursor = conn.cursor()
    sql_text = 'select * from dbo.cal_res'
    cursor.execute(sql_text)
    result = cursor.fetchall()

    for row in result:
        d = collections.OrderedDict()
        d['resource_seq'] = row.resource_seq
        d['info'] = row.info
        d['position'] = row.position
        objects_list.append(d)
        print(d)

    j = json.dumps(objects_list)
    return j

if __name__ == '__main__':
    app.run(debug=True)