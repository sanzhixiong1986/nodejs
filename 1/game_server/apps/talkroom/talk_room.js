/**
 * @Author: Nick
 * @Date: 2023/8/10 09:37:45
 * @LastEditors: Your Name
 * @LastEditTime: 2023/8/10 09:55:05
 * Description: 
 * Copyright: Copyright (©)}) 2023 Nick. All rights reserved.
 */
const proto_mgr = require("../../netbus/proto_mgr.js");
var log = require("../../utils/log.js");

var STYPE_TALKROOM = 1; //游戏的

var TalkCmd = {
    Enter: 1,
    Exit: 2,
    UserArrived: 3,
    UserEixt: 4,

    SendMsg: 5,
    UserMsg: 6
};

var Respones = {
    OK: 1,
    IS_IN_TALKROOM: -100, //玩家已经在聊天室
    NOT_IN_TALKROOM: -101, //玩家不在聊天室
    INVALD_OPT: -102, //玩家非法操作
    INVALID_PARAMS: -103, //命令格式非法
}


var room = {}; //房间的集合
/**
 * 进入房间
 * @param {*} session 
 * @param {*} body 
 */
function on_user_enter_talkroom(session, body) {
    if (!body.uname || !body.usex) {
        session.send_cmd(STYPE_TALKROOM, TalkCmd.Enter, Respones.INVALID_PARAMS);
        return;
    }

    if (room[session.session_key]) {
        session.send_cmd(STYPE_TALKROOM, TalkCmd.Enter, Respones.IS_IN_TALKROOM);
        return;
    }

    session.send_cmd(STYPE_TALKROOM, TalkCmd.Enter, Respones.OK);

    // 把我们进来的消息广播给其他的人
    broadcast_cmd(TalkCmd.UserArrived, body, session);

    //发送除了自己以外的所有其他玩家
    for (var key in room) {
        session.send_cmd(STYPE_TALKROOM, TalkCmd.UserArrived, room[key].uinfo);
    }

    var talkman = {
        session: session,
        uinfo: body,
    }
    room[session.session_key] = talkman;
}

/**
 * 全部
 * @param {*} ctype 
 * @param {*} body 
 * @param {*} noto_user 
 */
function broadcast_cmd(ctype, body, noto_user) {
    var json_encoded = null;
    for (var key in room) {
        if (room[key].session == noto_user) {
            continue;
        }
        var session = room[key].session;
        if (json_encoded == null) {
            json_encoded = proto_mgr.encode_cmd(1, STYPE_TALKROOM, ctype, body);
        }
        session.send_encoded_cmd(json_encoded);
    }
}

/**
 * 退出房间操作
 * @param {*} session 
 * @param {*} is_lost_connection 
 */
function on_user_exit_talkroom(session, is_lost_connection) {
    //判断是否在房间并且是否是主动退出的
    if (!room[session.session_key] && !is_lost_connection) {
        session.send_cmd(STYPE_TALKROOM, TalkCmd.Exit, Respones.NOT_IN_TALKROOM);
        return;
    }
    broadcast_cmd(TalkCmd.UserEixt, room[session.session_key].uinfo, session);
    //房间删除
    room[session.session_key] = null;
    delete room[session.session_key];
    //发送你已经离开
    if (!is_lost_connection) {
        session.send_cmd(STYPE_TALKROOM, TalkCmd.Exit, Respones.OK);
    }
}

/**
 * 收到消息的方法
 * @param {*} session 
 * @param {*} msg 
 */
function on_user_send_msg(session, msg) {
    if (!room[session.session_key]) {
        session.send_cmd(STYPE_TALKROOM, TalkCmd.SendMsg, {
            0: Respones.INVALD_OPT
        });
        return;
    }

    //发送给客户端
    session.send_cmd(STYPE_TALKROOM, TalkCmd.SendMsg, {
        0: Respones.OK,
        1: room[session.session_key].uinfo.uname,
        2: room[session.session_key].uinfo.usex,
        3: msg,
    });

    //转发数据
    broadcast_cmd(
        TalkCmd.UserMsg, {
            0: room[session.session_key].uinfo.uname,
            1: room[session.session_key].uinfo.usex,
            2: msg,
        }, session
    )
}


var service = {
    stype: STYPE_TALKROOM,
    name: "talkRoom",

    init: function () {
        log.info(this.name + "service initialized");
    },

    //每个服务器收到数据调用
    on_recv_player_cmd: function (session, ctype, body) {
        log.warn(this.name + " on_recv_player_cmd", ctype, body);
        switch (ctype) {
            case TalkCmd.Enter: //进入房间
                on_user_enter_talkroom(session, body);
                break;
            case TalkCmd.Exit: //主动退出房间
                on_user_exit_talkroom(session, false);
                break;
            case TalkCmd.SendMsg: //发送消息
                on_user_send_msg(session, body);
                break;
        }
    },

    //每个服务器链接丢失后调用
    on_player_disconnect: function (session) {
        log.error(this.name + " on_player_disconnect", session.session_key);
        on_user_exit_talkroom(session, true);
    }
}

module.exports = service;