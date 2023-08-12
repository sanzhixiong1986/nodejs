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

/**
 * 修改相关的数据
 * @param {*} session 
 * @param {*} id 
 * @param {*} userName 
 * @param {*} ret_func 
 */
function guest_edit_userInfo_by_id(session, body, ret_func) {
	log.warn("修改用户信息", body.id);
	mysql_center.update_edit_user(body.id, body.userName, function (status, data) {
		if (status != Respones.OK) {
			session.send_cmd(2, 1, Respones.INVALID_PARAMS);
			return;
		}

		session.send_cmd(2, 2, 1);
	});
}

/**
 * 用户账号的登陆
 * @param {*} session 
 * @param {*} json 
 * @param {*} ret_func 
 */
function login_user_center(session, json, ret_func) {
	log.warn("进入用户账号密码登陆模块")
	//拿出对应的数据出来
	let userName = json.userName;
	let password = json.password;

	if (!userName) {
		session.send_cmd(2, 3, -100);
		return;
	}

	if (!password) {
		session.send_cmd(2, 3, -101);
		return;
	}

	mysql_center.login_user(userName, password, function (status, data) {
		if (status.length == 0) {
			session.send_cmd(2, 1, Respones.INVALID_PARAMS);
			return;
		}
		session.send_cmd(2, 3, 1);
	})
}

/**
 * 查找用户是否存在
 * @param {*} session 
 * @param {*} data 
 * @param {*} ret_func 
 */
function find_password_model(session, data, ret_func) {
	let user = data.userName;
	let pasd = data.password;
	mysql_center.select_user_func(user, function (status, data) {
		if (status.length == 0) {
			ret_func(-1)
			return;
		}
		ret_func(1);
	});
}

/**
 * 查找密码是否存在
 * @param {*} session 
 * @param {*} pasd 
 * @param {*} ret_func 
 */
function find_password_pasd(session, data, ret_func) {
	let user = data.userName;
	let pasd = data.password;
	mysql_center.select_user_or_pasd(user, pasd, function (status, data) {
		ret_func(status);
	});
}

module.exports = {
	guest_login: guest_login,
	guest_edit_userInfo_by_id: guest_edit_userInfo_by_id,
	login_user_center: login_user_center,
	find_password_model: find_password_model,
	find_password_pasd: find_password_pasd,
};