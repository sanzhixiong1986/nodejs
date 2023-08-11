/**
 * @Author: Nick
 * @Date: 2023/8/11 10:03:13
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/11 10:03:13
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 * 用户的登陆模型相关
 */
var Respones = require("../Respones.js");
var mysql_center = require("../../database/mysql_center.js");
var log = require("../../utils/log.js");
var utils = require("../../utils/utls.js");

function guest_login_success(data, ret_func) {
	var ret = {};
	// 登陆成功了
	ret.status = Respones.OK;
	ret.id = data.id;
	ret.userName = data.userName;
	ret_func(ret);
}

function write_err(status, ret_func) {
	ret.status = status;
	ret_func(ret);
}

function guest_login(session, ukey, ret_func) {
	log.warn("进入游客登陆" + ukey);
	var unick = "游客" + ukey; //utils.random_int_str(4); // 游客9527
	var usex = utils.random_int(0, 1); // 性别
	var uface = 0; // 系统只有一个默认的uface,要么就是自定义face;

	// 查询数据库有无用户, 数据库
	mysql_center.get_guest_uinfo_by_ukey(ukey, function (status, data) {
		if (status != Respones.OK) {
			// write_err(status, ret_func);
			session.send_cmd(2, 1, Respones.INVALID_PARAMS);
			return;
		}
		session.send_cmd(2, 1, {
			data: data
		});
	});
	// end 
}

module.exports = {
	guest_login: guest_login,
};