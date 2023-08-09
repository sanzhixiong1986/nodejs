var websocket = require('websocket');

cc.Class({
    extends: cc.Component,

    properties: {

    },

    start() {
        //计时器
        this.scheduleOnce(function () {
            var data = {
                uname: "sanzhixiong",
                ipwd: "123456"
            }

            websocket.send_cmd(1, 1, data);
        }.bind(this), 1);
    },
});
