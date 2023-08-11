var Respones = require("../Respones.js");
var mysql_center = require("../../database/mysql_center.js");

function guest_login_success(data, ret_func) {
	var ret = {};
	// 登陆成功了
	ret.status = Respones.OK;
	ret.uid = data.uid;
	ret.unick = data.unick;
	ret.usex = data.usex;
	ret.uface = data.uface;
	ret.uvip = data.uvip;
	ret.ukey = data.guest_key
	ret_func(ret);
}

function write_err(status, ret_func) {
	ret.status = status;
	ret_func(ret);
}

function guest_login(ukey, ret_func) {
	var unick = "游客" + utils.random_int_str(4); // 游客9527
	var usex = utils.random_int(0, 1); // 性别
	var uface = 0; // 系统只有一个默认的uface,要么就是自定义face;

	// 查询数据库有无用户, 数据库
	mysql_center.get_guest_uinfo_by_ukey(ukey, function(status, data) {
		if (status != Respones.OK) {
			write_err(status, ret_func);
			return;
		}
		if (data.length <= 0) { // 没有这样的key, 注册一个
			mysql_center.insert_guest_user(unick, uface, usex, ukey, function(status) {
				if (status != Respones.OK) {
					write_err(status, ret_func);
					return;
				}

				guest_login(ukey, ret_func);
			});
		}
		else {
			if (data.status != 0) { // 游客账号被封
				write_err(Respones.ILLEGAL_ACCOUNT, ret_func);
				return;
			}
			guest_login_success(data, ret_func);
		}
		
	});
	// end 
}

module.exports = {
	guest_login: guest_login,
};