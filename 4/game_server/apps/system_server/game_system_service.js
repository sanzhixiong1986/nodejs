

var game_system_service = 3;

var service = {
    stype: game_system_service,
    name: "game_system_service",

    init: function () {
        log.info(this.name + "service initialized");
    },

    //每个服务器收到数据调用
    on_recv_player_cmd: function (session, ctype, body) {
        log.warn(this.name + " on_recv_player_cmd");
        switch (ctype) {
            case Cmd.Auth.GUEST_LOGIN:
                guest_login(session, body);
                break
        }
    },

    //每个服务器链接丢失后调用
    on_player_disconnect: function (session) {
        log.error(this.name + " on_player_disconnect", session.session_key);
    }
}

module.exports = service;