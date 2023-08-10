var websocket = require("websocket");
 
var STYPE_TALKROOM = 1;
var TalkCmd = {
	Enter: 1, // 用户进来
	Exit: 2, // 用户离开ia
	UserArrived: 3, // 别人进来;
	UserExit: 4, // 别人离开
 
	SendMsg: 5, // 自己发送消息,
	UserMsg: 6, // 收到别人的消息
};
 
var Respones = {
	OK: 1,
	IS_IN_TALKROOM: -100, // 玩家已经在聊天室
	NOT_IN_TALKROOM: -101, // 玩家不在聊天室
	INVALD_OPT: -102, // 玩家非法操作
	INVALID_PARAMS: -103, // 命令格式不对
};
 
cc.Class({
    extends: cc.Component,
 
    properties: {
    },
 
    // use this for initialization
    onLoad: function () {
        websocket.register_serivces_handler({
            1: this.on_talk_room_service_return.bind(this),
        });
    },
 
    on_talk_room_service_return: function(stype, cmd, body) {
        switch(cmd) {
            case TalkCmd.Enter:
                console.log("Enter", body);
            break;
            case TalkCmd.Exit:
                console.log("Exit", body);
            break;
            case TalkCmd.UserArrived:
                console.log("UserArrived", body);
            break;
            case TalkCmd.UserExit:
                console.log("UserExit", body);
            break;
            case TalkCmd.SendMsg:
                console.log("SendMsg", body);
            break;
            case TalkCmd.UserMsg:
                console.log("UserMsg", body);
            break;
        }
    },
 
    start: function() {
        this.scheduleOnce(function() {
            this.test_cmd();
        }.bind(this), 3);
    },
 
    test_cmd: function() {
        // Enter
        websocket.send_cmd(STYPE_TALKROOM, TalkCmd.Enter, {
            uname: "blake" + Math.floor(1 + Math.random() * 10),
            usex: 1,
        });
        // end
 
        this.schedule(function() {
            websocket.send_cmd(STYPE_TALKROOM, TalkCmd.SendMsg, "HelloWorld!");
        }.bind(this), 3);
    },
});
 
