var mysql = require("mysql");

var conn_pool = null;
/**
 * 链接游戏服务器
 * @param {*} host 
 * @param {*} port 
 * @param {*} db_name 
 * @param {*} uname 
 * @param {*} upwd 
 */
function connect_to_gserver(host, port, db_name, uname, upwd) {
    conn_pool = mysql.createPool({
        host: host, // 数据库服务器的IP地址
        port: port, // my.cnf指定了端口，默认的mysql的端口是3306,
        database: db_name, // 要连接的数据库
        user: uname,
        password: upwd,
    });
}

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
    });
}