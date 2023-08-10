var mysql = require("mysql");
var util = require('util')
var Respones = require("../apps/Respones.js");

var conn_pool = null;
function connect_to_center(host, port, db_name, uname, upwd) {
	var conn_pool = mysql.createPool({
		host: host, // 数据库服务器的IP地址
		port: port, // my.cnf指定了端口，默认的mysql的端口是3306,
		database: db_name, // 要连接的数据库
		user: uname,
		password: upwd,
	});
}


function mysql_exec(sql, callback) {
	conn_pool.getConnection(function(err, conn) {
		if (err) { // 如果有错误信息
			if(callback) {
				callback(err, null, null);
			}
			return;
		}

		conn.query(sql, function(sql_err, sql_result, fields_desic) {
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


function get_guest_uinfo_by_ukey(ukey, callback) {
	var sql = "select uid, unick, usex, uface, uvip, status from uinfo status where guest_key = \"%s\"";
	var sql_cmd = util.format(sql, ukey);

	mysql_exec(sql_cmd, function(err, sql_ret, fields_desic) {
		if (err) {
			callback(Respones.SYSTEM_ERR, null);
			return;
		}
		callback(Respones.OK, sql_ret);
	});
}

function insert_guest_user(unick, uface, usex, ukey, callback) {
	var sql = "insert into uinfo(`guest_key`, `unick`, `uface`, `usex`)values(\"%s\", \"%s\", %d, %d)";
	var sql_cmd = util.format(sql, ukey, unick, uface, usex);

	mysql_exec(sql_cmd, function(err, sql_ret, fields_desic) {
		if (err) {
			callback(Respones.SYSTEM_ERR);
			return;
		}
		callback(Respones.OK);
	});
}

module.exports = {
	connect: connect_to_center,
	get_guest_uinfo_by_ukey: get_guest_uinfo_by_ukey, 
	insert_guest_user: insert_guest_user,
};