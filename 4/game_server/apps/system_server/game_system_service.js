const Cmd = require("../Cmd");
const log = require("../../utils/log.js");


function get_game_info(session, body) {
    log.info("get_game_info", body);
}


var service = {
    stype: 3,
    name: "game_system_service",

    init: function () {
        log.info(this.name + " service initialized");
    },

    //每个服务器收到数据调用
    on_recv_player_cmd: function (session, ctype, body) {
        log.warn(this.name + " on_recv_player_cmd");
        switch (ctype) {
            case Cmd.GameSystem.GET_GAME_INFO:
                get_game_info(session, body);
                break
        }
    },

    //每个服务器链接丢失后调用
    on_player_disconnect: function (session) {
        log.error(this.name + " on_player_disconnect", session.session_key);
    }
}

module.exports = service;