/**
 * @Author: Nick
 * @Date: 2023/8/15 17:12:08
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/15 17:12:08
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 */

var log = require("../../utils/log.js");
var Cmd = require("../Cmd.js");
var auth_model = require("./auth_model.js");
var Respones = require("../Respones.js");
var Stype = require("../Stype.js");
var Cmd = require("../Cmd.js");
var utils = require("../../utils/utils.js");


function get_game_info(session, uid, proto_type, body) {
    system_model.get_game_info(uid, function (body) {
        session.send_cmd(Stype.GameSystem, Cmd.GameSystem.GET_GAME_INFO, body, uid, proto_type);
    })
}
var service = {
    name: "auth_service", // 服务名称
    is_transfer: false, // 是否为转发模块,

    // 收到客户端给我们发来的数据
    on_recv_player_cmd: function (session, stype, ctype, body, utag, proto_type, raw_cmd) {
        log.info(this.name + " on_recv_player_cmd", stype, ctype, body);
    },

    // 收到我们连接的服务给我们发过来的数据;
    on_recv_server_return: function (session, stype, ctype, body, utag, proto_type, raw_cmd) {
        log.info(this.name + " on_recv_server_return", stype, ctype, body);
        switch (ctype) {
            case Cmd.GameSystem.GET_GAME_INFO:
                get_game_info(session, utag, proto_type, body);
                break;
        }
    },

    // 收到客户端断开连接;
    on_player_disconnect: function (stype, session) {
    },
};

module.exports = service;
