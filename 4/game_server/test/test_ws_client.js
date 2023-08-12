/**
 * @Author: Nick
 * @Date: 2023/8/10 09:56:46
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 09:56:46
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 */
var ws = require("ws");
var proto_man = require("../netbus/proto_mgr.js");
const proto_mgr = require("../netbus/proto_mgr.js");
var msgpack = require('msgpack5')();

// url ws://127.0.0.1:6080
// 创建了一个客户端的socket,然后让这个客户端去连接服务器的socket
var sock = new ws("ws://127.0.0.1:6082");
sock.on("open", function () {
	console.log("connect success !!!");
	// var cmd_buf = proto_man.encode_cmd(1, 2, 1, 1);
	// var cmd_buf = proto_man.encode_cmd(1, 2, 2, {
	// 	'id': 1,
	// 	'userName': "sanzhixiong"
	// })
	// var cmd_buf = proto_man.encode_cmd(1, 2, 3, {
	// 	userName: "sanzhixiong",
	// 	password: "11111"
	// });

	var cmd_buf = proto_man.encode_cmd(1, 2, 4, {
		userName: "sanzhixiong",
		password: "11111"
	});

	sock.send(cmd_buf);
});

sock.on("error", function (err) {
	console.log("error: ", err);
});

sock.on("close", function () {
	console.log("close");
});

sock.on("message", function (data) {
	console.log(proto_man.decode_cmd(1, data)[2]);
});