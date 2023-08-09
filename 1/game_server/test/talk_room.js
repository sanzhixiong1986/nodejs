var log = require("../utils/log.js");

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
    IS_IN_TALKROOM: -100,//玩家已经在聊天室
    NOT_IN_TALKROOM: -101,//玩家不在聊天室
    INVALD_OPT: -102,     //玩家非法操作
    INVALID_PARAMS: -103, //命令格式非法
}


var room = {};//房间的集合
/**
 * 进入房间
 * @param {*} session 
 * @param {*} body 
 */
function on_user_enter_talkroom(session, body) {
    session.send_cmd(STYPE_TALKROOM, TalkCmd.Enter, Respones.INVALID_PARAMS);
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
            case TalkCmd.Enter://进入房间
                on_user_enter_talkroom(session, body);
                break;
        }
    },

    //每个服务器链接丢失后调用
    on_player_disconnect: function (session) {
        log.error(this.name + " on_player_disconnect", session.session_key);
    }
}

module.exports = service;