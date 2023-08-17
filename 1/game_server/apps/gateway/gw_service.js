/**
 * @Author: Nick
 * @Date: 2023/8/10 11:28:03
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 11:28:03
 * Description: 
 * Copyright: Copyright (©)}) 2023 Your Name. All rights reserved.
 * 中间件的编写
 */

const netbus = require('../../netbus/netbus.js');
var log = require('../../utils/log.js');

var service = {
    name: "gw_service",
    is_transfer: true, //是否为转发模块

    init: function () {
        log.info(this.name + "service initialized");
    },

    //收到客户端给我们的数据
    on_recv_player_cmd: function (session, ctype, body) {
        log.info("gateway:on_recv_player_cmd", ctype, body, session.session_key);
        let sessions = netbus.get_server_session(session.session_key);
        if (!sessions) {
            log.info("sessions=null", sessions);
            return;
        }
        log.info(sessions);
        sessions.send_cmd(session.session_key, ctype, body);
    },

    //收到我们链接服务器对应的相关方法
    on_recv_server_return: function (session, stype, ctype, body, utag, proto_type, raw_cmd) {

    },

    //收到断开的链接
    on_player_disconnect: function (stype, session) {

    }
}

module.exports = service;