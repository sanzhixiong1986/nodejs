var Stype = require("./Stype.js");

var game_config = {
	gateway_config: {
		host: "127.0.0.1",
		ports: [6080, 6081],
	},

	game_server: {
		0: {
			stype: Stype.TalkRoom,
			host: "127.0.0.1",
			port: 6084,
		},

		1: {
			stype: Stype.Auth,
			host: "127.0.0.1",
			port: 6086,
		},

	},

	//数据库相关的配置
	databases: {
		//游戏的相关的数据库
		game_database: {
			host: "127.0.0.1",
			port: 3306,
			db_name: "bycw_game_node",
			uname: "root",
			upwd: "sanzhixiong",
		},
		//中心服务器
		center_database: {
			host: "127.0.0.1",
			port: 3306,
			db_name: "bycw_center_node",
			uname: "root",
			upwd: "sanzhixiong",
		},

		//redis的操作
		center_redis: {
			host: "127.0.0.1",
			port: 6379,
			db_index: 0,
		},

		game_redis: {
			host: "127.0.0.1",
			port: 6379,
			db_index: 1,
		},
	},

	//游戏注册的时候一些基础数据
	game_data: {
		first_uexp: 1000,
		fitst_uchip: 1000,
		login_bonuse_config: {
			clear_login_straight: false,//是否需要清理
			bonues: [100, 200, 300, 400, 500]
		}
	}
};

module.exports = game_config;