var log = require("../utils/log.js");

var service = {
    stype: 1,
    name: "talkRoom",

    init: function () {
        log.info(this.name + "service initialized");
    },

    //每个服务器收到数据调用
    on_recv_player_cmd: function (session, ctype, body) {
        log.info(this.name + "on_recv_player_cmd", ctype, body);
    },

    //每个服务器链接丢失后调用
    on_player_disconnect: function (session) {
        log.info(this.name + "on_player_disconnect",session.session_key);
    }
}

module.exports = service;