var Cmd = {
	// 全局的命令号，当我们的用户丢失链接的时候，
	// 所有的服务都会收到网关转发过来的这个时间这个消息
	USER_DISCONNECT: 10000, 

	Auth: {
		GUEST_LOGIN: 1, // 游客登陆
		RELOGIN: 2, // 账号在另外的地方登陆
		EDIT_PROFILE: 3, // 修改用户资料
		GUEST_UPGRADE_INDENTIFY: 4, // 游客升级验证码拉取
		BIND_PHONE_NUM: 5, // 游客绑定手机账号
		UNAME_LOGIN: 6, // 账号密码登录

		GET_PHONE_REG_VERIFY: 7, // 获取手机注册的验证码
		PHONE_REG_ACCOUNT: 8, // 手机注册我们的账号,

		GET_FORGET_PWD_VERIFY: 9, // 获取修改密码的手机验证码
		RESET_USER_PWD: 10, // 重置用户密码
	},
	
	// 系统服务支持的命令
	GameSystem: {
		GET_GAME_INFO: 1, // 获取游戏信息,
	}
};

module.exports = Cmd;