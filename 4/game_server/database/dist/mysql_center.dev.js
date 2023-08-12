"use strict";

var mysql = require("mysql");

var util = require('util');

var Respones = require("../apps/Respones.js");

var log = require("../utils/log.js");

var _require = require("express/lib/response.js"),
    format = _require.format;

var conn_pool = null;

function connect_to_center(host, port, db_name, uname, upwd) {
  conn_pool = mysql.createPool({
    host: host,
    // 数据库服务器的IP地址
    port: port,
    // my.cnf指定了端口，默认的mysql的端口是3306,
    database: db_name,
    // 要连接的数据库
    user: uname,
    password: upwd
  });
}

function mysql_exec(sql, callback) {
  conn_pool.getConnection(function (err, conn) {
    if (err) {
      // 如果有错误信息
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
    }); // end 
  });
}

function get_guest_uinfo_by_ukey(ukey, callback) {
  var sql = "select * from t_user where id = \"%s\"";
  var sql_cmd = util.format(sql, ukey);
  log.warn("sql_cmd", sql_cmd);
  mysql_exec(sql_cmd, function (err, sql_ret, fields_desic) {
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
  mysql_exec(sql_cmd, function (err, sql_ret, fields_desic) {
    if (err) {
      callback(Respones.SYSTEM_ERR);
      return;
    }

    callback(Respones.OK);
  });
}
/**
 * 修改相关的操作
 * @param {*} id 
 * @param {*} userName 
 * @param {*} callback 
 */


function update_edit_user(id, userName, callback) {
  log.warn("update_edit_user");
  var sql = "UPDATE t_user SET userName = \"%s\" WHERE id = \"%s\"";
  var sql_cmd = util.format(sql, userName, id);
  mysql_exec(sql_cmd, function (err, sql_ret, fields_desic) {
    if (err) {
      callback(Respones.SYSTEM_ERR);
      return;
    }

    callback(Respones.OK);
  });
}
/**
 * 用户的登陆
 * @param {*} userName 
 * @param {*} password 
 * @param {*} callback 
 */


function login_user(userName, password, callback) {
  log.warn("进入登陆模块");
  var sql = "select * from t_user where userName = \"%s\" AND password = \"%s\"";
  sql_cmd = util.format(sql, userName, password);
  mysql_exec(sql_cmd, function (err, sql_ret, fields_desic) {
    if (err) {
      callback(Respones.SYSTEM_ERR);
      return;
    }

    callback(sql_ret);
  });
}
/**
 * 根据用户的账号查询
 * @param {*} userName 
 * @param {*} callback 
 */


function select_user_func(userName, callback) {
  log.info("mysql:select_user_func");
  var sql = "select * from t_user where = userName = \"%s\"";
  var sql_cmd = util.format(sql, userName);
  mysql_exec(sql_cmd, function (err, sql_ret, fields_desic) {
    if (err) {
      callback(Respones.SYSTEM_ERR);
      return;
    }

    callback(sql_ret);
  });
}

function select_user_or_pasd(userName, password, callback) {
  var sql = "select * from t_user where userName = \"%s\" AND password = \"%s\"";
  sql_cmd = util.format(sql, userName, password);
  mysql_exec(sql_cmd, function (err, sql_ret, fields_desic) {
    if (err) {
      callback(Respones.SYSTEM_ERR);
      return;
    }

    callback(1);
  });
}

module.exports = {
  connect: connect_to_center,
  get_guest_uinfo_by_ukey: get_guest_uinfo_by_ukey,
  insert_guest_user: insert_guest_user,
  update_edit_user: update_edit_user,
  login_user: login_user,
  select_user_func: select_user_func,
  select_user_or_pasd: select_user_or_pasd
};