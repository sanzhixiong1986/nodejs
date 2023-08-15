/**
 * @Author: Nick
 * @Date: 2023/8/15 16:44:57
 * @LastEditors: Nick
 * @LastEditTime: 2023/8/15 16:44:57
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 */

var redis = require("redis");
var util = require('util')
var Respones = require("../apps/Respones.js");
var log = require("../utils/log.js");
var utils = require("../utils/utils.js");

var game_redis = null;

function connect_to_game(host, port, db_index) {
	game_redis = redis.createClient({
		host: host,
		port: port,
		db: db_index,
	});

	game_redis.on("error", function(err) {
		log.error(err);
	});
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
function set_ugame_info_inredis(uid, ugame_info) {
	if (game_redis === null) {
		return;
	}

	var key = "bycw_game_user_uid_" + uid;
	ugame_info.uchip = ugame_info.uchip.toString();
	ugame_info.uexp = ugame_info.uexp.toString();
	ugame_info.uvip = ugame_info.uvip.toString();
	
	log.info("redis game hmset " + key);
	game_redis.hmset(key, ugame_info, function(err) {
		if(err) {
			log.error(err);
		}
	});
}

// callback(status, body)
function get_ugame_info_inredis(uid, callback) {
	if (game_redis === null) {
		callback(Respones.SYSTEM_ERR, null);
		return;
	}

	var key = "bycw_game_user_uid_" + uid;
	log.info("hgetall ", key);

	game_redis.hgetall(key, function(err, data) {
		if (err) {
			callback(Respones.SYSTEM_ERR, null);
			return;
		}

		var ugame_info = data;
		ugame_info.uchip = parseInt(ugame_info.uchip);
		ugame_info.uexp = parseInt(ugame_info.uexp);
		ugame_info.uvip = parseInt(ugame_info.uvip);
		callback(Respones.OK, ugame_info);
	});
}

module.exports = {
	connect: connect_to_game,
	set_ugame_info_inredis: set_ugame_info_inredis,
	get_ugame_info_inredis: get_ugame_info_inredis
};