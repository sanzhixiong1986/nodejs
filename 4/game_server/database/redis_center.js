var redis = require("redis");
var util = require('util')
var Respones = require("../apps/Respones.js");
var log = require("../utils/log.js");

var center_redis = null;

function connect_to_center(host, port) {
    center_redis = redis.createClient({
        host: host,
        port: port,
    });

    center_redis.on('error', (err) => {
        log.error(err);
    });

    center_redis.on('connect', () => {
        log.info("Connected to start server");
    })
}

/* key, --> value
bycw_center_user_uid_8791
uinfo : {
	unick: string,
	uface: 图像ID，
	usex: 性别,
	uvip: VIP等级
	is_guest: 是否为游客
}
*/
function set_uinfo_inredis(uid, uinfo) {
    if (center_redis === null) {
        return;
    }

    var key = "bycw_center_user_uid_" + uid;
    uinfo.userName = uinfo.userName;

    log.info("redis center hmset " + key);
    center_redis.hmset(key, uinfo, function (err) {
        if (err) {
            log.error(err);
        }
    });
}

// callback(status, body)
function get_uinfo_inredis(uid, callback) {
    if (center_redis === null) {
        callback(Respones.SYSTEM_ERR, null);
        return;
    }

    var key = "bycw_center_user_uid_" + uid;
    log.info("hgetall ", key);

    center_redis.hgetall(key, function (err, data) {
        if (err) {
            callback(Respones.SYSTEM_ERR, null);
            return;
        }

        var uinfo = data;
        uinfo.uface = parseInt(uinfo.uface);
        uinfo.usex = parseInt(uinfo.usex);
        uinfo.uvip = parseInt(uinfo.uvip);
        uinfo.is_guest = parseInt(uinfo.is_guest);

        callback(Respones.OK, uinfo);
    });
}

module.exports = {
    connect: connect_to_center,
    set_uinfo_inredis: set_uinfo_inredis,
    get_uinfo_inredis: get_uinfo_inredis,
};