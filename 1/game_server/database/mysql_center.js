/**
 * @Author: Nick
 * @Date: 2023/8/10 16:16:14
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 16:16:14
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 * 中心数据的设计
 */
var mysql = require("mysql");
const log = require("../utils/log");
var conn_pool = null;
/**
 * 链接数据库
 * @param {*} host      ip
 * @param {*} port      端口
 * @param {*} db_name   数据库名字
 * @param {*} uname     用户名
 * @param {*} upwd      用户密码
 */
function connect_to_center(host, port, db_name, uname, upwd) {
    var conn_pool = mysql.createPool({
        host: host,
        port: port,
        database: db_name,
        user: uname,
        password: upwd
    });
    log.info("mysql_center is startend");
}

module.exports = {
    connect: connect_to_center
}