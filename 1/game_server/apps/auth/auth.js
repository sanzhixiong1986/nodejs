/**
 * @Author: Nick
 * @Date: 2023/8/10 09:37:45
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 09:55:05
 * Description: 
 * Copyright: Copyright (©)}) 2023 Nick. All rights reserved.
 * Auth 服务器的操作
 */
const proto_mgr = require("../../netbus/proto_mgr.js");
var log = require("../../utils/log.js");

var STYPE_AUTH = 2; //游戏的


var service = {
    stype: STYPE_AUTH,
    name: "Auth_Service",

    init: function () {
        log.info(this.name + "service initialized");
    },

    //每个服务器收到数据调用
    on_recv_player_cmd: function (session, ctype, body) {

    },

    //每个服务器链接丢失后调用
    on_player_disconnect: function (session) {
        log.error(this.name + " on_player_disconnect", session.session_key);
    }
}

module.exports = service;