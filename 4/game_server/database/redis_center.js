/**
 * @Author: Nick
 * @Date: 2023/8/12 11:41:42
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/12 11:41:42
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 * 中心服务器的redis的服务器
 */
var redis = require('redis');
var util = require('util');
var Respones = require('../apps/Respones.js');
var log = require('../utils/log.js');

var center_redis = null;

/**
 * 链接redis方法
 * @param {*} host 
 * @param {*} port 
 * @param {*} db_index 
 */
function connect_to_center(host, port, db_index) {
    center_redis = redis.createClient({
        host: host,
        port: port,
        db: db_index
    });
    log.info("redis connected starting");
}

/**
 * 把数据存入到redis里面
 * @param {*} uid 
 * @param {*} uinfo 
 */
function set_uinfo_inredis(uid, uinfo) {
    if (!center_redis) {
        return;
    }
    var key = "redis_center_user_uid_" + uid;
    log.info("set_uinfo_inredis:key", key);
    uinfo.userName = uinfo.userName.toString();
    
    center_redis.hmset(key, uinfo, function (err) {
        if (err) {
            log.error(err);
        }
    });
}

function get_uinfo_inredis(uid, callback) {
    if (!center_redis) {
        callback(Respones.SYSTEM_ERR, null);
        return;
    }

    var key = "redis_center_user_uid_" + uid;
    log.info("get_uinfo_inredis:key", key);
    center_redis.hgetall(key, function (err, data) {
        var uinfo = data;
        uinfo.userName = uinfo.userName;
        callback(Respones.OK, uinfo);
    });
}

module.exports = {
    connect: connect_to_center,
    set_uinfo_inredis: set_uinfo_inredis,
    get_uinfo_inredis: get_uinfo_inredis
}