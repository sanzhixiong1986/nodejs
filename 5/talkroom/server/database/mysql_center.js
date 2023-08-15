/**
 * @Author: Nick
 * @Date: 2023/8/15 16:45:59
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/15 16:45:59
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 * 链接中心数据库
 */
var mysql = require("mysql");

var conn_pool = null;

/**
 * 链接数据库
 * @param {*} host 
 * @param {*} port 
 * @param {*} db_name 
 * @param {*} uname 
 * @param {*} upwd 
 */
function connect_to_center(host, port, db_name, uname, upwd) {
    conn_pool = mysql.createPool({
        host: host,
        port: port,
        database: db_name,
        user: uname,
        password: upwd
    })
}

/**
 * 数据库执行语句
 * @param {*} sql 
 * @param {*} callback 
 */
function mysql_exec(sql, callback) {
    conn_pool.getConnection(function (err, conn) {
        if (err) { // 如果有错误信息
            if (callback) {
                callback(err, null, null);
            }
            return;
        }

        conn.query(sql, function (sql_err, sql_result, fields_desic) {
            conn.release(); // 忘记加了

            if (sql_err) {
                if (callback) {
                    callback(sql_err, null, null);
                }
                return;
            }

            if (callback) {
                callback(null, sql_result, fields_desic);
            }
        });
        // end 
    });
}


module.exports = {
    connect: connect_to_center,
}
